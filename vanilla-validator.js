var VanillaValidator = (function(){

	var querySelector, forms;

	/**
	 * return all forms that query selector matches
	 *
	 * @method getForms
	 * @return {NodeList || null}
	 */
	var getForms = function(){
		var forms = document.querySelectorAll(querySelector);
		if(forms){
			return forms;
		}
		return null;
	};

	/**
	 * turns the forms novalidate by defautl
	 *
	 * @method setHTML5NoValidate
	 * @param {NodeList} list of forms
	 */
	var setHTML5NoValidate = function(forms){
		if(forms){
			var i, total = forms.length;
			for(i = 0; i < total; i++){
				forms[i].setAttribute("novalidate", true);
			}
		}
	};

	/**
	 * handle the event submit of form
	 *
	 * @method addEventToForms
	 */
	var addEventToForms = function(){
		if(forms){
			var i, total = forms.length;
			for(i = 0; i < total; i++){
				forms[i].addEventListener("submit", function(event){
					event.preventDefault();

					console.log(applyValidationRequired(this));

				});
			}
		}
	};

	/**
	 * get required fields from especified form
	 *
	 * @method getFieldsRequireds
	 * @param {NodeList} list of forms
	 * @return {NodeList || null} returns the fields or null
	 */
	var getFieldsRequireds = function(form){
		if(form){
			var fields = form.querySelectorAll('.required');
			if(fields){
				return fields;
			}
		}
		return null;
	};

	/**
	 * applies validation rules on fields and return if this rule is valid for all fields
	 *
	 * @method applyValidationRequired
	 * @param {NodeList} list of forms
	 * @return {Boolean} if is valid returns true, otherwise returns false
	 */
	var applyValidationRequired = function(form){
		if(form){

			var fields = getFieldsRequireds(form),
				ret = true;;
	
			if(fields){ 

				var i,
					total = fields.length,
					checkboxRadios = {};

				for(i = 0; i < total; i++){

					if(fields[i].type !== 'checkbox' && fields[i].type !== 'radio'){
						// fildes text, email, tel, textarea, select, inputfile

						if(fields[i].value === ""){
							// is inválid

							addValidationView(fields[i]);
							ret = false;

						}else{
							// is valid

							removeValidationView(fields[i]);
						}

					}else{
						// checkbox and radio fields

						// add checkbox and radio fields into array to validate after
						if(! checkboxRadios[fields[i].name]){
							checkboxRadios[fields[i].name] = [];

							// item responsible for validating the field
							checkboxRadios[fields[i].name].push("invalid");
						}
						checkboxRadios[fields[i].name].push(fields[i]);

					}

				}

				// validate checkbox and radio fields
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
							// is invalid
							addValidationView(checkboxRadios[cr]);
							ret = false;
						}else{
							// is valid
							removeValidationView(checkboxRadios[cr]);
						}
					}
				}

				
			}
			
		}
		return ret;
	};

	/**
	 * applies view feedback of validation
	 *
	 * @method addValidationView
	 * @param {NodeList || Array} list of elements or array with checkbox and radio fileds 
	 */
	var addValidationView = function(element){
		if(element){

			var parentEl = (element.constructor.name === "Array") ? element[element.length-1].parentElement : element.parentElement;

			if(parentEl){
				var messageContainer = document.createElement("SPAN");
				messageContainer.innerHTML = "Mensagem de erro aqui";

				var messageClass = document.createAttribute("class");
				messageClass.value = "msg-error";
				messageContainer.setAttributeNode(messageClass);

				
				if(element.constructor.name === "Array"){
					var i, totalEl = element.length;

					for(i = 1; i < totalEl; i++){
						element[i].classList.add("error");
					}
				}else{
					element.classList.add("error");
				}
				

				var oldMessages = parentEl.querySelectorAll('.msg-error');

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

	/**
	 * remove the feedback views of validation
	 *
	 * @method removeValidationView
	 * @param {NodeList || Array} list of elements or array with checkbox and radio fileds 
	 */
	var removeValidationView = function(element){
		if(element){

			var parentEl = (element.constructor.name === "Array") ? element[element.length-1].parentElement : element.parentElement;

			if(parentEl){

				if(element.constructor.name === "Array"){
					var i, totalEl = element.length;

					for(i = 1; i < totalEl; i++){
						element[i].classList.remove("error");
					}
				}else{
					element.classList.remove("error");
				}

				var oldMessages = parentEl.querySelectorAll('.msg-error');

				if(oldMessages){
					var x, totalOld = oldMessages.length;
					for(x = 0; x < totalOld; x++){
						oldMessages[x].remove();
					}
				}

			}
		
		}
	}

	/**
	 * Form validator class with pure Javascript

	 * @class VanillaValidator
	 * @constructor
	 * @param {String} query selector
	 */
	function VanillaValidator(query){
		querySelector = query;
		forms = getForms();

		setHTML5NoValidate(forms);

		addEventToForms();
	}

	return VanillaValidator;

}());

var valid = new VanillaValidator("form");