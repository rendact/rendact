import { HTTPFetchNetworkInterface } from 'apollo-client';
import _ from 'lodash';
import RecursiveIterator from 'recursive-iterator';
import { print as printGraphQL } from 'graphql/language/printer';

// example of custom network interface is from https://github.com/jaydenseric/apollo-upload-client/blob/master/src/network-interface.js
// the scaphold implementation is from https://gist.github.com/ihfazhillah/6289d7958592c055a2cbcad5d3821039

export class UploadHTTPFetchNetworkInterface extends HTTPFetchNetworkInterface {
  fetchFromRemoteEndpoint({ request, options }) {

    // set flag. if standart we will use standart apollo-client network interface
    // else we will use our implementation
    let standart = true;
    const formData = new FormData();

    for (const {node, path} of new RecursiveIterator(request.variables)) {
      if (node instanceof File){
        formData.append(path[1], node)
        _.unset(request.variables, path.join("."))
        standart = false
      }
    }

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
