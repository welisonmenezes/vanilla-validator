var VVchecks = (function(){

	VVchecks.prototype.isEmpty = function(value){
		return value === "" || value.length < 1;
	};

	VVchecks.prototype.isEmail = function(value){
		var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
		return pattern.test(value);
	};

	VVchecks.prototype.isInteger = function(value){
        return /^[0-9]+$/.test(value);
    };

    VVchecks.prototype.isDigit = function(value){
        return /^[a-zA-Z0-9]+$/.test(value);
    };

    VVchecks.prototype.isUrl = function(value){
        var pattern = new RegExp(/^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i);
        return pattern.test(value);
    };

    VVchecks.prototype.hasLessThan = function(value, size){
        return (value.length < size);
    };

    VVchecks.prototype.hasMoreThan = function(value, size){
        return (value.length > size);
    };

    VVchecks.prototype.hasRangeLength = function(value, min, max){
        return ( (value.length <= max) && (value.length >= min) );
    };

    VVchecks.prototype.hasEqualLength = function(value, size){
        return ( value.length == size );
    };

    VVchecks.prototype.isMin = function(value, min){
        return (value < min);
    };

    VVchecks.prototype.isMax = function(value, max){
        return (value > max);
    };

    VVchecks.prototype.isRange = function(value, min, max){
        return ( (value <= max) && (value >= min) );
    };

    VVchecks.prototype.equalTo = function(value, param){
        return value === param;
    };

    VVchecks.prototype.isCpf = function(value){
	    var CPF = value, cpfv, x;  

	    if(!CPF) return false;

	    cpfv  = CPF;
	    if(cpfv.length == 14 || cpfv.length == 11) {
	        cpfv = cpfv.replace('.', '');
	        cpfv = cpfv.replace('.', '');
	        cpfv = cpfv.replace('-', '');

	        var nonNumbers = /\D/;
	        
	        if(nonNumbers.test(cpfv)){
	            return false;
	        } else{
	            if (cpfv == "00000000000" ||
	                cpfv == "11111111111" ||
	                cpfv == "22222222222" ||
	                cpfv == "33333333333" ||
	                cpfv == "44444444444" ||
	                cpfv == "55555555555" ||
	                cpfv == "66666666666" ||
	                cpfv == "77777777777" ||
	                cpfv == "88888888888" ||
	                cpfv == "99999999999") return false;

	            var a = [];
	            var b = 0;
	            var c = 11;
	            for(var i=0; i<11; i++){
	                a[i] = cpfv.charAt(i);
	                if (i < 9) b += (a[i] * --c);
	            }

	            if((x = b % 11) < 2){
	                a[9] = 0;
	            } else{
	                a[9] = 11-x;
	            }

	            b = 0;
	            c = 11;
	            for (var y=0; y<10; y++) b += (a[y] * c--);

	            if((x = b % 11) < 2){
	                a[10] = 0;
	            } else{
	                a[10] = 11-x;
	            }

	            if((cpfv.charAt(9) != a[9]) || (cpfv.charAt(10) != a[10])) return false;
	        }
	    } else{
	        if(cpfv.length === 0){
	            return false;
	        
	        } else{
	            return false;
	        }
	    }

	    return true;
	};

	VVchecks.prototype.isObject = function(object){
		return (object != false && typeof object === 'object' && object instanceof Object && (typeof object !== 'function'));
	};

	VVchecks.prototype.isDate = function(value){
        var check = false,
        re = /^\d{1,2}\/\d{1,2}\/\d{4}$/,
        adata, gg, mm, aaaa, xdata;
        if ( re.test(value)) 
        {
            adata = value.split("/");
            gg = parseInt(adata[0], 10);
            mm = parseInt(adata[1], 10);
            aaaa = parseInt(adata[2], 10);
            xdata = new Date(aaaa, mm - 1, gg, 12, 0, 0, 0);
            if ( ( xdata.getUTCFullYear() === aaaa ) && ( xdata.getUTCMonth () === mm - 1 ) && ( xdata.getUTCDate() === gg ) ) 
            {
                check = true;
            } 
            else 
            {
                check = false;
            }
        } 
        else 
        {
            check = false;
        }
        return check;
    };


    // the constructor
    function VVchecks(){
		// force call with new operator
		if (!(this instanceof VVchecks)) { 
			throw new TypeError("Cannot call a class as a function");
		}
	};

	return VVchecks;
}());

var VanillaValidator = (function(){

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
	// makes VanillaValidator inherit from VVchecks
	_inherits(VanillaValidator, VVchecks);


	// the constructor
	function VanillaValidator(query, config){

		// force call with new operator
		if (!(this instanceof VanillaValidator)) { 
			throw new TypeError("Cannot call a class as a function");
		}

		// Propagates only the attributes.
		VVchecks.apply(this, arguments);
	};

	return VanillaValidator;
}());



var vv = new VanillaValidator();

console.log('Está vazio? ', vv.isEmpty(''));
console.log('É um email? ', vv.isEmail('email@email.com'));
console.log('É um objeto? ', vv.isObject({}));
console.log('É um inteiro? ', vv.isInteger(10000));
console.log('É um digito? ', vv.isDigit('a165'));
console.log('É uma url? ', vv.isUrl('https://www.google.com'));
console.log('Tem menos que 5? ', vv.hasLessThan('weli', 5));
console.log('Tem mais que 5? ', vv.hasMoreThan('welison', 5));
console.log('Está entre 5 e 7? ', vv.hasRangeLength('welison', 5, 7));
console.log('Tem exatamente 7? ', vv.hasEqualLength('welison', 7));
console.log('É uma data? ', vv.isDate('12/12/2006'));
console.log('É menor que 5? ', vv.isMin(4, 5));
console.log('É maior que 5? ', vv.isMax(6, 5));
console.log('Está entre 3 e 5? ', vv.isRange(4, 3, 5));
console.log('É igual a 5? ', vv.equalTo(5, 5));
console.log('É um cpf? ', vv.isCpf('061.052.500-02'));

