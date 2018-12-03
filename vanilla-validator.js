var VanillaValidator = (function(){

	var $ = new VVElements();
	var utils = new VVUtils();

	var _setConfigurations = function(userConfig){
		// default configurations
		this.config = {
			container: 'form',
			button: null,
			validationBy: 'onclick', // [onclick, onsubmit]
			selectors: {
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
				required: "Required filed",
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
	}
	// makes VanillaValidator inherit from VVChecks
	_inherits(VanillaValidator, VVChecks);


	VanillaValidator.prototype.addFormSubmitEvent = function(){

		if(this.container.length){

			var i, total = this.container.length;
			for(i = 0; i < total; i++){

				if(this.container[i].tagName === 'FORM'){

					this.container[i].addEventListener('submit', function(event){

						event.preventDefault();
						alert('Submit');
					});
				}
			}
		}
	};

	VanillaValidator.prototype.addButtonClickEvent = function(){

		if(this.container.length){

			var i, total = this.container.length, button = null;
			for(i = 0; i < total; i++){

				var button, container = this.container[i];

				if(this.config.button && $.getChild(this.config.button, container)){

					button = $.getChild(this.config.button, container)
				}else{

					button = $.getButtonSubmit(container);
				}
				
				button.addEventListener('click', function(event){

					event.preventDefault();
					alert('click');
				});
			}
		}
	};



	VanillaValidator.prototype._init = function(){

		this.container = $.getElements(this.config.container);

		if(this.config.validationBy === 'onclick'){

			this.addButtonClickEvent();
		}else{

			this.addFormSubmitEvent();
		}
	}


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