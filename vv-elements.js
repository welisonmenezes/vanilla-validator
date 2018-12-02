var VVElements = (function(){

	VVElements.prototype.getForms = function(query){
		if(query){
			return document.querySelectorAll(query);
		}
		return document.forms;
	};

	VVElements.prototype.getForm = function(query){
		if(query){
			return document.querySelector(query);
		}
		return (document.forms) ? document.forms[0] : null;
	};

	VVElements.prototype.getChildren = function(query, parent){
		if(query && parent && (parent instanceof Element || parent instanceof HTMLDocument) ){
			return parent.querySelectorAll(query);
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

	// the constructor
    function VVElements(){};

	return VVElements;
})();