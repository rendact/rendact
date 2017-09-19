import { HTTPFetchNetworkInterface } from 'apollo-client';
import _ from 'lodash';
import { print as printGraphQL } from 'graphql/language/printer';

// example of custom network interface is from https://github.com/jaydenseric/apollo-upload-client/blob/master/src/network-interface.js
// the scaphold implementation is from https://gist.github.com/ihfazhillah/6289d7958592c055a2cbcad5d3821039

// this mixin is from package named lodash-deep, i modify it so this mixin can return path of instance of File object. So, currently we dont need the original package.
var mixin = {
deepMapValues: function(object, callback, propertyPath){
    propertyPath = propertyPath || '';
    if(_.isArray(object)){
        return _.map(object, deepMapValuesIteratee);
    }
    else if(_.isObject(object) && !_.isDate(object) && !_.isRegExp(object) && !_.isFunction(object) && !(object instanceof File)){
        return _.extend({}, object, _.mapValues(object, deepMapValuesIteratee));
    }
    else{
        return callback(object, propertyPath);
    }

    function deepMapValuesIteratee(value, key){
        var valuePath = propertyPath ? propertyPath + '.' + key: key;
        return _.deepMapValues(value, callback, valuePath);
    }
  }
}

_.mixin(mixin)

export class UploadHTTPFetchNetworkInterface extends HTTPFetchNetworkInterface {
  fetchFromRemoteEndpoint({ request, options }) {

    // set flag. if standart we will use standart apollo-client network interface
    // else we will use our implementation
    let standart = true;
    const formData = new FormData();

    _.deepMapValues(request.variables, (node, path) => {
      if (node instanceof File){
        formData.append(_.last(path.split('.')), node)
        _.unset(request.variables, path)
        standart = false
      }
    })


    if (!standart){
      formData.append('query', printGraphQL(request.query));
      formData.append('variables', JSON.stringify(request.variables || {}));
      formData.append('debugName', JSON.stringify(request.debugName || ''));
      formData.append('operationName', JSON.stringify(request.operationName || ''));

      // sending request
      return fetch(this._uri, {
        method: 'POST',
        body: formData,
        ...options
      })

    }


    // Standard fetch method fallback
    return super.fetchFromRemoteEndpoint({ request, options })
  }
}

export function createNetworkInterface({ uri, opts = {} }) {
  return new UploadHTTPFetchNetworkInterface(uri, opts)
}
