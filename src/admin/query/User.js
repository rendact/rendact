import _ from 'lodash';

const getUserQry  = function(userId){
    return {

      "query": `{
        getUser(id: "`+userId+`"){
        id, username, fullName, gender, image, email, lastLogin, createdAt, country, dateOfBirth,
        meta { edges { node { item, value } }} roles { edges { node { id, name } }}
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
              lastLogin,
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
  if (type==="No Role") {
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
              lastLogin,
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

const createUserMtn = function(username, password, email, fullname, gender) {
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
            lastLogin
            createdAt
          }
        }
      }`,
      "variables": {
        "input": {
          "username": username,
          "fullName": fullname,
          "password": password,
          "email": email,
          "gender": gender
        }
      }

    }
}

const saveProfileMtn = function(userId, name, username, email, gender, image, country){
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
          "id": userId,
          "username": username,
          "fullName": name,
          "email": email,
          "gender": gender,
          "image": image,
          "country": country
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

const createUserMetaMtn = function(arr){
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
      userId: localStorage.getItem("userId"),
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

const queries = {
  getUserQry: getUserQry,
  getUserListQry: getUserListQry,
  getUserListByTypeQry: getUserListByTypeQry,
  createUserMtn: createUserMtn,
  saveProfileMtn: saveProfileMtn,
  saveUserMetaMtn: saveUserMetaMtn,
  createUserMetaMtn: createUserMetaMtn,
  changePasswordMtn: changePasswordMtn,
  addRoleToUser: addRoleToUser,
  deleteRoleUser: deleteRoleUser,
  getRolesQry: getRolesQry
}

module.exports = queries;