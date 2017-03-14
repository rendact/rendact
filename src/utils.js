import request from 'request';
import Config from './config';

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

module.exports = {
	riques: riques,
	setValue: setValue,
	getValue: getValue,
  getValueName: getValueName
};