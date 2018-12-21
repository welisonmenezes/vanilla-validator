var VVElements = (function(){

	VVElements.prototype.getElements = function(query){
		if(query){
			var nodes = document.querySelectorAll(query);
			return (nodes.length) ? nodes : null;
		}
		return null;
	};

	VVElements.prototype.getElement = function(query){
		if(query){
			var node = document.querySelector(query);
			return (node) ? node : null;
		}
		return null;
	};

	VVElements.prototype.getChild = function(query, parent){
		if(query && parent && (parent instanceof Element || parent instanceof HTMLDocument) ){
			var node = parent.querySelector(query);
			return (node) ? node : null;
		}
		return null;
	};

	VVElements.prototype.getChildren = function(query, parent){
		if(query && parent && (parent instanceof Element || parent instanceof HTMLDocument) ){
			var nodes = parent.querySelectorAll(query);
			return (nodes.length) ? nodes : null;
		}
		return null;
	};

	VVElements.prototype.getButtonSubmit = function(parent){
		return (this.getChild('button', parent)) ? this.getChild('button', parent) : this.getChild('input[type="submit"]', parent);
	};

	VVElements.prototype.getRadiosByName = function(name, parent, cls, isChecked){
		if(name && parent){
			s_cls = (cls) ? '.' + cls : '';
			s_checked = (isChecked) ? ':checked' : '';
			return this.getChildren('input'+ s_cls +'[type=radio][name="'+ name +'"]' + s_checked, parent);
		}
		return null;
	};

	VVElements.prototype.getCheckboxesByName = function(name, parent, cls, isChecked){
		if(name && parent){
			s_cls = (cls) ? '.' + cls : '';
			s_checked = (isChecked) ? ':checked' : '';
			return this.getChildren('input'+ s_cls +'[type=checkbox][name="'+ name +'"]' + s_checked, parent);
		}
		return null;
	};

	VVElements.prototype.addClass = function(element, cls){
		if(element && cls){
			if(Object.prototype.toString.call(cls) === "[object Array]"){
				var i, total = cls.length;
				for(i = 0; i < total; i++){
					element.classList.add(cls[i]);
				}
			}else{
				element.classList.add(cls);
			}
		}
	};

	VVElements.prototype.removeClass = function(element, cls){
		if(element && cls){
			if(Object.prototype.toString.call(cls) === "[object Array]"){
				var i, total = cls.length;
				for(i = 0; i < total; i++){
					element.classList.remove(cls[i]);
				}
			}else{
				element.classList.remove(cls);
			}
		}
	};

	VVElements.prototype.inner = function(element, content){
		if(element){
			if(content !== undefined){
				element.innerHTML = content;
			}else{
				element.innerHTML = '';
			}
		}
	};

	// the constructor
    function VVElements(){};

	return VVElements;
})();