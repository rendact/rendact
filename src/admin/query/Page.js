import _ from 'lodash';

const getPageListQry = function(s) {
  var status = '{ne: "'+s+'"}';
  if (s==="Deleted" || s==="Draft" || s==="Pending Review")
    status = '{eq: "'+s+'"}';

  return {
    "query": 
      'query getPages{viewer {allPosts(where: {type: {eq: "page"}, status: '+status+'}) { edges { node { '
     +'id,title,slug,author{username},status,comments{edges{node{id}}},createdAt}}}}}'
  };
}

const getCreatePageQry = function(title, content, draft, visibility, passwordPage, 

  publishDate, userId, slug, summary, parentPage, pageOrder){
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
        "input": {
          "title": title,
          "content": content,
          "status": draft,
          "visibility": visibility,
          "passwordPage": passwordPage,
          "publishDate": publishDate,
          "type": "page",
          "authorId": userId,
          "slug": slug,
          "summary": summary,
          "parent": parentPage,
          "order": pageOrder
        }
      }
    }
  };

const getUpdatePageQry = function(id, title, content, draft, visibility, passwordPage, 
  publishDate, userId, slug, summary, parentPage, pageOrder){
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
        "input": {
          "id": id,
          "title": title,
          "content": content,
          "status": draft,
          "visibility": visibility,
          "passwordPage": passwordPage,
          "publishDate": publishDate,
          "type": "page",
          "authorId": userId,
          "slug": slug,
          "summary": summary,
          "parent": parentPage,
          "order": pageOrder
        }
      }
    }
  };

const createPostMetaMtn = function(postId, metaKeyword, metaDescription, titleTag, pageTemplate){
  return {
    "query": 'mutation{'
    + 'insertKeyword: createPostMeta(input: {postId: "'+postId+'", item: "metaKeyword", value: "'+metaKeyword+'"}){ changedPostMeta{ id } } '
    + 'insertDescription: createPostMeta(input: {postId: "'+postId+'", item: "metaDescription", value: "'+metaDescription+'"}){ changedPostMeta{ id } } '
    + 'insertTitleTag: createPostMeta(input: {postId: "'+postId+'", item: "titleTag", value: "'+titleTag+'"}){ changedPostMeta{ id } } '
    + 'insertTemplate: createPostMeta(input: {postId: "'+postId+'", item: "pageTemplate", value: "'+pageTemplate+'"}){ changedPostMeta{ id } } '
    + '}'
  };
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
    query += ' DeletePost'+index+' : updatePost(input: {id: "'+val+'", status: "Deleted", deleteDate: "'+new Date()+'"}){ changedPost{ id } }'; 
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
    query: 'query checkSlug{ viewer { allPosts(where: {type: {eq: "page"}, slug: {like: "'+slug+'"}}) { edges { node { id } } } } }'
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