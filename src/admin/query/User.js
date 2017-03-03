import _ from 'lodash';

const getUserQry  = function(userId){
    return {
      "query": '{                                 ' + 
        'getUser(id: "'+userId+'"){  ' +
        '    id, username, fullName, gender, image, email, lastLogin, createdAt, meta { edges { node { item, value } }}' +
        ' }                                       ' +
        '}'
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

  if (type!=="All") {
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

const saveProfileMtn = function(name, username, email, gender, image){
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
          }
        }
      }`,
      "variables": {
        "input": {
          "id": localStorage.userId,
          "username": username,
          "fullName": name,
          "email": email,
          "gender": gender,
          "image": image
        }
      }
  }
}

const saveUserMetaMtn = function(arr){
  var query = "mutation { ";
  _.forEach(arr, function(val, index){
    query += ' UpdateUserMeta'+index+' : updateUserMeta(input: {id: "'+val.id+'", userId: "'+localStorage.getItem("userId")+'", item: "'+val.item+'", value: "'+val.value+'"}){ changedUserMeta{ id item value } }'; 
  });
  query += "}";

  return {
    "query": query
  }
}

const createUserMetaMtn = function(arr){
  var query = "mutation { ";
  _.forEach(arr, function(val, index){
    query += ' CreateUserMeta'+index+' : createUserMeta(input: {userId: "'+localStorage.getItem("userId")+'", item: "'+val.item+'", value: "'+val.value+'"}){ changedUserMeta{ id item value } }'; 
  });
  query += "}";

  return {
    "query": query
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

const queries = {
  getUserQry: getUserQry,
  getUserListQry: getUserListQry,
  getUserListByTypeQry: getUserListByTypeQry,
  createUserMtn: createUserMtn,
  saveProfileMtn: saveProfileMtn,
  saveUserMetaMtn: saveUserMetaMtn,
  createUserMetaMtn: createUserMetaMtn,
  changePasswordMtn: changePasswordMtn
}

module.exports = queries;