import $ from 'jquery';
window.jQuery = $;

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

const getLoginAuth0Mtn = function(identities, token, clientId){
    return {
        "query": `mutation LoginUserWithAuth0Lock ($input: LoginUserWithAuth0LockInput!) {
          loginUserWithAuth0Lock(input: $input) {
            user {
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
                "identity": identities,
                "access_token": token,
                "clientMutationId": clientId
              }
            }
        }
}

const loginUserQry = function(username, password){
    return {
      "query": `mutation LoginUserQuery ($input: LoginUserInput!) {
        loginUser(input: $input) {
          token
          user {
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
          "password": password
        }
      }

    }
}

const getCreatePostQry = function(title, content, titleTag, draft, visibility, passwordPage, createDate, userId, slug){
  return {
      "query": `
    mutation createPost($input: CreatePostInput!) {
        createPost(input: $input) {
          changedPost {
            title,
            content,
            titleTag
        }
      }
    }
    `,
      "variables": {
        "input": {
          "title": title,
          "content": content,
          "titleTag": titleTag,
          "status": draft,
          "visibility": visibility,
          "passwordPage": passwordPage,
          "type": "page",
          "authorId": userId,
          "slug": slug
        }
      }
    }
  };

const getUpdatePostQry = function(id, title, content, titleTag, draft, visibility, passwordPage, createDate, userId, slug){
  return {
      "query": `
    mutation updatePost($input: UpdatePostInput!) {
        updatePost(input: $input) {
          changedPost {
            title,
            content,
            titleTag
        }
      }
    }
    `,
      "variables": {
        "input": {
          "id": id,
          "title": title,
          "content": content,
          "titleTag": titleTag,
          "status": draft,
          "visibility": visibility,
          "passwordPage": passwordPage,
          "type": "page",
          "authorId": userId,
          "slug": slug
        }
      }
    }
  };

const getCreatePostMetaQry = function(metaKeyword, metaDescription, summary){
  return {
      "query": `
        mutation createPostMeta($input: CreatePostMetaInput!) {
          createPostMeta(input: $input) {
            changedPostMeta {
              metaKeyword,
              metaDescription,
              summary
            }
          }
        }
    `,
      "variables": {
        "input": {
          "metaKeyword": metaKeyword,
          "metaDescription": metaDescription,
          "summary": summary
        }
      }
    }
  };

const getPageQry = function(postId){
  return {"query": 
      '{getPost(id:"'+postId+'"){ id,title,content,slug,author{username},status,comments{edges{node{id}}},createdAt}}'
    }
  };

const getPageListQry = {"query": `
      query getPages{
      viewer {
        allPosts(where: {type: {eq: "page"}}) {
          edges {
            node {
              id
              title,
              slug,
              author {
                username
              },
              status,
              comments{
                edges{
                  node{
                    id
                  }
                }
              },
              createdAt
            }
          }
        }
      }
      } 
    `};

const deletePostQry = function(idList){
  var query = "mutation { ";
  $.each(idList, function(key, val){
    query += ' DeletePost'+key+': deletePost(input: {id: "'+val+'"}){ changedPost{ id } }'; 
  });
  query += "}";

  return {
    "query": query
  }
};

const queries = {
	getUserQry: getUserQry,
  getLoginAuth0Mtn: getLoginAuth0Mtn,
  loginUserQry: loginUserQry,
  getCreatePostQry: getCreatePostQry,
  getCreatePostMetaQry: getCreatePostMetaQry,
  getPageQry: getPageQry,
  getUpdatePostQry: getUpdatePostQry,
  getPageListQry: getPageListQry,
  deletePostQry: deletePostQry
}

module.exports = queries;