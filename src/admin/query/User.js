const getUserQry  = function(userId){
    return {
      "query": '{                                 ' + 
        'getUser(id: "'+userId+'"){  ' +
        '    id,                                  ' +
        '    username                             ' +
        '    fullName                             ' +
        '    gender                               ' +
        '    email                                ' +
        '    lastLogin                            ' +
        '    createdAt                            ' +
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
              lastLogin,
              posts {
                edges {
                  node {
                    id
                  }
                }
              }
              
            }
          }
        }
      }
    }`
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

const queries = {
  getUserQry: getUserQry,
  getUserListQry: getUserListQry,
  createUserMtn: createUserMtn
}

module.exports = queries;