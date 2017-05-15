import _ from 'lodash';

const getPageListQry = function(s) {
  var status = '{ne: "Trash"}';
  if (s==="Trash" || s==="Draft" || s==="Reviewing")
    status = '{eq: "'+s+'"}';
  if (s==="Full") {
    status = '{ne: ""}';
  }

  return {
    "query": 
      'query getPages{viewer {allPosts(where: {type: {eq: "page"}, status: '+status+'}) { edges { node { '
     +'id,title,slug,author{username},status,comments{edges{node{id}}},createdAt}}}}}'
  };
}

const getCreatePageQry = function(data){
  return {
      "query": `
    mutation createPost($input: CreatePostInput!) {
        createPost(input: $input) {
          changedPost {
            id,
            title,
            content,
            summary,
            meta {
              edges {
                node {
                  id
                  item
                }
              }
            }
        }
      }
    }
    `,
      "variables": {
        "input": data
      }
    }
  };

const getUpdatePageQry = function(data){
  return {
      "query": `
    mutation updatePost($input: UpdatePostInput!) {
        updatePost(input: $input) {
          changedPost {
            id,
            title,
            content,
            summary,
            meta {
              edges {
                node {
                  id
                  item
                }
              }
            }
        }
      }
    }
    `,
      "variables": {
        "input": data
      }
    }
  };

const createPostMetaMtn = function(postId, data){
  var query = "mutation { ";
  _.forEach(data, function(val, index){
    query += ' CreatePostMeta'+index+' : createPostMeta(input: {postId: "'+postId+'", item: "'+val.item+'", value: "'+val.value+'"}){ changedPostMeta{ id } }'; 
  });
  query += "}";
  return {
    "query": query
  }
}

const updatePostMetaMtn = function(postId, data){
  var query = "mutation { ";
  _.forEach(data, function(val, index){
    query += ' UpdatePostMeta'+index+' : updatePostMeta(input: {id: "'+val.postMetaId+'", item: "'+val.item+'", value: "'+val.value+'"}){ changedPostMeta{ id } }'; 
  });
  query += "}";
  return {
    "query": query
  }
}


const getPageQry = function(postId){
  return {"query": 
      '{getPost(id:"'+postId+'"){ id,title,content,slug,author{username},status,visibility,parent,publishDate,order,'
      +'summary,category{edges{node{category{id,name}}}}comments{edges{node{id}}},meta{edges{node{item,value}'
      +'}}createdAt}}'
    }
  };

const deletePostQry = function(idList){
  var query = "mutation { ";
  _.forEach(idList, function(val, index){
    query += ' DeletePost'+index+' : updatePost(input: {id: "'+val+'", status: "Trash", deleteDate: "'+new Date()+'"}){ changedPost{ id } }'; 
  });
  query += "}";

  return {
    "query": query
  }
};

const deletePostPermanentQry = function(idList){
  var query = "mutation { ";
  _.forEach(idList, function(val, index){
    query += ' DeletePost'+index+' : deletePost(input: {id: "'+val+'"}){ changedPost{ id } }'; 
  });
  query += "}";

  return {
    "query": query
  }
};

const recoverPostQry = function(idList){
  var query = "mutation { ";
  _.forEach(idList, function(val, index){
    query += ' RecoverPost'+index+' : updatePost(input: {id: "'+val+'", status: "Published", deleteDate: ""}){ changedPost{ id } }'; 
  });
  query += "}";

  return {
    "query": query
  }
};


const checkSlugQry = function(slug){
  return {
    query: 'query checkSlug{ viewer { allPosts(where: {slug: {like: "'+slug+'"}}) { edges { node { id } } } } }'
  }
}

const queries = {
  getPageListQry: getPageListQry,
  getCreatePageQry: getCreatePageQry,
  getUpdatePageQry: getUpdatePageQry,
  createPostMetaMtn: createPostMetaMtn,
  updatePostMetaMtn: updatePostMetaMtn,
  getPageQry: getPageQry,
  deletePostQry: deletePostQry,
  deletePostPermanentQry: deletePostPermanentQry,
  checkSlugQry: checkSlugQry,
  recoverPostQry: recoverPostQry
}

module.exports = queries;