var VanillaValidator = (function(){

	var $ = new VVElements();
	var utils = new VVUtils();

	var _setConfigurations = function(userConfig) {
		// default configurations
		this.config = {
			container: 'form',
			button: null,
			validationBy: 'onsubmit', // [onclick, onsubmit]
			novalidateHTML5: true,
			validateOnFieldChanges: true,
			selectors: { // just css classes
				control: 'vv-control',
				required: 'required',
				email: 'email',
				integer: 'integer',
				digit: 'digit',
				pattern: 'pattern',
				phone: 'phone',
				url: 'url',
				maxLength: 'less-than',
				cpf: 'cpf',
				cnpj: 'cnpj',
				customValidate: 'custom-validate',
				error: 'error',
				formError: 'form-error',
				messageError: 'msg-error'
			},
			messages: { // or by html attribute 'data-message-error'
				required: 'Required field',
				email: 'Invalid email',
				integer: 'Needs to be a integer',
				digit: 'Only letters and numbers',
				pattern: 'Needs to matchs pattern',
				phone: 'Invalid phone number', // brazilian format
				url: 'Invalid url',
				maxLength: 'The amount of characters is greater than allowed'
			},
			customValidationsConfig: {
				pattern: '[0-9]', // or by html attribute 'data-pattern'
				flags: 'g', // or by html attribute 'data-flags'
				maxLength: 5
			},
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
				phoneError: null,
				phoneSuccess: null,
				urlError: null,
				urlSuccess: null,
				patternError: null,
				patternSuccess: null,
				beforeValidate: null,
				afterValidate: null,
				error: null,
				success: null
			},
			customValidates: {
				'my-custom-validate' : { // must inform this key in html attribute 'data-validate-key'
					message: 'Custom error message',
					fn: function(field, message){
						if(field.value === 'foo'){
							this.addValidationView(field, message);
							return false;
						}
						return true;
					}
				}
			},
			customViewErrors: {
				add: null,
				remove: null
			},
			noFormSuccess: null,
			onFormSubmit: null
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
			var i, container, total = this.containers.length;
			for(i = 0; i < total; i++){
				container = this.containers[i];
				this.defineSubmitionType(container);
				this.setHTML5NoValidate(container);
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
		if(this.isHTMLForm(container)){
			container.addEventListener('submit', function(event){
				event.preventDefault();
				self.onSuccessFormValidate(container);
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
				self.onSuccessFormValidate(container);
			});
		}
	};

	VanillaValidator.prototype.onSuccessFormValidate = function(container){
		if(container && this.formValidateFinal(container)){
			if(this.isHTMLForm(container)){
				if(this.config.onFormSubmit && this.isFunction(this.config.onFormSubmit)){
					this.config.onFormSubmit.call(this, container);
				}else{
					container.submit();
				}
			}else{
				if(this.config.noFormSuccess && this.isFunction(this.config.noFormSuccess)){
					this.config.noFormSuccess.call(this, container);
				}
			}
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

	VanillaValidator.prototype.addControlClassesOnFields = function(container){
		var field, key;
		for (key in this.config.selectors) {
			if(this.config.selectors.hasOwnProperty(key)){
				if(key != this.config.selectors.control){
					field = $.getChildren('.' + this.config.selectors[key] + ':not(.' + this.config.selectors.control + ')', container);
					this.loopThroughFieldsToAddControls(field, container);
				}
			}
		}
	};

	VanillaValidator.prototype.loopThroughFieldsToAddControls = function(fields, container){
		if(fields){
			var i, field, total = fields.length;
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
				if(!this.factoryValidate(field, this.isEmail, this.config.messages.email, this.config.callbacks.emailError, this.config.callbacks.emailSuccess)) ret = false;
			}

			// INTEGER
			if(field.classList.contains(this.config.selectors.integer)){
				if(!this.factoryValidate(field, this.isInteger, this.config.messages.integer, this.config.callbacks.integerError, this.config.callbacks.integerSuccess)) ret = false;
			}

			// DIGIT
			if(field.classList.contains(this.config.selectors.digit)){
				if(!this.factoryValidate(field, this.isDigit, this.config.messages.digit, this.config.callbacks.digitError, this.config.callbacks.digitSuccess)) ret = false;
			}

			// PHONE
			if(field.classList.contains(this.config.selectors.phone)){
				if(!this.factoryValidate(field, this.isPhone, this.config.messages.phone, this.config.callbacks.phoneError, this.config.callbacks.phoneSuccess)) ret = false;
			}

			// URL
			if(field.classList.contains(this.config.selectors.url)){
				if(!this.factoryValidate(field, this.isUrl, this.config.messages.url, this.config.callbacks.urlError, this.config.callbacks.urlSuccess)) ret = false;
			}

			// MAXLENGTH
			if(field.classList.contains(this.config.selectors.maxLength)){
				var maxLength = (field.getAttribute('data-max-length')) ? parseInt(field.getAttribute('data-max-length')) : this.config.customValidationsConfig.maxLength;
				if(!this.factoryValidate(field, this.maxLength, this.config.messages.maxLength, this.config.callbacks.maxLengthError, this.config.callbacks.maxLengthSuccess, maxLength)) ret = false;
			}

			// PATTERN
			if(field.classList.contains(this.config.selectors.pattern)){
				if(!this.validatePattern(field)) ret = false;
			}

			// CUSTOM VALIDATE 
			if(field.classList.contains(this.config.selectors.customValidate)){
				if(!this.validateCustom(field)) ret = false;
			}

			// REQUIRED
			if(field.classList.contains(this.config.selectors.required)){
				if(field.type === 'checkbox' || field.type === 'radio'){
					if(!this.validateRequiredCR(field, container)) ret = false;
				}else{
					//if(!this.validateRequired(field)) ret = false;
					if(!this.factoryValidate(field, this.isNotEmpty, this.config.messages.required, this.config.callbacks.requiredError, this.config.callbacks.requiredSuccess)) ret = false;
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

	VanillaValidator.prototype.factoryValidate = function(field, validationFn, message, callbackErrorFn, callbackSuccessFn, otherParams){
		if(field){
			if(!validationFn.call(this, field.value, otherParams)){
				this.addValidationView(field, message);
				this.callCallbackFunction(callbackErrorFn, this, field);
				return false;
			}
		}
		this.callCallbackFunction(callbackSuccessFn, this, field);
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

	VanillaValidator.prototype.validatePattern = function(field){
		if(field){
			var pattern = (field.getAttribute('data-pattern')) ? field.getAttribute('data-pattern') : this.config.customValidationsConfig.pattern;
			var flags = (field.getAttribute('data-flags')) ? field.getAttribute('data-flags') : this.config.customValidationsConfig.flags;
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
						throw new TypeError('The fn of custom validation must be a function');
					}
				}else{
					throw new TypeError('Check if your custom validation is correctly configured');
				}
			}
		}
		return true;
	};

	VanillaValidator.prototype.addValidationView = function(field, message){
		if(field){
			message = (field.getAttribute('data-message-error')) ? field.getAttribute('data-message-error') : message;
			if(this.config.customViewErrors && this.isFunction(this.config.customViewErrors.add)){
				this.config.customViewErrors.add.call(this, field, message);
			}else{
				var parentEl = (this.isArray(field)) ? field[field.length-1].parentElement : field.parentElement;
				if(parentEl){
					var messageContainer = document.createElement('SPAN');
					var messageClass = document.createAttribute('class');
					messageContainer.innerHTML = message;
					messageClass.value = this.config.selectors.messageError;
					messageContainer.setAttributeNode(messageClass);
					if(this.isArray(field)){
						var i, totalEl = field.length;
						for(i = 1; i < totalEl; i++){
							field[i].classList.add(this.config.selectors.error);
						}
					}else{
						field.classList.add(this.config.selectors.error);
					}
					var oldMessage = parentEl.querySelector('.' + this.config.selectors.messageError);
					if(oldMessage){
						oldMessage.remove();
					}
					parentEl.append(messageContainer);
				}
			}
		}
	};

	VanillaValidator.prototype.removeValidationView = function(field){
		if(field){
			if(this.config.customViewErrors && this.isFunction(this.config.customViewErrors.remove)){
				this.config.customViewErrors.remove.call(this, field);
			}else{
				var parentEl = (this.isArray(field)) ? field[field.length-1].parentElement : field.parentElement;
				if(parentEl){
					if(this.isArray(field)){
						var i, totalEl = field.length;
						for(i = 1; i < totalEl; i++){
							field[i].classList.remove(this.config.selectors.error);
						}
					}else{
						field.classList.remove(this.config.selectors.error);
					}
					var oldMessage = parentEl.querySelector('.' + this.config.selectors.messageError);
					if(oldMessage){
						oldMessage.remove();
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

	VanillaValidator.prototype.callCallbackFunction = function(callback, ref, element, otherParams){
		if(this.isFunction(callback)){
			callback.call(ref, element, otherParams);
		}
	};

	VanillaValidator.prototype.setHTML5NoValidate = function(container){
		if(this.config.novalidateHTML5 && container){
			if(this.isHTMLForm(container)){
				container.setAttribute('novalidate', true);
			}
		}
	};

	VanillaValidator.prototype.init = function(){
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
		this.init();
	}

	return VanillaValidator;
}());