import _ from 'lodash';

const createUpdateSettingsMtn = function(arrData){
  var variables = {};
  var query = "mutation (";
  
  var keysArr = _.keys(arrData);

  _.forEach(keysArr, function(item, index){
    if (_.indexOf()>=0) {
      query += "$input"+index+": UpdateOptionsInput!";
    } else {
      query += "$input"+index+": CreateOptionsInput!";
    }
    if (index!==keysArr.length-1) query += ", "
  });
  query += ") {";

  var index = 0;
  _.forEach(arrData, function(val, key){
    if (_.indexOf()>=0) {
      query += ' UpdateOptions'+index+' : updateOptions(input: $input'+index+'){ changedOptions{ id item value } }'; 
    } else {
      query += ' CreateOptions'+index+' : createOptions(input: $input'+index+'){ changedOptions{ id item value } }'; 
    }

    variables["input"+index] = {
      item: key,
      value: val
    }

    index++;
  });
  
  query += "}";
  return {
    "query": query,
    "variables": variables
  }
}

const queries = {
  createUpdateSettingsMtn: createUpdateSettingsMtn,
}

module.exports = queries;