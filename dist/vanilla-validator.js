var VanillaValidator = (function(){

	"use strict";

	var $ = new VVElements();

	/**
	 * Simulates inheritance in javascript. Propagates only the prototypes.
	 * @param {Object} subClass The object that will be a subClass
	 * @param {Object} superClass The object that will be a superClass
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

	/**
	 * Sets configurations by merging user configurations with default configurations
	 * @param {Object} userConfig The user configurations
	 */
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
				async: 'async',
				asyncWaiting: 'vv-async-waiting',
				error: 'error',
				formError: 'form-error',
				messageError: 'msg-error',
				wrapErrors: 'wrap-errors'
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
					fn: function(field, container){
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
					fn: function(field, container){
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
			asyncValidates: {
				'async-validation-example': { // must inform this key in html attribute 'data-async-key'
					message: 'The async validation message',
					fn: function(field, message, container){
						var self = this;
						this.asyncValidationStart(field, 'validando', container);
						setTimeout(function(){
							if(field){
								var ret = (field.value === 'foo');
								self.asyncValidationFinish(field, message, container, ret);
							}
						}, 2000);
					}
				}
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
		this.config = this.mergeObjectsDeeply({}, this.config, userConfig);
	};

	/**
	 * In each container sets configurations to make it validatable
	 */
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

	/**
	 * Defines the 'submission' type of the container
	 * @param { HTMLElement || HTMLFormElement } container The container that will be validated
	 */
	VanillaValidator.prototype.defineSubmitionType = function(container){
		if(this.config.validationBy === 'onclick'){
			this.addButtonClickEvent(container);
		}else{
			this.addFormSubmitEvent(container);
		}
	};

	/**
	 * Sets the 'submission' by submit event and call validations
	 * @param { HTMLElement || HTMLFormElement } container The container that will be validated
	 */
	VanillaValidator.prototype.addFormSubmitEvent = function(container){
		var self = this;
		if(this.isHTMLForm(container)){
			container.addEventListener('submit', function(event){
				event.preventDefault();
				self.onSuccessFormValidate(container);
			});
		}
	};

	/**
	 * Sets the 'submission' by click event and call validations
	 * @param { HTMLElement || HTMLFormElement } container The container that will be validated
	 */
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

	/**
	 * Executed when the container is valid. Here we can submit the form data
	 * @param { HTMLElement || HTMLFormElement } container The container that will be validated
	 */
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

	/**
	 * Call the validate container and related callbacks
	 * @param { HTMLElement || HTMLFormElement } container The container that will be validated
	 * @returns { Boolean } true if is valid
	 */
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

	/**
	 * Validate the container by call validation to each child field
	 * @param { HTMLElement || HTMLFormElement } container The container that will be validated
	 * @returns { Boolean }
	 */
	VanillaValidator.prototype.validateContainer = function(container){
		var ret = true;
		if(container){
			$.removeClass(container, this.config.selectors.formError);
			if(this.config.showListOfValidations)
				this.removeListOfValidations(container);
			var fields = $.getChildren('.' + this.config.selectors.control, container);
			if(fields){
				var i, total = fields.length, field;
				for(i = 0; i < total; i++){
					field = fields[i];
					this.validateAsync(field, container, true);
					if(!this.validateFields(field, container, true)){
						$.addClass(container, this.config.selectors.formError);
						ret = false;
					}
				}
			}
		}
		if(container.getAttribute('data-validation-status') && container.getAttribute('data-validation-status') !== 'valid'){
			$.addClass(container, this.config.selectors.formError);
			ret = false;
		}
		return ret;
	};

	/**
	 * To each selector, get each container child field that does not have 'vv-control' class yet.
	 * @param { HTMLElement || HTMLFormElement } container The container that will be validated
	 */
	VanillaValidator.prototype.addControlClassesOnFields = function(container){
		var fields, key;
		var invalidSelectors = ['vv-control', 'error', 'formError', 'messageError', 'wrapErrors', 'asyncWaiting'];
		for (key in this.config.selectors) {
			if(this.config.selectors.hasOwnProperty(key) && !this.includes(invalidSelectors, key)){
				if(key != this.config.selectors.control){
					fields = $.getChildren('.' + this.config.selectors[key] + ':not(.' + this.config.selectors.control + ')', container);
					this.loopThroughFieldsToAddControls(fields, container);
				}
			}
		}
	};

	/**
	 * Sets 'vv-control' class to each container child field and add events on them
	 * @param { HTMLCollection || NodeList } fields The fields that will be validated
	 * @param { HTMLElement || HTMLFormElement } container The container that will be validated
	 */
	VanillaValidator.prototype.loopThroughFieldsToAddControls = function(fields, container){
		if(fields){ 
			var i, field, total = fields.length;
			for(i = 0; i < total; i++){
				field = fields[i];
				field.classList.add(this.config.selectors.control);
				this.addCustomValidations(field);
				this.addAsyncValidations(field);
				if(this.config.validateOnFieldChanges){
					this.addValidationsOnFieldsEvent(field, container);
				}
			}
		}
	};

	/**
	 * Add 'change' and 'keyup' events to make field validatable
	 * @param { HTMLElement || HTMLInputElement } field The field that will be validated
	 * @param { HTMLElement || HTMLFormElement } container The container that will be validated
	 */
	VanillaValidator.prototype.addValidationsOnFieldsEvent = function(field, container){
		if(field){ 
			var self = this;
			field.addEventListener('change', function(event){
				event.preventDefault();
				self.validateAsync(field, container, false);
				self.validateFields(field, container, false);
			});
			field.addEventListener('keyup', function(event){
				event.preventDefault();
				self.validateFields(field, container, false);
			});
		}
	};

	/**
	 * Validate each field
	 * @param { HTMLElement || HTMLInputElement } field The field that will be validated
	 * @param { HTMLElement || HTMLFormElement } container The container that will be validated
	 * @param { Boolean } onSubmit If is called from submission (true) or from field event (false)
	 * @returns { Boolean } true if all fields are valid
	 */
	VanillaValidator.prototype.validateFields = function(field, container, onSubmit){
		var ret = true, min, max, range, equal, extensions;
		if(field && container){
			// IF NOT ASYNC VALIDATE 
			if(!field.classList.contains(this.config.selectors.async)){
				this.removeValidationView(field);
				// EMAIL
				if(field.classList.contains(this.config.selectors.email)){
					if(!this.factoryValidate(field, this.isEmail, this.config.messages.email, this.config.callbacks.emailError, this.config.callbacks.emailSuccess, null, container, onSubmit)){
						ret = false;
					}
				}
				// PHONE
				if(field.classList.contains(this.config.selectors.phone)){
					if(!this.factoryValidate(field, this.isPhone, this.config.messages.phone, this.config.callbacks.phoneError, this.config.callbacks.phoneSuccess, null, container, onSubmit)){
						ret = false;
					}
				}
				// URL
				if(field.classList.contains(this.config.selectors.url)){
					if(!this.factoryValidate(field, this.isUrl, this.config.messages.url, this.config.callbacks.urlError, this.config.callbacks.urlSuccess, null, container, onSubmit)){
						ret = false;
					}
				}
				// DATE
				if(field.classList.contains(this.config.selectors.date)){
					if(!this.factoryValidate(field, this.isDate, this.config.messages.date, this.config.callbacks.dateError, this.config.callbacks.dateSuccess, null, container, onSubmit)){
						ret = false;
					}
				}
				// CURRENCY
				if(field.classList.contains(this.config.selectors.currency)){
					if(!this.factoryValidate(field, this.isCurrency, this.config.messages.currency, this.config.callbacks.currencyError, this.config.callbacks.currencySuccess, null, container, onSubmit)){
						ret = false;
					}
				}
				// CEP
				if(field.classList.contains(this.config.selectors.cep)){
					if(!this.factoryValidate(field, this.isCep, this.config.messages.cep, this.config.callbacks.cepError, this.config.callbacks.cepSuccess, null, container, onSubmit)){
						ret = false;
					}
				}
				// INTEGER
				if(field.classList.contains(this.config.selectors.integer)){
					if(!this.factoryValidate(field, this.isInteger, this.config.messages.integer, this.config.callbacks.integerError, this.config.callbacks.integerSuccess, null, container, onSubmit)){
						ret = false;
					}
				}
				// DIGIT
				if(field.classList.contains(this.config.selectors.digit)){
					if(!this.factoryValidate(field, this.isDigit, this.config.messages.digit, this.config.callbacks.digitError, this.config.callbacks.digitSuccess, null, container, onSubmit)){
						ret = false;
					}
				}
				// NUMERIC
				if(field.classList.contains(this.config.selectors.numeric)){
					if(!this.factoryValidate(field, this.isNumeric, this.config.messages.numeric, this.config.callbacks.numericError, this.config.callbacks.numericSuccess, null, container, onSubmit)){
						ret = false;
					}
				}
				// MAXLENGTH
				if(field.classList.contains(this.config.selectors.maxLength)){
					max = (field.getAttribute('data-max-length')) ? parseInt(field.getAttribute('data-max-length')) : this.config.customValidationsConfig.maxLength;
					if(!this.factoryValidate(field, this.maxLength, this.config.messages.maxLength, this.config.callbacks.maxLengthError, this.config.callbacks.maxLengthSuccess, max, container, onSubmit)){
						ret = false;
					}
				}
				// MINLENGTH
				if(field.classList.contains(this.config.selectors.minLength)){
					min = (field.getAttribute('data-min-length')) ? parseInt(field.getAttribute('data-min-length')) : this.config.customValidationsConfig.minLength;
					if(!this.factoryValidate(field, this.minLength, this.config.messages.minLength, this.config.callbacks.minLengthError, this.config.callbacks.minLengthSuccess, min, container, onSubmit)){
						ret = false;
					}
				}
				// RANGELENGTH
				if(field.classList.contains(this.config.selectors.rangeLength)){
					min = (field.getAttribute('data-min-length')) ? parseInt(field.getAttribute('data-min-length')) : this.config.customValidationsConfig.rangeLength.min;
					max = (field.getAttribute('data-max-length')) ? parseInt(field.getAttribute('data-max-length')) : this.config.customValidationsConfig.rangeLength.max;
					range = [min, max];
					if(!this.factoryValidate(field, this.rangeLength, this.config.messages.rangeLength, this.config.callbacks.rangeLengthError, this.config.callbacks.rangeLengthSuccess, range, container, onSubmit)){
						ret = false;
					}
				}
				// SAMELENGTH
				if(field.classList.contains(this.config.selectors.sameLength)){
					equal = (field.getAttribute('data-same-length')) ? parseInt(field.getAttribute('data-same-length')) : this.config.customValidationsConfig.sameLength;
					if(!this.factoryValidate(field, this.sameLength, this.config.messages.sameLength, this.config.callbacks.sameLengthError, this.config.callbacks.sameLengthSuccess, equal, container, onSubmit)){
						ret = false;
					}
				}
				// MAX
				if(field.classList.contains(this.config.selectors.max)){
					max = (field.getAttribute('data-max')) ? parseInt(field.getAttribute('data-max')) : this.config.customValidationsConfig.max;
					if(!this.factoryValidate(field, this.isMax, this.config.messages.max, this.config.callbacks.maxError, this.config.callbacks.maxSuccess, max, container, onSubmit)){
						ret = false;
					}
				}
				// MIN
				if(field.classList.contains(this.config.selectors.min)){
					min = (field.getAttribute('data-min')) ? parseInt(field.getAttribute('data-min')) : this.config.customValidationsConfig.min;
					if(!this.factoryValidate(field, this.isMin, this.config.messages.min, this.config.callbacks.minError, this.config.callbacks.minSuccess, min, container, onSubmit)){
						ret = false;
					}
				}
				// RANGE
				if(field.classList.contains(this.config.selectors.range)){
					min = (field.getAttribute('data-min')) ? parseInt(field.getAttribute('data-min')) : this.config.customValidationsConfig.range.min;
					max = (field.getAttribute('data-max')) ? parseInt(field.getAttribute('data-max')) : this.config.customValidationsConfig.range.max;
					range = [min, max];
					if(!this.factoryValidate(field, this.isRange, this.config.messages.range, this.config.callbacks.rangeError, this.config.callbacks.rangeSuccess, range, container, onSubmit)){
						ret = false;
					}
				}
				// EQUALTO
				if(field.classList.contains(this.config.selectors.equalTo)){
					equal = (field.getAttribute('data-equal-to')) ? parseInt(field.getAttribute('data-equal-to')) : this.config.customValidationsConfig.equalTo;
					if(!this.factoryValidate(field, this.equalTo, this.config.messages.equalTo, this.config.callbacks.equalToError, this.config.callbacks.equalToSuccess, equal, container, onSubmit)){
						ret = false;
					}
				}
				// CPF
				if(field.classList.contains(this.config.selectors.cpf)){
					if(!this.factoryValidate(field, this.isCpf, this.config.messages.cpf, this.config.callbacks.cpfError, this.config.callbacks.cpfSuccess, null, container, onSubmit)){
						ret = false;
					}
				}
				// CNPJ
				if(field.classList.contains(this.config.selectors.cnpj)){
					if(!this.factoryValidate(field, this.isCnpj, this.config.messages.cnpj, this.config.callbacks.cnpjError, this.config.callbacks.cnpjSuccess, null, container, onSubmit)){
						ret = false;
					}
				}
				// CNH
				if(field.classList.contains(this.config.selectors.cnh)){
					if(!this.factoryValidate(field, this.isCnh, this.config.messages.cnh, this.config.callbacks.cnhError, this.config.callbacks.cnhSuccess, null, container, onSubmit)){
						ret = false;
					}
				}
				// CREDIT CARD
				if(field.classList.contains(this.config.selectors.creditCard)){
					if(!this.factoryValidate(field, this.isCreditCard, this.config.messages.creditCard, this.config.callbacks.creditCardError, this.config.callbacks.creditCardSuccess, null, container, onSubmit)){
						ret = false;
					}
				}
				// HAS EXTENSION
				if(field.classList.contains(this.config.selectors.hasExtension)){
					extensions = (field.getAttribute('data-extensions')) ? field.getAttribute('data-extensions').split(',') : this.config.customValidationsConfig.extensions;
					if(!this.factoryValidate(field, this.hasExtension, this.config.messages.hasExtension, this.config.callbacks.hasExtension, this.config.callbacks.hasExtension, extensions, container, onSubmit)){
						ret = false;
					}
				}
				// PATTERN
				if(field.classList.contains(this.config.selectors.pattern)){
					if(!this.validatePattern(field, container, onSubmit)){
						ret = false;
					}
				}
				// CUSTOM VALIDATE 
				if(field.classList.contains(this.config.selectors.customValidate)){
					if(!this.validateCustom(field, container, onSubmit)){
						ret = false;
					}
				}
				// REQUIRED
				if(field.classList.contains(this.config.selectors.required)){
					if(field.type === 'checkbox' || field.type === 'radio'){
						if(!this.validateRequiredCR(field, container)){
							ret = false;
						}
					}else{
						if(!this.factoryValidate(field, this.isNotEmpty, this.config.messages.required, this.config.callbacks.requiredError, this.config.callbacks.requiredSuccess, null, container, onSubmit)){
							ret = false;
						}
					}
				}
			}
		}
		// callbacks
		if(ret){
			this.callCallbackFunction(this.config.callbacks.eachFieldSuccess, this, field);
		}else{
			this.callCallbackFunction(this.config.callbacks.eachFieldError, this, field);
		}
		return ret;
	};

	/**
	 * Build validations and validates by params
	 * @param { HTMLElement || HTMLInputElement } field The field that will be validated
	 * @param { Function } ValidationFn The method that will validates the field (this must return a boolean)
	 * @param { String } message The message error
	 * @param { Function } callbackErrorFn The callback of error
	 * @param { Function } callbackSuccessFn The callback of success
	 * @param { String || Number || Array } otherParams Params that cam be used by 'validationFn' method
	 * @param { HTMLElement || HTMLFormElement } container The container that will be validated
	 * @param { Boolean } onSubmit If is called from submission (true) or from field event (false)
	 * @returns { Boolean } true if field is valid
	 */
	VanillaValidator.prototype.factoryValidate = function(field, validationFn, message, callbackErrorFn, callbackSuccessFn, otherParams, container, onSubmit){
		if(field){ 
			if(!validationFn.call(this, field.value, otherParams)){
				this.addValidationView(field, message);
				if(onSubmit && this.config.showListOfValidations){
					this.addListOfValidations(field, message, container);
				}
				this.callCallbackFunction(callbackErrorFn, this, field);
				return false;
			}
		}
		this.callCallbackFunction(callbackSuccessFn, this, field);
		return true;
	};

	/**
	 * Validates required fields type radio and checkbox
	 * @param { HTMLElement || HTMLInputElement } field The field that will be validated
	 * @param { HTMLElement || HTMLFormElement } container The container that will be validated
	 * @param { Boolean } onSubmit If is called from submission (true) or from field event (false)
	 * @returns { Boolean } true if field is valid
	 */
	VanillaValidator.prototype.validateRequiredCR = function(field, container, onSubmit){
		if(field && container){
			if(field.name){
				var fieldsRC = $.getChildren('.' + this.config.selectors.required + '[name=' + field.name + ']', container);
				if(fieldsRC){
					var fieldChecked = $.getChildren('.' + this.config.selectors.required + '[name=' + field.name + ']:checked', container);
					var lastFieldRC = fieldsRC[fieldsRC.length-1];
					if(!fieldChecked){
						this.addValidationView(lastFieldRC, this.config.messages.required);
						if(onSubmit && this.config.showListOfValidations){
							this.addListOfValidations(field, this.config.messages.required, container);
						}
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

	/**
	 * Validates fields by given pattern (pattern and flags given by 'data-pattern' and 'data-flags' html attribute)
	 * @param { HTMLElement || HTMLInputElement } field The field that will be validated
	 * @param { HTMLElement || HTMLFormElement } container The container that will be validated
	 * @param { Boolean } onSubmit If is called from submission (true) or from field event (false)
	 * @returns { Boolean } true if field is valid
	 */
	VanillaValidator.prototype.validatePattern = function(field, container, onSubmit){
		if(field){
			var pattern = (field.getAttribute('data-pattern')) ? field.getAttribute('data-pattern') : this.config.customValidationsConfig.pattern;
			var flags = (field.getAttribute('data-flags')) ? field.getAttribute('data-flags') : this.config.customValidationsConfig.flags;
			if(!this.isPattern(field.value, pattern, flags)){
				this.addValidationView(field, this.config.messages.pattern);
				if(onSubmit && this.config.showListOfValidations){
					this.addListOfValidations(field, this.config.messages.pattern, container);
				}
				this.callCallbackFunction(this.config.callbacks.patternError, this, field);
				return false;
			}
			this.callCallbackFunction(this.config.callbacks.patternSuccess, this, field);
			return true;
		}
	};

	/**
	 * Validates fields with custom validations (Custom validate given by 'data-validate-key' html attribute)
	 * @param { HTMLElement || HTMLInputElement } field The field that will be validated
	 * @param { HTMLElement || HTMLFormElement } container The container that will be validated
	 * @param { Boolean } onSubmit If is called from submission (true) or from field event (false)
	 * @returns { Boolean } true if field is valid
	 */
	VanillaValidator.prototype.validateCustom = function(field, container, onSubmit){
		var ret = true;
		if(field){
			var customKey = field.getAttribute('data-validate-key');
			if(customKey){
				var myCustom = this.config.customValidates[customKey];
				if(myCustom && myCustom.message && myCustom.fn){
					if(this.isFunction(myCustom.fn)){
						if(!myCustom.fn.call(this, field, container, onSubmit)){
							this.addValidationView(field,  myCustom.message);
							if(onSubmit && this.config.showListOfValidations){
								this.addListOfValidations(field,  myCustom.message, container);
							}
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

	/**
	 * Validates fields with async validations (Custom validate given by 'data-async-key' html attribute)
	 * @param { HTMLElement || HTMLInputElement } field The field that will be validated
	 * @param { HTMLElement || HTMLFormElement } container The container that will be validated
	 * @param { Boolean } onSubmit If is called from submission (true) or from field event (false)
	 */
	VanillaValidator.prototype.validateAsync = function(field, container, onSubmit){
		if(field && field.classList.contains(this.config.selectors.async) && container){
			var asyncKey = field.getAttribute('data-async-key');
			if(asyncKey){
				var myAsync = this.config.asyncValidates[asyncKey];
				if(myAsync && myAsync.message && myAsync.fn){
					if(this.isFunction(myAsync.fn)){
						if(!field.getAttribute('data-validation-status') || ! onSubmit || this.config.validateOnFieldChanges !== true){
							myAsync.fn.call(this, field, myAsync.message, container, onSubmit);
						}
						if(onSubmit && this.config.showListOfValidations && field.classList.contains(this.config.selectors.error)){
							this.addListOfValidations(field, myAsync.message, container);
						}
					}else{
						throw new TypeError('The fn of custom async validation must be a function');
					}
				}else{
					throw new TypeError('Check if your custom async validation is correctly configured');
				}
			}
		}
	};

	/**
	 * List on view, all messages errors of container fields
	 * @param { HTMLElement || HTMLInputElement } field The field that will be validated
	 * @param { String } message The error message
	 * @param { HTMLElement || HTMLFormElement } container The container that will be validated
	 */
	VanillaValidator.prototype.addListOfValidations = function(field, message, container){
		if(field && container){
			message = (field.getAttribute('data-message-error')) ? field.getAttribute('data-message-error') : message;
			if(this.config.customListErrors && this.isFunction(this.config.customListErrors.add)){
				this.config.customListErrors.add.call(this, field, message, container);
			}else{
				var errorsWrap = $.getChild('.' + this.config.selectors.wrapErrors, container);
				if(errorsWrap){
					var ulWrap = this.getListOfValidationsContainer(errorsWrap);
					var liWrap = document.createElement('LI');
					$.inner(liWrap, message);
					ulWrap.appendChild(liWrap);
				}
			}
		}
	};

	/**
	 * Creates a UL element int wrapErros if wrapErros is not a UL element
	 * @param { HTMLElement } wrap The wrapErrors element
	 * @returns { HTMLElement } A UL element where will receive a list of errors
	 */
	VanillaValidator.prototype.getListOfValidationsContainer = function(wrap){
		if(wrap && wrap.tagName !== 'UL'){
			var ul = $.getChild('ul', wrap);
			if(!ul){
				var tempUL = document.createElement('UL');
				wrap.appendChild(tempUL);
				ul = $.getChild('ul', wrap);
			}
			return ul;
		}
		return wrap;
	};

	/**
	 * Remove all messages errors of container fields
	 * @param { HTMLElement || HTMLFormElement } container The container that will be validated
	 */
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

	/**
	 * For each field, adds messages errors view
	 * @param { HTMLElement || HTMLInputElement } field The field that will be validated
	 * @param { String } message The error message
	 * @param { String } cls The optional class to message error
	 */
	VanillaValidator.prototype.addValidationView = function(field, message, cls){
		if(field){
			message = (field.getAttribute('data-message-error')) ? field.getAttribute('data-message-error') : message;
			var errorClass = cls || this.config.selectors.messageError;
			if(this.config.customViewErrors && this.isFunction(this.config.customViewErrors.add)){
				this.config.customViewErrors.add.call(this, field, message, errorClass);
			}else{
				var parentEl = (this.isArray(field)) ? field[field.length-1].parentElement : field.parentElement;
				if(parentEl){
					var messageContainer = document.createElement('SPAN');
					messageClass = document.createAttribute('class');
					$.inner(messageContainer,message);
					messageClass.value = errorClass;
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

	/**
	 * For each field, removes messages errors view
	 * @param { HTMLElement || HTMLInputElement } field The field that will be validated
	 * @param { String } cls The optional class to message error
	 */
	VanillaValidator.prototype.removeValidationView = function(field, cls){
		if(field){
			var errorClass = cls || this.config.selectors.messageError;
			if(this.config.customViewErrors && this.isFunction(this.config.customViewErrors.remove)){
				this.config.customViewErrors.remove.call(this, field, errorClass);
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
					var messageErrorClass = errorClass;
					var oldMessage = $.getChild('.' + messageErrorClass, parentEl);
					if(oldMessage){
						oldMessage.remove();
					}
				}
			}
		}
	};

	/**
	 * Add custom method on 'this.config.customValidates' that will be used in 'validateCustom'; (the method must be given by user config object and informed by 'data-validation-key' html attribute)
	 * @param { HTMLElement || HTMLFormElement } field The container that will be validated
	 */
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

	/**
	 * Add custom async method on 'this.config.asyncValidates' that will be used in 'validateAsync'; (the method must be given by user config object and informed by 'data-async-key' html attribute)
	 * @param { HTMLElement || HTMLFormElement } field The container that will be validated
	 */
	VanillaValidator.prototype.addAsyncValidations = function(field){
		if(field){
			var asyncKey = field.getAttribute('data-async-key');
			if(asyncKey){
				var myAsync = this.config.asyncValidates[asyncKey];
				if(!myAsync){
					this.config.asyncValidates[asyncKey] = this.userConfig.asyncValidates[asyncKey];
				}
			}
		}
	};

	/**
	 * Must be called whan a async validation starts
	 * @param { HTMLElement || HTMLInputElement } field The field that will be validated
	 * @param { String } message The message error
	 * @param { HTMLElement || HTMLFormElement } container The container that will be validated
	 */
	VanillaValidator.prototype.asyncValidationStart = function(field, message, container){
		if(field && container){
			container.setAttribute('data-validation-status', 'waiting');
			field.setAttribute('data-validation-status', 'waiting');
			this.removeValidationView(field, this.config.selectors.asyncWaiting);
			this.addValidationView(field, message, this.config.selectors.asyncWaiting);
		}
	};

	/**
	 * Must be called whan a async validation finishes
	 * @param { HTMLElement || HTMLInputElement } field The field that will be validated
	 * @param { String } message The message error
	 * @param { HTMLElement || HTMLFormElement } container The container that will be validated
	 * @param { Boolean } isValid If is valid (true)
	 */
	VanillaValidator.prototype.asyncValidationFinish = function(field, message, container, isValid){
		if(field){
			var status = (isValid) ? 'valid' : 'invalid';
			field.setAttribute('data-validation-status', status);
			this.removeValidationView(field, this.config.selectors.asyncWaiting);
			if(!isValid){
				this.addValidationView(field, message);
			}
			if(!this.asyncContainerHasErrors(container)){
				container.setAttribute('data-validation-status', 'valid');
			}else{
				container.setAttribute('data-validation-status', 'invalid');
			}
		}
	};

	/**
	 * Checs if container has some field with errors
	 * @param { HTMLElement || HTMLFormElement } container The container that will be validated
	 * @returns { Boolean } If has erros (true)
	 */
	VanillaValidator.prototype.asyncContainerHasErrors = function(container){
		if(container){
			var asyncFields = $.getChildren('.' + this.config.selectors.async + '.' + this.config.selectors.error, container);
			if(asyncFields && asyncFields.length > 0){
				return true;
			}
		}
		return false;
	};

	/**
	 * Calls de callback functions
	 * @param { Function } callback The callback method
	 * @param { Object } ref The new reference
	 * @param { HTMLElement || HTMLFormElement || HTMLInputElement } element The container or field that will be validated
	 * @param { String || Number || Array } otherParams The params that can be used by callback
	 */
	VanillaValidator.prototype.callCallbackFunction = function(callback, ref, element, otherParams){
		if(this.isFunction(callback)){
			callback.call(ref, element, otherParams);
		}
	};

	/**
	 * Sets html attribute 'novalidate' as true to disabled default validations of html5
	 * @param { HTMLElement || HTMLFormElement || HTMLInputElement } container The container or field that will be validated
	 */
	VanillaValidator.prototype.setHTML5NoValidate = function(container){
		if(this.config.novalidateHTML5 && container){
			if(this.isHTMLForm(container)){
				container.setAttribute('novalidate', true);
			}
		}
	};

	/**
	 * Merge objects deeply
	 * @param { Object } target A new empty object
	 * @param { Object } objectDefault A object that will be merged
	 * @param { Object } objectUser A object that will be merged
	 * @returns { Object } A new object merged
	 */
	VanillaValidator.prototype.mergeObjectsDeeply = function(target, objectDefault, objectUser){
		if(this.isObject(objectDefault) && this.isObject(objectUser) && this.isObject(target)){
			var t;
			for(t in objectDefault){
				if(objectDefault.hasOwnProperty(t)){
					if(this.isObject(objectDefault[t]) && this.isObject(objectDefault[t])){
						target[t] = objectDefault[t];
						// applying recursion to copy deeply
						this.mergeObjectsDeeply(target[t], objectDefault[t], objectUser[t]);
					}else{
						if(objectUser[t] !== undefined){
							target[t] = objectUser[t];
						}else{
							target[t] = objectDefault[t];
						}
					}
				}
			}
		}
		return target;
	};

	/**
	 * Initializes the plugin
	 */
	VanillaValidator.prototype.init = function(){
		this.containers = $.getElements(this.config.container);
		this.loopThroughContainers();
	};

	/**
	 * The constructor
	 * @constructor
	 */
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