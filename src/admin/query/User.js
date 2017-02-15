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

const queries = {
  getUserQry: getUserQry,
  getUserListQry: getUserListQry
}

module.exports = queries;