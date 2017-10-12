import isArray from 'isarray'
import isObject from 'isobject';
import mapValues from 'map-obj'

const deepMapValues = function(object, callback, propertyPath){
    propertyPath = propertyPath || '';
    if(isArray(object)){
      return object.map(deepMapValuesIteratee);
    }
    else if(isObject(object) && !(object instanceof File)){
      return {...object, ...mapValues(object, deepMapValuesIteratee)}
    }
    else{
        return callback(object, propertyPath);
    }

    function deepMapValuesIteratee(key, value){
        var valuePath = propertyPath ? propertyPath + '.' + key: key;
        return [key, deepMapValues(value, callback, valuePath)];
    }
  }

export default deepMapValues
