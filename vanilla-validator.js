var VanillaValidator = (function(){

	var $ = new VVElements();
	var utils = new VVUtils();

	var _setConfigurations = function(userConfig){

		// default configurations
		this.config = {
			container: 'form',
			button: null,
			validationBy: 'onclick', // [onclick, onsubmit]
			selectors: { // just css classes
				required: "required",
				email: "email",
				phone: "phone",
				cpf: "cpf",
				cnpj: "cnpj",
				error: "error",
				formError: "form-error",
				messageError: "msg-error"
			},
			messages: {
				required: "Required field",
				email: "Invalid email",
				phone: "Invalid phone number"
			},
			novalidateHTML5: true,
			clearErrosOnChange: true,
			callbacks: {
				CB_FieldEach: null,
				CB_Required: null,
				CB_Required: null,
				CB_Email: null,
				CB_EmailEach: null,
				CB_BeforeValidate: null,
				CB_AfterValidate: null,
				CB_Error: null,
				CB_ClearErrors: null,
				CB_ClearErrorsEach: null,
				CB_Success: null
			},
			overrides: {
				OV_Email: null,
				OV_Required: null,
				OV_Success: null
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
		if (typeof superClass !== "function" && superClass !== null) { 

			throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); 
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
			var self = this,
				i, container,
				total = this.containers.length;
			for(var i = 0; i < total; i++){
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
				//self.validateContainer(event.target);
			});
		}
	};

	VanillaValidator.prototype.addButtonClickEvent = function(container){
		var self = this,
			button;
		if(this.config.button && $.getChild(this.config.button, container)){
			button = $.getChild(this.config.button, container);
		}else{
			button = $.getButtonSubmit(container);
		}
		if(button){
			button.addEventListener('click', function(event){
				event.preventDefault();
				//self.validateContainer(container);
			});
		}
	};

	VanillaValidator.prototype.addControlClassesOnFields = function(container){
		var field;
		for (var key in this.config.selectors) {
			field = $.getChildren('.' + this.config.selectors[key] + ':not(.vv-control)', container);
			this.loopThroughFieldsToAddControls(field, container);
		}
	};

	VanillaValidator.prototype.loopThroughFieldsToAddControls = function(fields, container){
		if(fields){
			var i,
				field,
				total = fields.length;
			for(i = 0; i < total; i++){
				field = fields[i];
				field.classList.add('vv-control');

				if(this.config.clearErrosOnChange){
					this.addClearEventsOnField(field, container);
				}
			}
		}
	};

	VanillaValidator.prototype.addClearEventsOnField = function(field, container){

		if(field){
			var self = this;
			field.addEventListener("change", function(){
				self.validateFields(field, container);
			});
			field.addEventListener("keyup", function(){
				self.validateFields(field, container);
			});
		}
	};

	VanillaValidator.prototype.validateFields = function(field, container){

		if(field && container){

			this.removeValidationView(field);

			// EMAIL
			if(field.classList.contains(this.config.selectors.email)){
				this.validateEmail(field);
			}

			// REQUIRED
			if(field.classList.contains(this.config.selectors.required)){
				if(field.type === 'checkbox' || field.type === 'radio'){
					this.validateRequiredRC(field, container);
				}else{
					this.validateRequired(field);
				}
			}
		}
	};

	VanillaValidator.prototype.validateRequired = function(field){
		if(field){
			if(this.isEmpty(field.value)){
				this.addValidationView(field, this.config.messages.required);
				return false;
			}
			return true;
		}
	};

	VanillaValidator.prototype.validateRequiredRC = function(field, container){
		if(field && container){
			if(field.name){
				var fieldsRC = $.getChildren('.' + this.config.selectors.required + '[name=' + field.name + ']', container);
				if(fieldsRC){
					var fieldChecked = $.getChildren('.' + this.config.selectors.required + '[name=' + field.name + ']:checked', container);
					var lastFieldRC = fieldsRC[fieldsRC.length-1];
					if(!fieldChecked){
						this.addValidationView(lastFieldRC, this.config.messages.required);
						return false;
					}
					return true;
				}
			}
		}
	};

	VanillaValidator.prototype.validateEmail = function(field){
		if(field){
			if(!this.isEmail(field.value)){
				this.addValidationView(field, this.config.messages.email);
				return false;
			}
			return true;
		}
	}

	/*
	VanillaValidator.prototype.validateContainer = function(container){
		
		if(container){

			this.removeValidationViewOfAll(container);

			if(this.isContainerValid(container)){
			
				console.log('É válido!');
			}else{

				console.log('Não é válido!');
			}
		}
		
	};

	VanillaValidator.prototype.isContainerValid = function(container){

		if(container){

			console.log('validateEmail', this.validateEmail(container));
			console.log('validateRequired', this.validateRequired(container));
			console.log('validateRequiredRadiosAndCheckboxes', this.validateRequiredRadiosAndCheckboxes(container));
			
		}

		return true;
	};

	VanillaValidator.prototype.validateRequired = function(container){

		var ret = true;
		if(container){

			var fields = $.getChildren('.' + this.config.selectors.required + ':not([type="checkbox"]):not([type="radio"])', container);
			if(fields){

				var i, total = fields.length;
				for(i = 0; i < total; i++){

					var field = fields[i];

					if(this.isEmpty(field.value)){

						this.addValidationView(field, this.config.messages.required);
						ret = false;
					}
				}
			}
		}

		return ret;
	};

	VanillaValidator.prototype.validateRequiredRadiosAndCheckboxes = function(container){

		var ret = true;
		if(container){

			var fields = $.getChildren('.' + this.config.selectors.required + '[type="checkbox"], .' + this.config.selectors.required + '[type="radio"]', container);
			if(fields){

				var i,
					total = fields.length,
					checkboxRadios = {};
				for(i = 0; i < total; i++){

					var field = fields[i];

					// add checkbox and radio fields into array to validate after
					if(! checkboxRadios[field.name]){

						checkboxRadios[field.name] = [];

						// item responsible for validating the field
						checkboxRadios[field.name].push("invalid");
					}
					checkboxRadios[field.name].push(field);
				}

				for(cr in checkboxRadios){

					if(checkboxRadios[cr].length){

						var x,
							totalCR = checkboxRadios[cr].length;
						for(x = 1; x < totalCR; x++){

							if(checkboxRadios[cr][x].checked){

								// turn fiedl valid if it is checked
								checkboxRadios[cr][0] = "valid";
							}
						}

						if(checkboxRadios[cr][0] === "invalid"){

							this.addValidationView(checkboxRadios[cr], this.config.messages.required);
							ret = false;
						}
					}
				}
			}
		}

		return ret;
	};

	VanillaValidator.prototype.validateEmail = function(container){

		var ret = true;
		if(container){

			var fields = $.getChildren('.' + this.config.selectors.email, container);
			if(fields){

				var i, total = fields.length;
				for(i = 0; i < total; i++){

					var field = fields[i];

					if(!this.isEmail(field.value)){

						this.addValidationView(field, this.config.messages.email);
						ret = false;
					}
				}
			}
		}

		return ret;
	};

	*/

	VanillaValidator.prototype.addValidationView = function(element, message){
		if(element){

			var parentEl = (element.constructor.name === "Array") ? element[element.length-1].parentElement : element.parentElement;

			if(parentEl){

				var messageContainer = document.createElement("SPAN");
				messageContainer.innerHTML = message;

				var messageClass = document.createAttribute("class");
				messageClass.value = this.config.selectors.messageError;
				messageContainer.setAttributeNode(messageClass);

				if(element.constructor.name === "Array"){

					var i, totalEl = element.length;
					for(i = 1; i < totalEl; i++){

						element[i].classList.add(this.config.selectors.error);
					}
				}else{

					element.classList.add(this.config.selectors.error);
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


	VanillaValidator.prototype.removeValidationView = function(element){
		if(element){

			var parentEl = (element.constructor.name === "Array") ? element[element.length-1].parentElement : element.parentElement;

			if(parentEl){

				if(element.constructor.name === "Array"){
					var i, totalEl = element.length;

					for(i = 1; i < totalEl; i++){
						element[i].classList.remove(this.config.selectors.error);
					}
				}else{
					element.classList.remove(this.config.selectors.error);
				}

				var oldMessages = parentEl.querySelectorAll("." + this.config.selectors.messageError);

				if(oldMessages){
					var x, totalOld = oldMessages.length;
					for(x = 0; x < totalOld; x++){
						oldMessages[x].remove();
					}
				}

			}
		
		}
	};

	VanillaValidator.prototype.removeValidationViewOfAll = function(container){
		if(container){
			var fields = $.getChildren('.' + this.config.selectors.error, container);

			container.classList.remove(this.config.selectors.formError);
	
			if(fields){ 

				var i,
					total = fields.length;

				for(i = 0; i < total; i++){
					this.removeValidationView(fields[i], container);
				}
			}
		}
	};

	VanillaValidator.prototype._init = function(){

		this.containers = $.getElements(this.config.container);
		this.loopThroughContainers();
	};


	// the constructor
	function VanillaValidator(userConfig){

		// force call with new operator
		if (!(this instanceof VanillaValidator)) { 

			throw new TypeError("Cannot call a class as a function");
		}

		// Propagates only the attributes.
		VVChecks.apply(this, arguments);

		// set configurations for this instance
		_setConfigurations.apply(this, [userConfig]);

		this._init();

	};



	

	return VanillaValidator;
}());