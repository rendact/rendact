import _ from 'lodash';

const loadSettingsQry = {
  query: `query getOptions{
        viewer {
        allOptions {
          edges {
            node {
              id,
              item,
              value
            }
          }
        }
      }
    }`
}

const getPermissionConfigQry = {
  query: `query getOptions{
  viewer{
    allOptions(where: {item:{eq: "permissionConfig"} }){
      edges{
        node{
          value
        }
      }
    }
  }
  }`
}

const createUpdateSettingsMtn = function(arrData){
  var variables = {};
  var query = "mutation (";
  
  _.forEach(arrData, function(item, index){
    if (_.has(item, "id")) {
      query += "$input"+index+": UpdateOptionsInput!";
    } else {
      query += "$input"+index+": CreateOptionsInput!";
    }
    if (index!==arrData.length-1) query += ", "
  });
  query += ") {";

  _.forEach(arrData, function(item, index){
    variables["input"+index] = {
      item: item.item,
      value: item.value
    }

    if (_.has(item, "id")) {
      variables["input"+index]['id'] = item.id;
      query += ' UpdateOptions'+index+' : updateOptions(input: $input'+index+'){ changedOptions{ id item value } }'; 
    } else {
      query += ' CreateOptions'+index+' : createOptions(input: $input'+index+'){ changedOptions{ id item value } }'; 
    }
  });
  
  query += "}";
  return {
    "query": query,
    "variables": variables
  }
}


const queries = {
  loadSettingsQry: loadSettingsQry,
  getPermissionConfigQry: getPermissionConfigQry,
  createUpdateSettingsMtn: createUpdateSettingsMtn
}

export default queries;