const toCurrency = function(value, unit = 'AUD', dir='right'){
    if(dir === 'right') return value + ' ' + unit
    else return unit + ' ' +value;
}

const validateQuantity = function(quantity) {
    let num = parseInt(quantity);
    if(num == quantity && !isNaN(num)) {
        return num >= 1; 
    }
    return false;
}

export {
    toCurrency,validateQuantity
    
}