import request from 'request';
import Config from '../config';
import Query from '../admin/query';
import {riques, errorCallback} from '../utils';
import _ from 'lodash';
import { default as swal } from 'sweetalert2';

export const latestPosts = function(){
    riques(Query.getPostListQry("Full"), 
      function(error, response, body) { 
        if (!error && !body.errors && response.statusCode === 200) {
          var _postArr = [];
          _.forEach(body.data.viewer.allPosts.edges, function(item){
            _postArr.push(item.node);
          });
          return _postArr;
        } else {
          errorCallback(error, body.errors?body.errors[0].message:null);
          return null;
        }
      }
    );
}