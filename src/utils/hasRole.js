import {getConfig} from './getConfig'
import forEach from 'lodash/forEach'
import concat from 'lodash/concat'
import indexOf from 'lodash/indexOf'
import Config from '../rendact.config.json';

export const hasRole = function(roleId){
  if (roleId==="all") return true;
  var p = JSON.parse(localStorage.getItem("profile"));
  
  var roleIdList = [];
  var permissionConfig = JSON.parse(getConfig("permissionConfig"));
  forEach(p.roles, function(item){
    roleIdList = concat(roleIdList, permissionConfig[item])
  })
  if (Config.adminMode) return true;
  return (indexOf(roleIdList, roleId)>-1)
}
