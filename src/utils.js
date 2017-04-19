import request from 'request';
import Config from './config';
import Query from './admin/query';
import _ from 'lodash';
import { default as swal } from 'sweetalert2';

const riques = function(query, callback, isadmin){
  var token = localStorage.getItem("token");
  if (isadmin || Config.adminMode){
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

const getConfig = function(name){
  var config = JSON.parse(localStorage.getItem('config'));
  if (config && config[name])
    return config[name]
  else 
    return null;
}

let hasRole = function(roleId){
  if (roleId==="all") return true;
  var p = JSON.parse(localStorage.getItem("profile"));
  
  var roleIdList = [];
  var permissionConfig = JSON.parse(getConfig("permissionConfig"));
  _.forEach(p.roles, function(item){
    roleIdList = _.concat(roleIdList, permissionConfig[item])
  })
  if (Config.adminMode) return true;
  return (_.indexOf(roleIdList, roleId)>-1)
}

let errorCallback = function(msg1, msg2){
  if (msg1) swal('Failed!', msg1, 'warning')
  else if (msg2) swal('Failed!', msg2, 'warning')
  else swal('Failed!', 'Unknown error','warning')
}

let sendMail = function(to, title, message, callback){
  request({
      url: getConfig('mailUrl'),
      method: "POST",
      json: true,
      headers: {
        "Authorization": "Basic "+btoa("api:"+getConfig('mailApiKey'))
      },
      form: {
        "from": getConfig('mailDefaultSender'),
        "to": to,
        "subject": title,
        "text": message
      }
    }, function(error, response, body){
      if (error){
        console.log(error)
      } else {
        console.log(response)
        if (callback)
          callback.call();
      }
    });
}

let getFormData = function(className){
  var _objData = [];
  _.forEach(document.getElementsByClassName(className), function(item){
    var _obj = {
      value: item.value,
      item: item.name
    }
    if (item.id)
      _obj['id'] = item.id
    _objData.push(_obj);
  });
  return _objData;
}

let disableForm = function(state, notif, excludeClass){
  //var me = this;
  _.forEach(document.getElementsByTagName('input'), function(el){ if (_.indexOf(excludeClass, el.getAttribute("class"))<0) el.disabled = state;});
  _.forEach(document.getElementsByTagName('button'), function(el){ if (_.indexOf(excludeClass, el.getAttribute("class"))<0) el.disabled = state;});
  _.forEach(document.getElementsByTagName('select'), function(el){ if (_.indexOf(excludeClass, el.getAttribute("class"))<0) el.disabled = state;});
  /*
  if (notif) {
    if (state)
      notif.addNotification({
        uid: 'saving',
        message: 'Processing...',
        level: 'warning',
        position: 'tr',
        dismissible: false,
        autoDismiss: 0
      });
    else {
      notif.addNotification({
        message: 'Done!',
        level: 'success',
        position: 'tr',
        autoDismiss: 1
      });
      notif.removeNotification('saving');
    }
  }
  */
}

const _saveConfig = function(name, value){
  var config = JSON.parse(localStorage.getItem('config'));
  if (config === null ){
    config = {}
  }
  config[name] = value;
  localStorage.setItem('config', JSON.stringify(config));
}

const loadConfig = function(callback){
  //var me = this;
  var qry = Query.getContentListQry;
  //var config = {}

  riques(qry, 
    function(error, response, body) { 
      if (body.data) { 
        var _dataArr = [];

        _.forEach(body.data.viewer.allContents.edges, function(item){
          var dt = new Date(item.node.createdAt);
          
          _dataArr.push({
            "postId": item.node.id,
            "name": item.node.name,
            "fields": item.node.fields,
            "slug": item.node.slug?item.node.slug:"",
            "status": item.node.status?item.node.status:"",
            "createdAt": dt.getFullYear() + "/" + (dt.getMonth() + 1) + "/" + dt.getDate()
          });

        });
        _saveConfig("contentList", _dataArr);

      } else {
        errorCallback(error, body.errors?body.errors[0].message:null);
      }
    }
  );

  qry = Query.loadSettingsQry;
  riques(qry, 
    function(error, response, body) { 
      if (body.data) { 
        _.forEach(body.data.viewer.allOptions.edges, function(item){
          _saveConfig(item.node.item, item.node.value);
        });
        if (callback) 
          callback.call();
      } else {
        errorCallback(error, body.errors?body.errors[0].message:null);
      }
    }
  );
}

module.exports = {
	riques: riques,
	setValue: setValue,
	getValue: getValue,
  getValueName: getValueName,
  getMaxRole: getMaxRole,
  hasRole: hasRole,
  errorCallback: errorCallback,
  sendMail: sendMail,
  getFormData: getFormData,
  disableForm: disableForm,
  loadConfig: loadConfig,
  getConfig: getConfig
};