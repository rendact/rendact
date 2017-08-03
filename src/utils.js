import request from 'request';
import Config from './config';
import AdminConfig from './admin/AdminConfig';
import Query from './admin/query';
import _ from 'lodash';
import { default as swal } from 'sweetalert2';

export const swalert = function(type, title, body, callback, rgba){
  var background = '#fff';
  var buttonColor = '#357ca5';
  var showCancelButton = true;
  var confirmButtonText = "";
  var text = body;

  if (type==="warning") {
    background = "rgba(239,203,4,.75)";
    buttonColor = '#db8b0b';
    text = title;
    confirmButtonText = "Yes"
  }
  if (type==="info") {
    background = "rgba(0,0,128,.75)";
    buttonColor = '#00a7d0';
    showCancelButton = false;
    confirmButtonText = "OK";
  }
  if (type==="error"){
    background = "rgba(239,4,16,.75)";
    buttonColor = '#d33724';
    showCancelButton = false;
    confirmButtonText = "OK";
  }

  if (!callback) {
    callback = function(){}
  }

  swal({
      /*title: title,*/
      text: text,
      showCancelButton: showCancelButton,
      background: background,
      confirmButtonText: confirmButtonText,
      cancelButtonText: 'Cancel',
      confirmButtonColor: buttonColor,
      cancelButtonColor: 'grey',
      confirmButtonClass: 'btn swal-btn-success',
      cancelButtonClass: 'btn swal-btn-danger',
      buttonsStyling: true,
      customClass: 'swal'
    }).then(callback)
}

export const riques = function(query, callback, isadmin){
  var token = localStorage.getItem("token");
  if (isadmin || Config.adminMode){
    token = Config.adminToken
  }
  
	request({
      url: Config.graphqlApiUrl,
      method: "POST",
      json: true,
      headers: {
        "content-type": "application/json",
        "Authorization": "Bearer " + token
      },
      body: query
    }, callback);
}

export const setValue = function(element, value) {
  if (document.getElementById(element))
	 document.getElementById(element).value = value;
}

export const getValue = function(element) {
  if (document.getElementById(element))
	  return document.getElementById(element).value;
  else 
    return null;
}

export const getValueName = function(element){
  return document.getElementsByName(element);
}

export const getMaxRole = function(){
  var p = JSON.parse(localStorage.getItem("profile"));
  var roleValueList = _.map(p.roles, function(item){ return AdminConfig.roleValue[item] });
  var maxRole = _.max(roleValueList);
  if (!maxRole) maxRole=1;
  if (Config.adminMode) return 1000;
  return maxRole;
}

export const getConfig = function(name){
  var config = JSON.parse(localStorage.getItem('config'));
  if (config && config[name])
    return config[name]
  else 
    return null;
}

export const hasRole = function(roleId){
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

export const errorCallback = function(msg1, msg2, module){
  var moduleTxt = ""
  if (module) {
    moduleTxt = " ("+module+")";
  }
  if (msg1) swalert('error','Failed!', msg1+moduleTxt)
  else if (msg2) swalert('error','Failed!', msg2+moduleTxt)
  else swalert('error','Failed!', 'Unknown error'+moduleTxt)
}

export const sendMail = function(to, title, message, callback){
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

export const getFormData = function(className, output){
  var _objData;
  if (!output) output = "list";

  if (output==="list") {
    _objData = [];
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

  if (output==="object") {
    _objData = {};
    _.forEach(document.getElementsByClassName(className), function(item){
      _objData[item.id] = item.value;
    });
    return _objData;
  }
}

export const disableBySelector = (state, selectors) => {
  /* 
   * utils to disable all items that match with selectors
   * selectors = array with css selector inside
   * state = disabled state, true or false
   */

    // select all items with selector
    // each selector, add disabled property === state
  _.forEach(selectors, (selector, index) => {
    _.forEach(document.querySelectorAll(selector), (element, index) => {
      element.disabled = state;
    });

  });
}

export const disableForm = function(state, notif, excludeClass){
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

export const _saveConfig = function(name, value){
  var config = JSON.parse(localStorage.getItem('config'));
  if (config === null ){
    config = {}
  }
  config[name] = value;
  localStorage.setItem('config', JSON.stringify(config));
}

export const loadConfig = function(callback){
  var qry = Query.getContentListQry("active");
  riques(qry, 
    function(error, response, body) { 
      if (!error && !body.errors && response.statusCode === 200) {
        var _dataArr = [];

        _.forEach(body.data.viewer.allContents.edges, function(item){
          var dt = new Date(item.node.createdAt);
          var fields = item.node.fields;
          if (item.node.customFields) fields = _.concat(item.node.fields, item.node.customFields)

          _dataArr.push({
            "postId": item.node.id,
            "name": item.node.name,
            "fields": fields,
            "customFields": item.node.customFields,
            "slug": item.node.slug?item.node.slug:"",
            "status": item.node.status?item.node.status:"",
            "createdAt": dt.getFullYear() + "/" + (dt.getMonth() + 1) + "/" + dt.getDate()
          });

        });
        _saveConfig("contentList", _dataArr);

      } else {
        errorCallback(error);
      }
    }
  );

  qry = Query.loadSettingsQry;
  riques(qry, 
    function(error, response, body) { 
      if (!error && !body.errors && response.statusCode === 200) {
        _.forEach(body.data.viewer.allOptions.edges, function(item){
          _saveConfig(item.node.item, item.node.value);
        });
        if (callback) 
          callback.call();
      } else {
        errorCallback(error);
      }
    }
  );
}

export const defaultHalogenStyle = {
    display: '-webkit-flex',
    WebkitFlex: '0 1 auto',
    flex: '0 1 auto',
    WebkitFlexDirection: 'column',
    flexDirection: 'column',
    WebkitFlexGrow: 1,
    flexGrow: 1,
    WebkitFlexShrink: 0,
    flexShrink: 0,
    WebkitFlexBasis: '25%',
    flexBasis: '25%',
    maxWidth: '25%',
    height: '200px',
    top: '50%',
    left: '50%',
    position: 'absolute',
    WebkitAlignItems: 'center',
    alignItems: 'center',
    WebkitJustifyContent: 'center',
    justifyContent: 'center',
    zIndex: 100
};

export const removeTags = function(txt){
    var rex = /(<([^>]+)>)/ig;
    return txt.replace(rex , "");
}

export const toHTMLObject = function(text){
  var parser=new DOMParser();
  var htmlDoc=parser.parseFromString(text, "text/html");
  return htmlDoc;
}
