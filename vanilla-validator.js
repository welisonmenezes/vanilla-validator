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
			showListOfValidations: true,
			selectors: { // just css classes
				control: 'vv-control',
				required: 'required',
				email: 'email',
				integer: 'integer',
				digit: 'digit',
				numeric: 'numeric',
				pattern: 'pattern',
				phone: 'phone', // brazilian format
				url: 'url',
				date: 'date', // brazilian format
				currency: 'currency', // brazilian format
				cep: 'cep', // brazilian format
				maxLength: 'max-length',
				minLength: 'min-length',
				rangeLength: 'range-length',
				sameLength: 'same-length',
				max: 'max',
				min: 'min',
				range: 'range',
				equalTo: 'equal-to',
				cpf: 'cpf', // brazilian document
				cnpj: 'cnpj',  // brazilian document
				cnh: 'cnh', // brazilian document
				creditCard: 'credit-card',
				hasExtension: 'has-extension',
				customValidate: 'custom-validate',
				error: 'error',
				formError: 'form-error',
				messageError: 'msg-error',
				wrapErrors: 'wrap-errors' // must be a UL element
			},
			messages: { // or by html attribute 'data-message-error'
				required: 'Required field',
				email: 'Invalid email',
				integer: 'Needs to be a integer',
				digit: 'Only letters and numbers',
				numeric: 'Only  numbers',
				pattern: 'Needs to matchs pattern',
				phone: 'Invalid phone number',
				url: 'Invalid url',
				date: 'Invalid date',
				currency: 'Invalid currency',
				cep: 'Invalid cep',
				maxLength: 'The amount of characters is greater than allowed',
				minLength: 'The amount of characters is less than allowed',
				rangeLength: 'The number of characters must be between 3 and 5',
				sameLength: 'The value needs to have 5 characters',
				max: 'The value needs to be less or equals to 5',
				min: 'The value needs to be greater or equals to 3',
				range: 'The value needs to be between 3 and 5',
				equalTo: 'The value needs to be 10',
				cpf: 'Invalid cpf',
				cnpj: 'Invalid cnpj',
				cnh: 'Invalid cnh',
				creditCard: 'Invalid credit card number',
				hasExtension: 'Invalid extension detected'
			},
			customValidationsConfig: {
				pattern: '[0-9]', // or by html attribute 'data-pattern'
				flags: 'g', // or by html attribute 'data-flags'
				maxLength: 5,
				minLength: 5,
				sameLength: 5,
				rangeLength: {
					min: 3,
					max: 5
				},
				max: 5,
				min: 3,
				range: {
					max: 5,
					min: 3
				},
				equalTo: 10,
				extensions: ['jpg', 'png'] // or by html attribute 'data-extensions' without spaces and separated by commas
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
				numericError: null,
				numericSuccess: null,
				phoneError: null,
				phoneSuccess: null,
				urlError: null,
				urlSuccess: null,
				dateError: null,
				dateSuccess: null,
				currencyError: null,
				currencySuccess: null,
				cepError: null,
				cepSuccess: null,
				maxLengthError: null,
				maxLengthSuccess: null,
				minLengthError: null,
				minLengthSuccess: null,
				rangeLengthError: null,
				rangeLengthSuccess: null,
				sameLengthError: null,
				sameLengthSuccess: null,
				maxError: null,
				maxSuccess: null,
				minError: null,
				minSuccess: null,
				rangeError: null,
				rangeSuccess: null,
				equalToError: null,
				equalToSuccess: null,
				cpfError: null,
				cpfSuccess: null,
				cnpjError: null,
				cnpjSuccess: null,
				cnhError: null,
				cnhSuccess: null,
				creditCardSuccess: null,
				creditCardError: null,
				hasExtensionSuccess: null,
				hasExtensionError: null,
				patternError: null,
				patternSuccess: null,
				beforeValidate: null,
				afterValidate: null,
				error: null,
				success: null
			},
			customValidates: { // will react to the selector 'customValidate'
				'equal-anchored-field': { // must inform this key in html attribute 'data-validate-key'
					message: 'The value needs to be equal',
					fn: function(field, message, container){
						var queryAnchor = field.getAttribute('data-anchored-field');
						if(queryAnchor){
							var anchor = $.getChild(queryAnchor, container);
							if(anchor){
								if(field.value !== anchor.value) return false;
							}
						}
						return true;
					}
				},
				'different-anchored-field': { // must inform this key in html attribute 'data-validate-key'
					message: 'The value needs to be different',
					fn: function(field, message, container){
						var queryAnchor = field.getAttribute('data-anchored-field');
						if(queryAnchor){
							var anchor = $.getChild(queryAnchor, container);
							if(anchor){
								if(field.value === anchor.value) return false;
							}
						}
						return true;
					}
				},
			},
			customViewErrors: {
				add: null,
				remove: null
			},
			customListErrors: {
				add: null,
				remove: null
			},
			onContainerSuccess: null,
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
				if(this.config.onContainerSuccess && this.isFunction(this.config.onContainerSuccess)){
					this.config.onContainerSuccess.call(this, container);
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
			if(this.config.showListOfValidations)
				this.removeListOfValidations(container);
			var fields = $.getChildren('.' + this.config.selectors.control, container);
			if(fields){
				var i, total = fields.length, field;
				for(i = 0; i < total; i++){
					field = fields[i];
					if(!this.validateFields(field, container, true)) ret = false;
				}
			}
		}
		return ret;
	};

	VanillaValidator.prototype.addControlClassesOnFields = function(container){
		var field, key;
		var invalidSelectors = ['vv-control', 'error', 'formError', 'messageError', 'wrapErrors'];
		for (key in this.config.selectors) {
			if(this.config.selectors.hasOwnProperty(key) && !this.includes(invalidSelectors, key)){
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
				self.validateFields(field, container, false);
			});
			field.addEventListener('keyup', function(event){
				event.preventDefault();
				self.validateFields(field, container, false);
			});
		}
	};

	VanillaValidator.prototype.validateFields = function(field, container, onSubmit){
		var ret = true, min, max, range, equal, extensions;
		if(field && container){
			this.removeValidationView(field);

			// EMAIL
			if(field.classList.contains(this.config.selectors.email)){
				if(!this.factoryValidate(field, this.isEmail, this.config.messages.email, this.config.callbacks.emailError, this.config.callbacks.emailSuccess, null, container, onSubmit)) ret = false;
			}

			// PHONE
			if(field.classList.contains(this.config.selectors.phone)){
				if(!this.factoryValidate(field, this.isPhone, this.config.messages.phone, this.config.callbacks.phoneError, this.config.callbacks.phoneSuccess, null, container, onSubmit)) ret = false;
			}

			// URL
			if(field.classList.contains(this.config.selectors.url)){
				if(!this.factoryValidate(field, this.isUrl, this.config.messages.url, this.config.callbacks.urlError, this.config.callbacks.urlSuccess, null, container, onSubmit)) ret = false;
			}

			// DATE
			if(field.classList.contains(this.config.selectors.date)){
				if(!this.factoryValidate(field, this.isDate, this.config.messages.date, this.config.callbacks.dateError, this.config.callbacks.dateSuccess, null, container, onSubmit)) ret = false;
			}

			// CURRENCY
			if(field.classList.contains(this.config.selectors.currency)){
				if(!this.factoryValidate(field, this.isCurrency, this.config.messages.currency, this.config.callbacks.currencyError, this.config.callbacks.currencySuccess, null, container, onSubmit)) ret = false;
			}

			// CEP
			if(field.classList.contains(this.config.selectors.cep)){
				if(!this.factoryValidate(field, this.isCep, this.config.messages.cep, this.config.callbacks.cepError, this.config.callbacks.cepSuccess, null, container, onSubmit)) ret = false;
			}

			// INTEGER
			if(field.classList.contains(this.config.selectors.integer)){
				if(!this.factoryValidate(field, this.isInteger, this.config.messages.integer, this.config.callbacks.integerError, this.config.callbacks.integerSuccess, null, container, onSubmit)) ret = false;
			}

			// DIGIT
			if(field.classList.contains(this.config.selectors.digit)){
				if(!this.factoryValidate(field, this.isDigit, this.config.messages.digit, this.config.callbacks.digitError, this.config.callbacks.digitSuccess, null, container, onSubmit)) ret = false;
			}

			// NUMERIC
			if(field.classList.contains(this.config.selectors.numeric)){
				if(!this.factoryValidate(field, this.isNumeric, this.config.messages.numeric, this.config.callbacks.numericError, this.config.callbacks.numericSuccess, null, container, onSubmit)) ret = false;
			}

			// MAXLENGTH
			if(field.classList.contains(this.config.selectors.maxLength)){
				max = (field.getAttribute('data-max-length')) ? parseInt(field.getAttribute('data-max-length')) : this.config.customValidationsConfig.maxLength;
				if(!this.factoryValidate(field, this.maxLength, this.config.messages.maxLength, this.config.callbacks.maxLengthError, this.config.callbacks.maxLengthSuccess, max, container, onSubmit)) ret = false;
			}

			// MINLENGTH
			if(field.classList.contains(this.config.selectors.minLength)){
				min = (field.getAttribute('data-min-length')) ? parseInt(field.getAttribute('data-min-length')) : this.config.customValidationsConfig.minLength;
				if(!this.factoryValidate(field, this.minLength, this.config.messages.minLength, this.config.callbacks.minLengthError, this.config.callbacks.minLengthSuccess, min, container, onSubmit)) ret = false;
			}

			// RANGELENGTH
			if(field.classList.contains(this.config.selectors.rangeLength)){
				min = (field.getAttribute('data-min-length')) ? parseInt(field.getAttribute('data-min-length')) : this.config.customValidationsConfig.rangeLength.min;
				max = (field.getAttribute('data-max-length')) ? parseInt(field.getAttribute('data-max-length')) : this.config.customValidationsConfig.rangeLength.max;
				range = [min, max];
				if(!this.factoryValidate(field, this.rangeLength, this.config.messages.rangeLength, this.config.callbacks.rangeLengthError, this.config.callbacks.rangeLengthSuccess, range, container, onSubmit)) ret = false;
			}

			// SAMELENGTH
			if(field.classList.contains(this.config.selectors.sameLength)){
				equal = (field.getAttribute('data-same-length')) ? parseInt(field.getAttribute('data-same-length')) : this.config.customValidationsConfig.sameLength;
				if(!this.factoryValidate(field, this.sameLength, this.config.messages.sameLength, this.config.callbacks.sameLengthError, this.config.callbacks.sameLengthSuccess, equal, container, onSubmit)) ret = false;
			}

			// MAX
			if(field.classList.contains(this.config.selectors.max)){
				max = (field.getAttribute('data-max')) ? parseInt(field.getAttribute('data-max')) : this.config.customValidationsConfig.max;
				if(!this.factoryValidate(field, this.isMax, this.config.messages.max, this.config.callbacks.maxError, this.config.callbacks.maxSuccess, max, container, onSubmit)) ret = false;
			}

			// MIN
			if(field.classList.contains(this.config.selectors.min)){
				min = (field.getAttribute('data-min')) ? parseInt(field.getAttribute('data-min')) : this.config.customValidationsConfig.min;
				if(!this.factoryValidate(field, this.isMin, this.config.messages.min, this.config.callbacks.minError, this.config.callbacks.minSuccess, min, container, onSubmit)) ret = false;
			}

			// RANGE
			if(field.classList.contains(this.config.selectors.range)){
				min = (field.getAttribute('data-min')) ? parseInt(field.getAttribute('data-min')) : this.config.customValidationsConfig.range.min;
				max = (field.getAttribute('data-max')) ? parseInt(field.getAttribute('data-max')) : this.config.customValidationsConfig.range.max;
				range = [min, max];
				if(!this.factoryValidate(field, this.isRange, this.config.messages.range, this.config.callbacks.rangeError, this.config.callbacks.rangeSuccess, range, container, onSubmit)) ret = false;
			}

			// EQUALTO
			if(field.classList.contains(this.config.selectors.equalTo)){
				equal = (field.getAttribute('data-equal-to')) ? parseInt(field.getAttribute('data-equal-to')) : this.config.customValidationsConfig.equalTo;
				if(!this.factoryValidate(field, this.equalTo, this.config.messages.equalTo, this.config.callbacks.equalToError, this.config.callbacks.equalToSuccess, equal, container, onSubmit)) ret = false;
			}

			// CPF
			if(field.classList.contains(this.config.selectors.cpf)){
				if(!this.factoryValidate(field, this.isCpf, this.config.messages.cpf, this.config.callbacks.cpfError, this.config.callbacks.cpfSuccess, null, container, onSubmit)) ret = false;
			}

			// CNPJ
			if(field.classList.contains(this.config.selectors.cnpj)){
				if(!this.factoryValidate(field, this.isCnpj, this.config.messages.cnpj, this.config.callbacks.cnpjError, this.config.callbacks.cnpjSuccess, null, container, onSubmit)) ret = false;
			}

			// CNH
			if(field.classList.contains(this.config.selectors.cnh)){
				if(!this.factoryValidate(field, this.isCnh, this.config.messages.cnh, this.config.callbacks.cnhError, this.config.callbacks.cnhSuccess, null, container, onSubmit)) ret = false;
			}

			// CREDIT CARD
			if(field.classList.contains(this.config.selectors.creditCard)){
				if(!this.factoryValidate(field, this.isCreditCard, this.config.messages.creditCard, this.config.callbacks.creditCardError, this.config.callbacks.creditCardSuccess, null, container, onSubmit)) ret = false;
			}

			// HAS EXTENSION
			if(field.classList.contains(this.config.selectors.hasExtension)){
				extensions = (field.getAttribute('data-extensions')) ? field.getAttribute('data-extensions').split(',') : this.config.customValidationsConfig.extensions;
				if(!this.factoryValidate(field, this.hasExtension, this.config.messages.hasExtension, this.config.callbacks.hasExtension, this.config.callbacks.hasExtension, extensions, container, onSubmit)) ret = false;
			}

			// PATTERN
			if(field.classList.contains(this.config.selectors.pattern)){
				if(!this.validatePattern(field, container, onSubmit)) ret = false;
			}

			// CUSTOM VALIDATE 
			if(field.classList.contains(this.config.selectors.customValidate)){
				if(!this.validateCustom(field, container, onSubmit)) ret = false;
			}

			// REQUIRED
			if(field.classList.contains(this.config.selectors.required)){
				if(field.type === 'checkbox' || field.type === 'radio'){
					if(!this.validateRequiredCR(field, container)) ret = false;
				}else{
					if(!this.factoryValidate(field, this.isNotEmpty, this.config.messages.required, this.config.callbacks.requiredError, this.config.callbacks.requiredSuccess, null, container, onSubmit)) ret = false;
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

	VanillaValidator.prototype.factoryValidate = function(field, validationFn, message, callbackErrorFn, callbackSuccessFn, otherParams, container, onSubmit){
		if(field){
			if(!validationFn.call(this, field.value, otherParams)){
				this.addValidationView(field, message);
				if(onSubmit && this.config.showListOfValidations) 
					this.addListOfValidations(field, message, container);
				this.callCallbackFunction(callbackErrorFn, this, field);
				return false;
			}
		}
		this.callCallbackFunction(callbackSuccessFn, this, field);
		return true;
	};

	VanillaValidator.prototype.validateRequiredCR = function(field, container, onSubmit){
		if(field && container){
			if(field.name){
				var fieldsRC = $.getChildren('.' + this.config.selectors.required + '[name=' + field.name + ']', container);
				if(fieldsRC){
					var fieldChecked = $.getChildren('.' + this.config.selectors.required + '[name=' + field.name + ']:checked', container);
					var lastFieldRC = fieldsRC[fieldsRC.length-1];
					if(!fieldChecked){
						this.addValidationView(lastFieldRC, this.config.messages.required);
						if(onSubmit && this.config.showListOfValidations)
							this.addListOfValidations(field, this.config.messages.required, container);
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

	VanillaValidator.prototype.validatePattern = function(field, container, onSubmit){
		if(field){
			var pattern = (field.getAttribute('data-pattern')) ? field.getAttribute('data-pattern') : this.config.customValidationsConfig.pattern;
			var flags = (field.getAttribute('data-flags')) ? field.getAttribute('data-flags') : this.config.customValidationsConfig.flags;
			if(!this.isPattern(field.value, pattern, flags)){
				this.addValidationView(field, this.config.messages.pattern);
				if(onSubmit && this.config.showListOfValidations)
					this.addListOfValidations(field, this.config.messages.pattern, container);
				this.callCallbackFunction(this.config.callbacks.patternError, this, field);
				return false;
			}
			this.callCallbackFunction(this.config.callbacks.patternSuccess, this, field);
			return true;
		}
	};

	VanillaValidator.prototype.validateCustom = function(field, container, onSubmit){
		var ret = true;
		if(field){
			var customKey = field.getAttribute('data-validate-key');
			if(customKey){
				var myCustom = this.config.customValidates[customKey];
				if(myCustom && myCustom.message && myCustom.fn){
					if(this.isFunction(myCustom.fn)){
						if(!myCustom.fn.call(this, field, myCustom.message, container, onSubmit)){
							this.addValidationView(field,  myCustom.message);
							if(onSubmit && this.config.showListOfValidations)
								this.addListOfValidations(field,  myCustom.message, container);
							ret = false;
						}
					}else{
						throw new TypeError('The fn of custom validation must be a function');
					}
				}else{
					throw new TypeError('Check if your custom validation is correctly configured');
				}
			}
		}
		return ret;
	};

	VanillaValidator.prototype.addListOfValidations = function(field, message, container){
		if(field && container){
			message = (field.getAttribute('data-message-error')) ? field.getAttribute('data-message-error') : message;
			if(this.config.customListErrors && this.isFunction(this.config.customListErrors.add)){
				this.config.customListErrors.add.call(this, field, message, container);
			}else{
				var errorsWrap = $.getChild('.' + this.config.selectors.wrapErrors, container);
				if(errorsWrap){
					
					var liWrap = document.createElement('LI');
					$.inner(liWrap, message);
					errorsWrap.appendChild(liWrap);
				}
			}
			
		}
	};

	VanillaValidator.prototype.removeListOfValidations = function(container){
		if(container){
			if(this.config.customListErrors && this.isFunction(this.config.customListErrors.remove)){
				this.config.customListErrors.remove.call(this, container);
			}else{
				var errorsWrap = $.getChild('.' + this.config.selectors.wrapErrors, container);
				$.inner(errorsWrap);
			}
		}
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
					$.inner(messageContainer,message);
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
					var oldMessage = $.getChild('.' + this.config.selectors.messageError, parentEl);
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
					var oldMessage = $.getChild('.' + this.config.selectors.messageError, parentEl);
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