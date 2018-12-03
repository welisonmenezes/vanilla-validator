var VVUtils = (function(){

	var isObject = function(object){
		return (object && typeof object === 'object' && object instanceof Object && (typeof object !== 'function'));
	};

	var target = {};

	VVUtils.prototype.mergeObjectsDeeply = function(target, objectDefault, objectUser){

		if(isObject(objectDefault) && isObject(objectUser) && isObject(target)){

			for(t in objectDefault){

				if(isObject(objectDefault[t]) && isObject(objectDefault[t])){

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
	};

	// the constructor
    function VVUtils(){};

	return VVUtils;
})();