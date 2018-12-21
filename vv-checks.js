var VVChecks = (function(){

	VVChecks.prototype.isEmpty = function(value){

		return value === "" || value.length < 1;
	};

	VVChecks.prototype.isEmail = function(value){

		var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
		
        return pattern.test(value);
	};

	VVChecks.prototype.isInteger = function(value){

        return /^[0-9]+$/.test(value);
    };

    VVChecks.prototype.isDigit = function(value){

        return /^[a-zA-Z0-9]+$/.test(value);
    };

    VVChecks.prototype.isUrl = function(value){

        var pattern = new RegExp(/^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i);
       
        return pattern.test(value);
    };

    VVChecks.prototype.hasLessThan = function(value, size){

        return (value.length < size);
    };

    VVChecks.prototype.hasMoreThan = function(value, size){

        return (value.length > size);
    };

    VVChecks.prototype.hasRangeLength = function(value, min, max){

        return ( (value.length <= max) && (value.length >= min) );
    };

    VVChecks.prototype.hasEqualLength = function(value, size){

        return ( value.length == size );
    };

    VVChecks.prototype.isMin = function(value, min){

        return (value < min);
    };

    VVChecks.prototype.isMax = function(value, max){

        return (value > max);
    };

    VVChecks.prototype.isRange = function(value, min, max){

        return ( (value <= max) && (value >= min) );
    };

    VVChecks.prototype.equalTo = function(value, param){

        return value === param;
    };

    VVChecks.prototype.isCpf = function(value){

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

	VVChecks.prototype.isCnpj = function(value){

        var str = value, 
            numeros, digitos, soma, i, resultado, pos, tamanho, 
            digitos_iguais, cnpj;

        str  = str.replace('.','');
        str  = str.replace('.','');
        str  = str.replace('.','');
        str  = str.replace('-','');
        str  = str.replace('/','');
        cnpj = str;
        
        digitos_iguais = 1;
        if (cnpj.length < 14 && cnpj.length < 15) return false;

        for (i = 0; i < cnpj.length - 1; i++) {

            if (cnpj.charAt(i) != cnpj.charAt(i + 1)){

                digitos_iguais = 0;
                break;
            }
        }

        if (!digitos_iguais) {

            tamanho = cnpj.length - 2
            numeros = cnpj.substring(0,tamanho);
            digitos = cnpj.substring(tamanho);
            soma = 0;
            pos = tamanho - 7;

            for (i = tamanho; i >= 1; i--) {

                soma += numeros.charAt(tamanho - i) * pos--;
                if (pos < 2) pos = 9;
            }

            resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;

            if (resultado != digitos.charAt(0)) return false;

            tamanho = tamanho + 1;
            numeros = cnpj.substring(0,tamanho);
            soma = 0;
            pos = tamanho - 7;

            for (i = tamanho; i >= 1; i--) {

                soma += numeros.charAt(tamanho - i) * pos--;
                if (pos < 2) pos = 9;
            }

            resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
            if (resultado != digitos.charAt(1))  return false;

            return true;
        }

        return false;
    };

	VVChecks.prototype.isCnh = function(value) {
		var cnh = value;
		var char1 = cnh.charAt(0);

		if (cnh.replace(/[^\d]/g, '').length !== 11 || char1.repeat(11) === cnh) return false;

		for (var i = 0, j = 9, v = 0; i < 9; ++i, --j) {

			v += +(cnh.charAt(i) * j);
		}

		var dsc = 0,
		vl1 = v % 11;

		if (vl1 >= 10) {

			vl1 = 0;
			dsc = 2;
		}

		for (i = 0, j = 1, v = 0; i < 9; ++i, ++j) {

			v += +(cnh.charAt(i) * j);
		}

		var x = v % 11;
		var vl2 = (x >= 10) ? 0 : x - dsc;

		return ('' + vl1 + vl2) === cnh.substr(-2);
	};

	VVChecks.prototype.isCreditCard = function(value){

        if ( /[^0-9 \-]+/.test( value ) )  return false;
   
        var nCheck = 0,
            nDigit = 0,
            bEven = false,
            n, cDigit;

        var cardNum = value.replace( /\D/g, "" );

        if ( cardNum.length < 13 || cardNum.length > 19 )  return false;

        for ( n = cardNum.length - 1; n >= 0; n--) {

            cDigit = cardNum.charAt( n );
            nDigit = parseInt( cDigit, 10 );

            if ( bEven ) {

                if ( ( nDigit *= 2 ) > 9 )  nDigit -= 9;
            }

            nCheck += nDigit;
            bEven = !bEven;
        }

        return ( nCheck % 10 ) === 0;
    };

	VVChecks.prototype.isCep = function(value){

        return /^\d{2}.\d{3}-\d{3}?$|^\d{5}-?\d{3}?$/.test(value);
    };

    VVChecks.prototype.isPhone = function(value){

        var phoneNum = value.replace(/[\(\)\-_ \+]/g,'');
       
        return /^([0-9]{8,14})$/.test(phoneNum);
    };

	VVChecks.prototype.isDate = function(value){

        var check = false,
        re = /^\d{1,2}\/\d{1,2}\/\d{4}$/,
        adata, gg, mm, aaaa, xdata;
        if ( re.test(value)) {

            adata = value.split("/");
            gg = parseInt(adata[0], 10);
            mm = parseInt(adata[1], 10);
            aaaa = parseInt(adata[2], 10);
            xdata = new Date(aaaa, mm - 1, gg, 12, 0, 0, 0);
            if ( ( xdata.getUTCFullYear() === aaaa ) && ( xdata.getUTCMonth () === mm - 1 ) && ( xdata.getUTCDate() === gg ) ){
                
                check = true;
            }else{

                check = false;
            }
        }else{

            check = false;
        }

        return check;
    };

    VVChecks.prototype.hasExtension = function(value, extensions){

        return (new RegExp('(' + extensions.join('|').replace(/\./g, '\\.') + ')$')).test(value);
    };

    VVChecks.prototype.isCurrency = function(value){

        return /^(R\$ )?(\d{1,3}.)?(\d{1,3}.)?(\d{1,3}.)?\d{1,3},\d{2}$/.test(value);
    };

    VVChecks.prototype.isNumeric = function(value){

        return !isNaN(value);
    };

    VVChecks.prototype.isObject = function(object){

		return (object != false && typeof object === 'object' && object instanceof Object && (typeof object !== 'function'));
	};

	VVChecks.prototype.isFunction = function(fn){

	    return Object.prototype.toString.call(fn) == '[object Function]';
	};

	VVChecks.prototype.isArray = function(array){

		return Object.prototype.toString.call(array) === "[object Array]";
	};

    VVChecks.prototype.isHTMLElement = function(element){

        return element instanceof Element || element instanceof HTMLDocument;
    };

    VVChecks.prototype.isPattern = function(value, pattern, flags){
        return new RegExp(pattern, flags).test(value);
    };

    // the constructor
    function VVChecks(){

		// force call with new operator
		if (!(this instanceof VVChecks)) { 

			throw new TypeError("Cannot call a class as a function");
		}
	};

	return VVChecks;
})();