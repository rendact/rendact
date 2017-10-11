
export const getConfig = function(name){
  var config = JSON.parse(localStorage.getItem('config'));
  if (config && config[name])
    return config[name]
  else 
    return null;
}
