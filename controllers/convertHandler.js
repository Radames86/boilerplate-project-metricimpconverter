function ConvertHandler() {

  const validUnits = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
  
  this.getNum = function(input) {
    let result;
    const match = input.match(/^[^a-zA-Z]*/);
    const numString = match ? match[0] : '';

    if (numString === '' || numString.trim() === ''){
      result = 1;
      return result;
      }
      const slashCount = (numString.match(/\//g) || []).length;
      if(slashCount > 1){
        return 'invalid number';
      }
      if (slashCount === 1){
        const parts = numString.split('/');
        const numerator = parseFloat(parts[0]);
        const denominator = parseFloat(parts[1]);
        if (isNaN(numerator) || isNaN(denominator)){
          return 'invalid number';
        }
        result = numerator / denominator;
        return result;
      }
      result = parseFloat(numString);
      if (isNaN(result)){
        return 'invalid number';
      }
    
    return result;
  };
  
  this.getUnit = function(input) {
    let result;
    const match = input.match(/[a-zA-Z]+$/);
    if (!match){
      return 'invalid unit';
    }
    let unit = match[0].toLowerCase();
    if (!validUnits.includes(unit)){
      return 'invalid unit';
    }
    if (unit === 'l'){
      result = 'L';
    } else {
      result = unit;
    }
    
    return result;
  };
  
  this.getReturnUnit = function(initUnit) {
    let result;
    switch (initUnit.toLowerCase()){
      case 'gal':
        result = 'L';
        break;
      case 'l':
        result = 'gal';
        break;
      case 'mi':
        result = 'km';
        break;
      case 'km':
        result = 'mi';
        break;
      case 'lbs':
        result = 'kg';
        break;
      case 'kg':
        result = 'lbs';
        break;
      default:
        result = 'invalid unit';
    }
    
    return result;
  };

  this.spellOutUnit = function(unit) {
    let result;
    switch (unit.toLowerCase()){
      case 'gal':
        result = 'gallons';
        break;
      case 'l':
        result = 'liters';
        break;
      case 'mi':
        result = 'miles';
        break;
      case 'km':
        result = 'kilometers';
        break;
      case 'lbs':
        result = 'pounds';
        break;
      case 'kg':
        result = 'kilograms';
        break;
      default:
        result = '';
    }
    
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;

    switch (initUnit.toLowerCase()){
      case 'gal':
        result = initNum * galToL;
        break;
      case 'l':
        result = initNum / galToL;
        break;
      case 'lbs':
        result = initNum * lbsToKg;
        break;
      case 'kg':
        result = initNum / lbsToKg;
        break;
      case 'mi':
        result = initNum * miToKm;
        break;
      case 'km':
        result = initNum / miToKm;
        break;
      default:
        return 'invalid unit';
    }
    
    return Number(result.toFixed(5));
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result;
    result = initNum + ' ' + this.spellOutUnit(initUnit) + ' converts to ' + returnNum + ' ' + this.spellOutUnit(returnUnit);
    return result;
  };
  
}

module.exports = ConvertHandler;
