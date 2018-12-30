var VVElements = (function(){

	/**
	 * Get elements by query selector
	 * @param { String } qyery The query selector
	 * @returns { NodeList || null }
	 */
	VVElements.prototype.getElements = function(query){
		if(query){
			var nodes = document.querySelectorAll(query);
			return (nodes.length) ? nodes : null;
		}
		return null;
	};

	/**
	 * Get element by query selector
	 * @param { String } query The query selector
	 * @returns { HTMLElement || null }
	 */
	VVElements.prototype.getElement = function(query){
		if(query){ 
			var node = document.querySelector(query);
			return (node) ? node : null;
		}
		return null;
	};

	/**
	 * Get element child of given parent by query selector
	 * @param { String } qyery The query selector
	 * @param { HTMLElement } parent The parent
	 * @returns { HTMLElement || null }
	 */
	VVElements.prototype.getChild = function(query, parent){
		if(query && parent && (parent instanceof Element || parent instanceof HTMLDocument) ){
			var node = parent.querySelector(query);
			return (node) ? node : null;
		}
		return null;
	};

	/**
	 * Get elements children of given parent by query selector
	 * @param { String } qyery The query selector
	 * @param { HTMLElement } parent The parent
	 * @returns { NodeList || null }
	 */
	VVElements.prototype.getChildren = function(query, parent){
		if(query && parent && (parent instanceof Element || parent instanceof HTMLDocument) ){
			var nodes = parent.querySelectorAll(query);
			return (nodes.length) ? nodes : null;
		}
		return null;
	};

	/**
	 * Get submit button of given parent
	 * @param { HTMLElement } parent The parent
	 * @returns { HTMLElement || null }
	 */
	VVElements.prototype.getButtonSubmit = function(parent){
		return (this.getChild('button', parent)) ? this.getChild('button', parent) : this.getChild('input[type="submit"]', parent);
	};

	/**
	 * Get radio buttons by name of given parent; (can get it by class and checked attribute also)
	 * @param { String } name The name of input
	 * @param { HTMLElement } parent The parent
	 * @param { String } cls The class attribute
	 * @param { Boolean } isChecked If is checked
	 * @returns { HTMLElement || null }
	 */
	VVElements.prototype.getRadiosByName = function(name, parent, cls, isChecked){
		if(name && parent){
			var s_cls = (cls) ? '.' + cls : '';
			var s_checked = (isChecked) ? ':checked' : '';
			return this.getChildren('input'+ s_cls + '[type=radio][name="'+ name +'"]' + s_checked, parent);
		}
		return null;
	};

	/**
	 * Get checkbox buttons by name of given parent; (can get it by class and checked attribute also)
	 * @param { String } name The name of input
	 * @param { HTMLElement } parent The parent
	 * @param { String } cls The class attribute
	 * @param { Boolean } isChecked If is checked
	 * @returns { HTMLElement || null }
	 */
	VVElements.prototype.getCheckboxesByName = function(name, parent, cls, isChecked){
		if(name && parent){
			var s_cls = (cls) ? '.' + cls : '';
			var s_checked = (isChecked) ? ':checked' : '';
			return this.getChildren('input'+ s_cls +'[type=checkbox][name="'+ name +'"]' + s_checked, parent);
		}
		return null;
	};

	/**
	 * Adds a given class in element
	 * @param { HTMLElement } element The element that will receive the class
	 * @param { String } cls The class attribute
	 */
	VVElements.prototype.addClass = function(element, cls){
		if(element && cls){
			if(Object.prototype.toString.call(cls) === '[object Array]'){
				var i, total = cls.length;
				for(i = 0; i < total; i++){
					element.classList.add(cls[i]);
				}
			}else{
				element.classList.add(cls);
			}
		}
	};

	/**
	 * Removes a given class in element
	 * @param { HTMLElement } element The element that class will be removed
	 * @param { String } cls The class attribute
	 */
	VVElements.prototype.removeClass = function(element, cls){
		if(element && cls){
			if(Object.prototype.toString.call(cls) === '[object Array]'){
				var i, total = cls.length;
				for(i = 0; i < total; i++){
					element.classList.remove(cls[i]);
				}
			}else{
				element.classList.remove(cls);
			}
		}
	};

	/**
	 * Adds innerHTML content
	 * @param { HTMLElement } element The element that will be receive the content
	 * @param { HTMLElement || String } content The content
	 */
	VVElements.prototype.inner = function(element, content){
		if(element){
			if(content !== undefined){
				element.innerHTML = content;
			}else{
				element.innerHTML = '';
			}
		}
	};

	/**
	 * The constructor
	 * @constructor
	 */
    function VVElements(){}

	return VVElements;
})();