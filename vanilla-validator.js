var VanillaValidator = (function(){

	var $ = new VVElements();
	var utils = new VVUtils();

	var _setConfigurations = function(userConfig) {
		// default configurations
		this.config = {
			container: 'form',
			button: null,
			validationBy: 'onclick', // [onclick, onsubmit]
			selectors: { // just css classes
				control: 'vv-control',
				required: 'required',
				email: 'email',
				integer: 'integer',
				digit: 'digit',
				phone: 'phone',
				pattern: 'pattern',
				cpf: 'cpf',
				cnpj: 'cnpj',
				customValidate: 'custom-validate',
				error: 'error',
				formError: 'form-error',
				messageError: 'msg-error'
			},
			messages: {
				required: 'Required field',
				email: 'Invalid email',
				integer: 'Needs to be a integer',
				digit: 'Only letters and numbers',
				pattern: 'Needs to matchs pattern',
				phone: 'Invalid phone number'
			},
			customPatternValidation: {
				pattern: '[0-9]',
				flags: 'g'
			},
			novalidateHTML5: true,
			validateOnFieldChanges: true,
			callbacks: {
				eachFieldError: null,
				eachFieldSuccess: null,
				requiredError: null,
				requiredSuccess: null,
				emailError: null,
				emailSuccess: null,
				integerError: null,
				integerSuccess: null,
				digitError: null,
				digitSuccess: null,
				patternError: null,
				patternSuccess: null,
				beforeValidate: null,
				afterValidate: null,
				error: null,
				success: null
			},
			overrides: {
				OV_Email: null,
				OV_Required: null,
				OV_Success: null
			},
			customValidates: {
				'my-custom-validate' : {
					message: 'Custom error message',
					fn: function(field, message){
						if(field.value === 'foo'){
							this.addValidationView(field, message);
							return false;
						}
						return true;
					}
				}
			}
		};

		// merge with user configurations
		this.config = utils.mergeObjectsDeeply({}, this.config, userConfig);
	};

	/**
	 * Simulates inheritance in javascript. Propagates only the prototypes.
	 *
	 * @method _inherits
	 * @param {Object} object that will be a subClass
	 * @param {Object} object that will be a superClass
	 */
	var _inherits = function(subClass, superClass) {
		// superClass need to be a function or null
		if (typeof superClass !== 'function' && superClass !== null) { 
			throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); 
		} 
		subClass.prototype = Object.create(superClass && superClass.prototype, { 
			constructor: { 
				value: subClass, 
				enumerable: false, 
				writable: true, 
				configurable: true 
			} 
		}); 
		if (superClass){
			Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
		}
	};
	// makes VanillaValidator inherit from VVChecks
	_inherits(VanillaValidator, VVChecks);


	VanillaValidator.prototype.loopThroughContainers = function(){
		if(this.containers && this.containers.length){
			var i, container,
				total = this.containers.length;
			for(i = 0; i < total; i++){
				container = this.containers[i];
				this.defineSubmitionType(container);
				this.addControlClassesOnFields(container);
			}
		}
	};

	VanillaValidator.prototype.defineSubmitionType = function(container){
		if(this.config.validationBy === 'onclick'){
			this.addButtonClickEvent(container);
		}else{
			this.addFormSubmitEvent(container);
		}
	};

	VanillaValidator.prototype.addFormSubmitEvent = function(container){
		var self = this;
		if(container.tagName === 'FORM'){
			container.addEventListener('submit', function(event){
				event.preventDefault();
				self.formValidateFinal(container);
			});
		}
	};

	VanillaValidator.prototype.addButtonClickEvent = function(container){
		var self = this, button;
		if(this.config.button && $.getChild(this.config.button, container)){
			button = $.getChild(this.config.button, container);
		}else{
			button = $.getButtonSubmit(container);
		}
		if(button){
			button.addEventListener('click', function(event){
				event.preventDefault();
				self.formValidateFinal(container);
			});
		}
	};

	VanillaValidator.prototype.formValidateFinal = function(container){
		var ret = true;
		this.callCallbackFunction(this.config.callbacks.beforeValidate, this, container);
		ret = this.validateContainer(container);
		this.callCallbackFunction(this.config.callbacks.afterValidate, this, container);
		if(ret){
			this.callCallbackFunction(this.config.callbacks.success, this, container);
		}else{
			this.callCallbackFunction(this.config.callbacks.error, this, container);
		}
		return ret;
	};

	VanillaValidator.prototype.addControlClassesOnFields = function(container){
		var field;
		for (var key in this.config.selectors) {
			if(key != this.config.selectors.control){
				field = $.getChildren('.' + this.config.selectors[key] + ':not(.' + this.config.selectors.control + ')', container);
				this.loopThroughFieldsToAddControls(field, container);
			}
		}
	};

	VanillaValidator.prototype.loopThroughFieldsToAddControls = function(fields, container){
		if(fields){
			var i,
				field,
				total = fields.length;
			for(i = 0; i < total; i++){
				field = fields[i];
				field.classList.add(this.config.selectors.control);
				this.addCustomValidations(field);
				if(this.config.validateOnFieldChanges){
					this.addValidationsOnFieldsEvent(field, container);
				}
			}
		}
	};

	VanillaValidator.prototype.addValidationsOnFieldsEvent = function(field, container){
		if(field){
			var self = this;
			field.addEventListener('change', function(event){
				event.preventDefault();
				self.validateFields(field, container);
			});
			field.addEventListener('keyup', function(event){
				event.preventDefault();
				self.validateFields(field, container);
			});
		}
	};

	VanillaValidator.prototype.validateFields = function(field, container){
		var ret = true;
		if(field && container){
			this.removeValidationView(field);

			// EMAIL
			if(field.classList.contains(this.config.selectors.email)){
				if(!this.validateEmail(field)) ret = false;
			}

			// INTEGER
			if(field.classList.contains(this.config.selectors.integer)){
				if(!this.validateInteger(field)) ret = false;
			}

			// DIGIT
			if(field.classList.contains(this.config.selectors.digit)){
				if(!this.validateDigit(field)) ret = false;
			}

			// DIGIT
			if(field.classList.contains(this.config.selectors.digit)){
				if(!this.validateDigit(field)) ret = false;
			}

			// PATTERN
			if(field.classList.contains(this.config.selectors.pattern)){
				if(!this.validatePattern(field)) ret = false;
			}

			// CUSTOM VALIDATE 
			if(field.classList.contains(this.config.selectors.customValidate)){
				//console.log(this.config.selectors.customValidate)
				if(!this.validateCustom(field)) ret = false;
			}

			// REQUIRED
			if(field.classList.contains(this.config.selectors.required)){
				if(field.type === 'checkbox' || field.type === 'radio'){
					if(!this.validateRequiredCR(field, container)) ret = false;
				}else{
					if(!this.validateRequired(field)) ret = false;
				}
			}
		}
		if(ret){
			this.callCallbackFunction(this.config.callbacks.eachFieldSuccess, this, field);
		}else{
			this.callCallbackFunction(this.config.callbacks.eachFieldError, this, field);
		}
		return ret;
	};

	VanillaValidator.prototype.validateContainer = function(container){
		var ret = true;
		if(container){
			var fields = $.getChildren('.' + this.config.selectors.control, container);
			if(fields){
				var i, total = fields.length, field;
				for(i = 0; i < total; i++){
					field = fields[i];
					if(!this.validateFields(field, container)) ret = false;
				}
			}
		}
		return ret;
	};

	VanillaValidator.prototype.validateRequired = function(field){
		if(field){
			if(this.isEmpty(field.value)){
				this.addValidationView(field, this.config.messages.required);
				this.callCallbackFunction(this.config.callbacks.requiredError, this, field);
				return false;
			}
		}
		this.callCallbackFunction(this.config.callbacks.requiredSuccess, this, field);
		return true;
	};

	VanillaValidator.prototype.validateRequiredCR = function(field, container){
		if(field && container){
			if(field.name){
				var fieldsRC = $.getChildren('.' + this.config.selectors.required + '[name=' + field.name + ']', container);
				if(fieldsRC){
					var fieldChecked = $.getChildren('.' + this.config.selectors.required + '[name=' + field.name + ']:checked', container);
					var lastFieldRC = fieldsRC[fieldsRC.length-1];
					if(!fieldChecked){
						this.addValidationView(lastFieldRC, this.config.messages.required);
						this.callCallbackFunction(this.config.callbacks.requiredError, this, field);
						return false;
					}else{
						this.removeValidationView(lastFieldRC);
					}
				}
			}
		}
		this.callCallbackFunction(this.config.callbacks.requiredSuccess, this, field);
		return true;
	};

	VanillaValidator.prototype.validateEmail = function(field){
		if(field){
			if(!this.isEmail(field.value)){
				this.addValidationView(field, this.config.messages.email);
				this.callCallbackFunction(this.config.callbacks.emailError, this, field);
				return false;
			}
		}
		this.callCallbackFunction(this.config.callbacks.emailSuccess, this, field);
		return true;
	};

	VanillaValidator.prototype.validateInteger = function(field){
		if(field){
			if(!this.isInteger(field.value)){
				this.addValidationView(field, this.config.messages.integer);
				this.callCallbackFunction(this.config.callbacks.integerError, this, field);
				return false;
			}
		}
		this.callCallbackFunction(this.config.callbacks.integerSuccess, this, field);
		return true;
	};

	VanillaValidator.prototype.validateDigit = function(field){
		if(field){
			if(!this.isDigit(field.value)){
				this.addValidationView(field, this.config.messages.digit);
				this.callCallbackFunction(this.config.callbacks.digitError, this, field);
				return false;
			}
		}
		this.callCallbackFunction(this.config.callbacks.digitSuccess, this, field);
		return true;
	};

	VanillaValidator.prototype.validatePattern = function(field){
		if(field){
			var pattern = (field.getAttribute('data-pattern')) ? field.getAttribute('data-pattern') : this.config.customPatternValidation.pattern;
			var flags = (field.getAttribute('data-flags')) ? field.getAttribute('data-flags') : this.config.customPatternValidation.flags;
			if(!this.isPattern(field.value, pattern, flags)){
				this.addValidationView(field, this.config.messages.pattern);
				this.callCallbackFunction(this.config.callbacks.patternError, this, field);
				return false;
			}
			this.callCallbackFunction(this.config.callbacks.patternSuccess, this, field);
			return true;
		}
	};

	VanillaValidator.prototype.validateCustom = function(field){
		if(field){
			var customKey = field.getAttribute('data-validate-key');
			if(customKey){
				var myCustom = this.config.customValidates[customKey];
				if(myCustom && myCustom.message && myCustom.fn){
					if(this.isFunction(myCustom.fn)){
						return myCustom.fn.call(this, field, myCustom.message);
					}else{
						console.error('The fn of custom validation must be a function');
					}
				}else{
					console.error('Check if your custom validation is correctly configured');
				}
			}
		}
		return true;
	};

	VanillaValidator.prototype.addValidationView = function(field, message){
		if(field){
			var parentEl = (field.constructor.name === 'Array') ? field[field.length-1].parentElement : field.parentElement;
			if(parentEl){
				var messageContainer = document.createElement('SPAN');
				message = (field.getAttribute('data-message-error')) ? field.getAttribute('data-message-error') : message;
				messageContainer.innerHTML = message;

				var messageClass = document.createAttribute('class');
				messageClass.value = this.config.selectors.messageError;
				messageContainer.setAttributeNode(messageClass);

				if(field.constructor.name === 'Array'){
					var i, totalEl = field.length;
					for(i = 1; i < totalEl; i++){
						field[i].classList.add(this.config.selectors.error);
					}
				}else{
					field.classList.add(this.config.selectors.error);
				}
				
				var oldMessages = parentEl.querySelectorAll('.' + this.config.selectors.messageError);
				if(oldMessages){
					var x, totalOld = oldMessages.length;
					for(x = 0; x < totalOld; x++){
						oldMessages[x].remove();
					}
				}
				parentEl.append(messageContainer);
			}
		}
	};

	VanillaValidator.prototype.removeValidationView = function(field){
		if(field){
			var parentEl = (field.constructor.name === 'Array') ? field[field.length-1].parentElement : field.parentElement;
			if(parentEl){
				if(field.constructor.name === 'Array'){
					var i, totalEl = field.length;
					for(i = 1; i < totalEl; i++){
						field[i].classList.remove(this.config.selectors.error);
					}
				}else{
					field.classList.remove(this.config.selectors.error);
				}

				var oldMessages = parentEl.querySelectorAll('.' + this.config.selectors.messageError);
				if(oldMessages){
					var x, totalOld = oldMessages.length;
					for(x = 0; x < totalOld; x++){
						oldMessages[x].remove();
					}
				}
			}
		}
	};

	VanillaValidator.prototype.addCustomValidations = function(field){
		if(field){
			var customKey = field.getAttribute('data-validate-key');
			if(customKey){
				var myCustom = this.config.customValidates[customKey];
				if(!myCustom){
					this.config.customValidates[customKey] = this.userConfig.customValidates[customKey];
				}
			}
		}
	};

	VanillaValidator.prototype.callCallbackFunction = function(callback, ref, element){
		if(this.isFunction(callback)){
			callback.call(ref, element);
		}
	};

	VanillaValidator.prototype._init = function(){
		this.containers = $.getElements(this.config.container);
		this.loopThroughContainers();
	};

	// the constructor
	function VanillaValidator(userConfig){
		this.userConfig = userConfig;
		// force call with new operator
		if (!(this instanceof VanillaValidator)) { 
			throw new TypeError('Cannot call a class as a function');
		}

		// Propagates only the attributes.
		VVChecks.apply(this, arguments);

		// set configurations for this instance
		_setConfigurations.apply(this, [userConfig]);

		this._init();
	}

	return VanillaValidator;
}());