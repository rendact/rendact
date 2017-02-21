import request from 'request';
import Config from './config';

const riques = function(query, callback){
	request({
      url: Config.scapholdUrl,
      method: "POST",
      json: true,
      headers: {
        "content-type": "application/json",
        "Authorization": "Bearer " + localStorage.token
      },
      body: query
    }, callback);
}

const setValue = function(element, value) {
	document.getElementById(element).value = value;
}

let getValue = function(element) {
	return document.getElementById(element).value;
}

module.exports = {
	riques: riques,
	setValue: setValue,
	getValue: getValue
};