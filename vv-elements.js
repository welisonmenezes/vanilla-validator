var VVElements = (function(){

	VVElements.prototype.getElements = function(query){
		if(query){
			return document.querySelectorAll(query);
		}
		return null;
	};

	VVElements.prototype.getElement = function(query){
		if(query){
			return document.querySelector(query);
		}
		return null;
	};

	VVElements.prototype.getChild = function(query, parent){
		if(query && parent && (parent instanceof Element || parent instanceof HTMLDocument) ){
			return parent.querySelector(query);
		}
		return null;
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

	VVElements.prototype.inner = function(element, content){
		if(element){
			if(content !== undefined){
				element.innerHTML = content;
			}else{
				element.innerHTML = '';
			}
		}
	}

	// the constructor
    function VVElements(){};

	return VVElements;
})();