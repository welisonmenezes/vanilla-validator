var VVChecks = (function(){

	VVChecks.prototype.isNotEmpty = function(value){
		return !(value === '' || value.length < 1);
	};

	VVChecks.prototype.isEmail = function(value){
		var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
        return (pattern.test(value)) || (! this.isNotEmpty(value));
	};

	VVChecks.prototype.isInteger = function(value){
        return (/^[0-9]+$/.test(value)) || (! this.isNotEmpty(value));
    };

    VVChecks.prototype.isDigit = function(value){
        return (/^[a-zA-Z0-9]+$/.test(value)) || (! this.isNotEmpty(value));
    };

    VVChecks.prototype.isUrl = function(value){
        var pattern = new RegExp(/^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i);
        return (pattern.test(value)) || (! this.isNotEmpty(value));
	};

    VVChecks.prototype.maxLength = function(value, size){
        return (value.length <= size) || (! this.isNotEmpty(value));
    };

    VVChecks.prototype.minLength = function(value, size){
        return (value.length >= size) || (! this.isNotEmpty(value));
    };

    VVChecks.prototype.rangeLength = function(value, range){
        return ( (value.length <= range[1]) && (value.length >= range[0]) ) || (! this.isNotEmpty(value));
    };

    VVChecks.prototype.sameLength = function(value, size){
        return (value.length == size) || (! this.isNotEmpty(value));
    };

    VVChecks.prototype.isMin = function(value, min){
        return (value >= min) || (! this.isNotEmpty(value));
    };

    VVChecks.prototype.isMax = function(value, max){
        return (value <= max) || (! this.isNotEmpty(value));
    };

    VVChecks.prototype.isRange = function(value, range){
        return ( (value <= range[1]) && (value >= range[0]) ) || (! this.isNotEmpty(value));
    };

    VVChecks.prototype.equalTo = function(value, param){
        return (value.toString() === param.toString()) || (! this.isNotEmpty(value));
    };

    VVChecks.prototype.isCpf = function(value){
        var numeros, digitos, soma, i, resultado, digitos_iguais;
        digitos_iguais = 1;
        value = value.replace('.', '');
        value = value.replace('.', '');
        value = value.replace('-', '');
        if (value.length != 11) return false || (! this.isNotEmpty(value));
        for (i = 0; i < value.length - 1; i++)
            if (value.charAt(i) != value.charAt(i + 1)){
                digitos_iguais = 0;
                break;
            }
        if (!digitos_iguais){
            numeros = value.substring(0,9);
            digitos = value.substring(9);
            soma = 0;
            for (i = 10; i > 1; i--) soma += numeros.charAt(10 - i) * i;
            resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
            if (resultado != digitos.charAt(0)) return false || (! this.isNotEmpty(value));
            numeros = value.substring(0,10);
            soma = 0;
            for (i = 11; i > 1; i--)  soma += numeros.charAt(11 - i) * i;
            resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
            if (resultado != digitos.charAt(1)) return false || (! this.isNotEmpty(value));
            return true || (! this.isNotEmpty(value));
        }else return false || (! this.isNotEmpty(value));
    };

	VVChecks.prototype.isCnpj = function(value){
        var str = value, numeros, digitos, soma, i, resultado, pos, tamanho, digitos_iguais, cnpj;
        str = str.replace('.','');
        str = str.replace('.','');
        str = str.replace('.','');
        str = str.replace('-','');
        str = str.replace('/','');
        cnpj = str;
        digitos_iguais = 1;
        if (cnpj.length < 14 && cnpj.length < 15)
            return false || (! this.isNotEmpty(value));
        for (i = 0; i < cnpj.length - 1; i++) {
            if (cnpj.charAt(i) != cnpj.charAt(i + 1)){
                digitos_iguais = 0;
                break;
            }
        }
        if (!digitos_iguais) {
            tamanho = cnpj.length - 2;
            numeros = cnpj.substring(0,tamanho);
            digitos = cnpj.substring(tamanho);
            soma = 0;
            pos = tamanho - 7;
            for (i = tamanho; i >= 1; i--) {
                soma += numeros.charAt(tamanho - i) * pos--;
                if (pos < 2) pos = 9;
            }
            resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
            if (resultado != digitos.charAt(0)) 
                return false || (! this.isNotEmpty(value));
            tamanho = tamanho + 1;
            numeros = cnpj.substring(0,tamanho);
            soma = 0;
            pos = tamanho - 7;
            for (i = tamanho; i >= 1; i--) {
                soma += numeros.charAt(tamanho - i) * pos--;
                if (pos < 2) pos = 9;
            }
            resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
            if (resultado != digitos.charAt(1))
                return false || (! this.isNotEmpty(value));
            return true || (! this.isNotEmpty(value));
        }
        return false || (! this.isNotEmpty(value));
    };

	VVChecks.prototype.isCnh = function(value) {
		var cnh = value;
		var char1 = cnh.charAt(0);
        if (cnh.replace(/[^\d]/g, '').length !== 11 || char1.repeat(11) === cnh) 
            return false || (! this.isNotEmpty(value));
        var i, j, v;
        for (i = 0, j = 9, v = 0; i < 9; ++i, --j) {
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
		return (('' + vl1 + vl2) === cnh.substr(-2)) || (! this.isNotEmpty(value));
	};

	VVChecks.prototype.isCreditCard = function(value){
        if ( /[^0-9 -]+/.test( value ) )  
            return false || (! this.isNotEmpty(value));
        var nCheck = 0, nDigit = 0, bEven = false, n, cDigit;
        var cardNum = value.replace( /\D/g, '' );
        if ( cardNum.length < 13 || cardNum.length > 19 )
            return false || (! this.isNotEmpty(value));
        for ( n = cardNum.length - 1; n >= 0; n--) {
            cDigit = cardNum.charAt( n );
            nDigit = parseInt( cDigit, 10 );
            if ( bEven ) {
                if ( ( nDigit *= 2 ) > 9 )  nDigit -= 9;
            }
            nCheck += nDigit;
            bEven = !bEven;
        }
        return (( nCheck % 10 ) === 0) || (! this.isNotEmpty(value));
    };

	VVChecks.prototype.isCep = function(value){
        return (/^\d{2}.\d{3}-\d{3}?$|^\d{5}-?\d{3}?$/.test(value)) || (! this.isNotEmpty(value));
    };

    VVChecks.prototype.isPhone = function(value){
        var phoneNum = value.replace(/[()\-_ +]/g,'');
        return (/^([0-9]{8,14})$/.test(phoneNum)) || (! this.isNotEmpty(value));
    };

	VVChecks.prototype.isDate = function(value){
        var check = false,
        re = /^\d{1,2}\/\d{1,2}\/\d{4}$/,
        adata, gg, mm, aaaa, xdata;
        if ( re.test(value)) {
            adata = value.split('/');
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
        return check || (! this.isNotEmpty(value));
    };

    VVChecks.prototype.hasExtension = function(value, extensions){
        return ( (new RegExp('(' + extensions.join('|').replace(/\./g, '\\.') + ')$')).test(value) ) || (! this.isNotEmpty(value));
    };

    VVChecks.prototype.isCurrency = function(value){
        return (/^(R\$ )?(\d{1,3}.)?(\d{1,3}.)?(\d{1,3}.)?\d{1,3},\d{2}$/.test(value)) || (! this.isNotEmpty(value));
    };

    VVChecks.prototype.isNumeric = function(value){
        return (!isNaN(value)) || (! this.isNotEmpty(value));
    };

    VVChecks.prototype.isPattern = function(value, pattern, flags){
        return (new RegExp(pattern, flags).test(value)) || (! this.isNotEmpty(value));
    };

    VVChecks.prototype.isObject = function(object){
		return (object != false && typeof object === 'object' && object instanceof Object && (typeof object !== 'function'));
	};

	VVChecks.prototype.isFunction = function(fn){
        return Object.prototype.toString.call(fn) == '[object Function]';
	};

	VVChecks.prototype.isArray = function(array){
		return Object.prototype.toString.call(array) === '[object Array]';
	};

    VVChecks.prototype.isHTMLElement = function(element){
        return element instanceof Element || element instanceof HTMLDocument;
    };

    VVChecks.prototype.isHTMLForm = function(element){
        return (this.isHTMLElement(element) && element.tagName && element.tagName === 'FORM');
    };

    // the constructor
    function VVChecks(){
		// force call with new operator
		if (!(this instanceof VVChecks)) { 
			throw new TypeError('Cannot call a class as a function');
		}
	}

	return VVChecks;
})();