
export const saveConfig = function(name, value){
  var config = JSON.parse(localStorage.getItem('config'));
  if (config === null ){
    config = {}
  }
  config[name] = value;
  localStorage.setItem('config', JSON.stringify(config));
}
