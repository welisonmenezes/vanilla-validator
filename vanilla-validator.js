var VanillaValidator = (function(){

	var $ = new VVElements();
	var utils = new VVUtils();

	var setConfigurations = function(userConfig){
		// default configurations
		this.config = {
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
		utils.mergeObjectsDeeply({}, this.config, userConfig);
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


	// the constructor
	function VanillaValidator(userConfig){

		// force call with new operator
		if (!(this instanceof VanillaValidator)) { 
			throw new TypeError("Cannot call a class as a function");
		}

		// Propagates only the attributes.
		VVChecks.apply(this, arguments);

		// set configurations for this instance
		setConfigurations.apply(this, [userConfig]);
	};

	

	return VanillaValidator;
}());