import request from 'request';
import Config from './config';
import _ from 'lodash';
import { default as swal } from 'sweetalert2';

const riques = function(query, callback, isadmin){
  var token = localStorage.getItem("token");
  if (isadmin){
    token = Config.adminToken
  }
  
	request({
      url: Config.scapholdUrl,
      method: "POST",
      json: true,
      headers: {
        "content-type": "application/json",
        "Authorization": "Bearer " + token
      },
      body: query
    }, callback);
}

const setValue = function(element, value) {
  if (document.getElementById(element))
	 document.getElementById(element).value = value;
}

let getValue = function(element) {
  if (document.getElementById(element))
	  return document.getElementById(element).value;
  else 
    return null;
}

let getValueName = function(element){
  return document.getElementsByName(element);
}

let getMaxRole = function(){
  var p = JSON.parse(localStorage.getItem("profile"));
  var roleValueList = _.map(p.roles, function(item){ return Config.roleValue[item] });
  var maxRole = _.max(roleValueList);
  if (!maxRole) maxRole=1;
  if (Config.adminMode) return 1000;
  return maxRole;
}

let hasRole = function(roleId){
  if (roleId==="all") return true;
  var p = JSON.parse(localStorage.getItem("profile"));
  
  var roleIdList = [];
  _.forEach(p.roles, function(item){
    roleIdList = _.concat(roleIdList, Config.permissionConfig[item])
  })

  return (_.indexOf(roleIdList, roleId)>-1)
}

let errorCallback = function(msg1, msg2){
  if (msg1) swal('Failed!', msg1, 'warning')
  else if (msg2) swal('Failed!', msg2, 'warning')
  else swal('Failed!', 'Unknown error','warning')
}

module.exports = {
	riques: riques,
	setValue: setValue,
	getValue: getValue,
  getValueName: getValueName,
  getMaxRole: getMaxRole,
  hasRole: hasRole,
  errorCallback: errorCallback
};