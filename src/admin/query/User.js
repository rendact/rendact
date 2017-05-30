import _ from 'lodash';

const getUserQry  = function(userId){
    return {

      "query": `{
        getUser(id: "`+userId+`"){
        id, username, fullName, gender, image, email, lastLogin, createdAt, country, dateOfBirth,
        meta { edges { node { id, item, value } }} roles { edges { node { id, name } }}
        }                                       
      }`

    }
};

const getUserListQry = {
"query": `query getUsers{
        viewer {
        allUsers {
          edges {
            node {
              id,
              username,
              email,
              fullName,
              gender,
              image,
              country,
              lastLogin,
              dateOfBirth,
              posts {
                edges {
                  node {
                    id
                  }
                }
              }
              roles {
                edges {
                  node {
                    id
                    name
                  }
                }
              }
              
            }
          }
        }
      }
    }`
};

const getUserListByTypeQry = function(type){
  var typeQry = "";
  if (type==="No Role" || type==="Full") {
    typeQry = "";
  } else if (type!=="All") {
    typeQry = '(where: {roles:  {node: {name: {eq: "'+type+'"}}}})';
  }

  return {
    "query": `query getUsers{` +
       `viewer {
        allUsers `+typeQry+`{
          edges {
            node {
              id,
              username,
              email,
              fullName,
              gender,
              image,
              country,
              lastLogin,
              dateOfBirth,
              posts {
                edges {
                  node {
                    id
                  }
                }
              }
              roles {
                edges {
                  node {
                    id
                    name
                  }
                }
              }
              
            }
          }
        }
      }
    }`
  }
};

const createUserMtn = function(username, password, email, fullname, gender, country, dateOfBirth) {
  return {
      "query": `mutation CreateUserQuery ($input: CreateUserInput!) {
        createUser(input: $input) {
          token
          changedUser {
            id
            username
            fullName
            gender
            email
            image
            country
            dateOfBirth
            lastLogin
            createdAt
            meta {
              edges {
                node {
                  id
                  item 
                  value
                }
              }
            }
            roles {
              edges {
                node {
                  id
                  name
                }
              }
            }
          }
        }
      }`,
      "variables": {
        "input": {
          "username": username,
          "fullName": fullname,
          "password": password,
          "email": email,
          "gender": gender,
          "country": country,
          "dateOfBirth" : dateOfBirth
        }
      }

    }
}

const saveProfileMtn = function(data){
  return {
    "query": `mutation UpdateUserQuery ($input: UpdateUserInput!) {
        updateUser(input: $input) {
          changedUser {
            id
            username
            fullName
            gender
            email
            image
            country 
            dateOfBirth
            lastLogin
            createdAt
            meta {
              edges {
                node {
                  id
                  item 
                  value
                }
              }
            }
            roles {
              edges {
                node {
                  id
                  name
                }
              }
            }
          }
        }
      }`,
      "variables": {
        "input": {
          "id": data['userId'],
          "fullName": data['name'],
          "gender": data['gender'],
          "image": data['image'],
          "country": data['country'],
          "dateOfBirth": data['dateOfBirth']
        }
      }
  }
}

const saveUserMetaMtn = function(userId, arr){
  var variables = {};
  var query = "mutation (";
  var i = 0;
  query += 
    _.join(
    _.map(arr, function(item){
      var str = "$input"+i+": UpdateUserMetaInput!";
      i++;
      return str;
    }), ",");
  query += ") {";
  _.forEach(arr, function(val, index){
    query += ' UpdateUserMeta'+index+' : updateUserMeta(input: $input'+index+'){ changedUserMeta{ id item value } }'; 
    variables["input"+index] = {
      id: val.id,
      userId: userId,
      item: val.item,
      value: val.value
    }
  });
  query += "}";
  return {
    "query": query,
    "variables": variables
  }
}

const createUserMetaMtn = function(userId, arr){
  var variables = {};
  var query = "mutation (";
  var i = 0;
  query += 
    _.join(
    _.map(arr, function(item){
      var str = "$input"+i+": CreateUserMetaInput!";
      i++;
      return str;
    }), ",");
  query += ") {";
  _.forEach(arr, function(val, index){
    query += ' CreateUserMeta'+index+' : createUserMeta(input: $input'+index+'){ changedUserMeta{ id item value } }'; 
    variables["input"+index] = {
      userId: userId,
      item: val.item,
      value: val.value
    }
  });
  query += "}";
  return {
    "query": query,
    "variables": variables
  }
}

const createUpdateUserMetaMtn = function(userId, arrItem, arrData){
  var variables = {};
  var query = "mutation (";
  
  var keysArr = _.keys(arrData);

  _.forEach(keysArr, function(item, index){
    if (_.indexOf()>=0) {
      query += "$input"+index+": UpdateUserMetaInput!";
    } else {
      query += "$input"+index+": CreateUserMetaInput!";
    }
    if (index!==keysArr.length-1) query += ", "
  });
  query += ") {";

  var index = 0;
  _.forEach(arrData, function(val, key){
    if (_.indexOf(arrItem, key)>=0) {
      query += ' UpdateUserMeta'+index+' : updateUserMeta(input: $input'+index+'){ changedUserMeta{ id item value } }'; 
    } else {
      query += ' CreateUserMeta'+index+' : createUserMeta(input: $input'+index+'){ changedUserMeta{ id item value } }'; 
    }

    variables["input"+index] = {
      userId: userId,
      item: key,
      value: val
    }

    index++;
  });
  
  query += "}";
  return {
    "query": query,
    "variables": variables
  }
}

const changePasswordMtn = function(oldPass, newPass){
  return {
    "query": `mutation ChangePassword($input: ChangeUserPasswordInput!)
      { 
        changeUserPassword(input: $input){
          changedUser{
            id
          }
        }
      }`,
    "variables": {
      input: {
        id: localStorage.getItem("userId"),
        oldPassword: oldPass, 
        newPassword: newPass
      }
    }
  }
}

const addRoleToUser = function(userId, roleId, accessLevel){
  return {
    "query": `mutation AddToUserRolesConnection($input: AddToUserRolesConnectionInput!)
      { 
        addToUserRolesConnection(input: $input){
          changedUserRoles{
            user {
              id
            }
          }
        }
      }`,
    "variables": {
      input: {
        userId: userId,
        roleId: roleId, 
        accessLevel: accessLevel
      }
    }
  }
}

const deleteRoleUser = function(userId, roleId){
  return {
    "query": `mutation RemoveFromUserRolesConnection($input: RemoveFromUserRolesConnectionInput!)
      { 
        removeFromUserRolesConnection(input: $input){
          changedUserRoles{
            user {
              id
            }
          }
        }
      }`,
    "variables": {
      input: {
        userId: userId,
        roleId: roleId
      }
    }
  }
}

const updateRoleUser = function(userId, role1, role2, accessLevel){
  return {
    "query": `mutation UpdateRolesConnection($input1: RemoveFromUserRolesConnectionInput!, $input2: AddToUserRolesConnectionInput!)
      { 
        removeFromUserRoles: removeFromUserRolesConnection(input: $input1){
          changedUserRoles{
            user {
              id
            }
          }
        }
        addToUserRoles: addToUserRolesConnection(input: $input2){
          changedUserRoles{
            user {
              id
            }
          }
        }
      }`,
    "variables": {
      input1: {
        userId: userId,
        roleId: role1
      },
      input2: {
        userId: userId,
        roleId: role2,
        accessLevel: accessLevel
      }
    }
  }
}

const setAsOwner = function(newOwner, allUserId, accessLevel){
  var query = "mutation { ";
  _.forEach(allUserId, function(val, index){
    query += ' removeFromUserRoles'+index+' : removeFromUserRolesConnection(input: {userId: "'+val+'", roleId: "Um9sZToy"}){ changedUserRoles{ user {id} } }'; 
  });
  query += ' addToUserRoles1 : addToUserRolesConnection(input: {userId: "'+newOwner+'", roleId: "Um9sZToy", accessLevel: admin}){ changedUserRoles{ user {id} } }'; 
  query += "}";

  return {
    "query": query
  }
}

const getRolesQry = {
  "query": `
    query getRoles{
      viewer{
        allRoles{
          edges {
            node{
              id
              name
            }
          }
        }
      }
    }
  `
}

const deleteUserQry = function(idList){
  var query = "mutation { ";
  _.forEach(idList, function(val, index){
    query += ' DeleteUser'+index+' : deleteUser(input: {id: "'+val+'"}){ changedUser{ id } }'; 
  });
  query += "}";

  return {
    "query": query
  }
};

const checkUsernameQry = function(username){
  return {
    query: 'query checkUsername{ viewer { allUsers(where: {username: {like: "'+username+'"}}) { edges { node { id } } } } }'
  }
}

const checkEmailQry = function(email){
  return {
    query: 'query checkEmail{ viewer { allUsers(where: {email: {like: "'+email+'"}}) { edges { node { id } } } } }'
  }
}

const queries = {
  getUserQry: getUserQry,
  getUserListQry: getUserListQry,
  getUserListByTypeQry: getUserListByTypeQry,
  createUserMtn: createUserMtn,
  saveProfileMtn: saveProfileMtn,
  saveUserMetaMtn: saveUserMetaMtn,
  createUserMetaMtn: createUserMetaMtn,
  createUpdateUserMetaMtn: createUpdateUserMetaMtn,
  changePasswordMtn: changePasswordMtn,
  addRoleToUser: addRoleToUser,
  deleteRoleUser: deleteRoleUser,
  getRolesQry: getRolesQry,
  deleteUserQry: deleteUserQry,
  updateRoleUser: updateRoleUser,
  checkUsernameQry: checkUsernameQry,
  checkEmailQry: checkEmailQry,
  setAsOwner: setAsOwner
}

module.exports = queries;