import _ from 'lodash';

const getPostListQry = function(s) {
  var status = '{ne: "Deleted"}';
  if (s==="Deleted" || s==="Draft" || s==="Pending Review")
    status = '{eq: "'+s+'"}';

  return {
    "query": 
      'query getPosts{viewer {allPosts(where: {type: {eq: "post"}, status: '+status+'}) { edges { node { '
     +'id,title,slug,author{username},status,meta{edges{node{id,item,value}}},category{edges{node{category{id, name}}}},tag{edges{node{tag{id, name}}}},comments{edges{node{id}}},createdAt}}}}}'
  };
}

const getContentsQry = function(type, status) {
  var status = '{ne: "Deleted"}';
  if (status==="Deleted" || status==="Draft" || status==="Pending Review")
    status = '{eq: "'+status+'"}';

  return {
    "query": 
      'query getPosts{viewer {allPosts(where: {type: {eq: "'+type+'"}, status: '+status+'}) { edges { node { '
     +'id,title,slug,author{username},status,meta{edges{node{id,item,value}}},category{edges{node{category{id, name}}}},comments{edges{node{id}}},createdAt}}}}}'
  };
}

const getAllCategoryQry = {
  "query": `query getCategories{
    viewer {
      allCategories {
        edges {
          node {
            id,
            name
          }
        }
      }
    }
  }`
}



const getCreatePostQry = function(title, content, draft, visibility, passwordPage,
  publishDate, userId, slug, summary, category){
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
          "type": "post",
          "authorId": userId,
          "slug": slug,
          "summary": summary,
        }
      }
    }
  };

const getUpdatePostQry = function(id, title, content, draft, visibility, passwordPage,
  publishDate, userId, slug, summary, category){
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
          "type": "post",
          "authorId": userId,
          "slug": slug,
          "summary": summary,
        }
      }
    }
  };

const getCreateCategoryOfPostQry = function(postId, categoryId){
return {
    "query": `
  mutation createCategoryOfPost($input: CreateCategoryOfPostInput!) {
      createCategoryOfPost(input: $input) {
        changedCategoryOfPost {
          id,
          post,
          category
      }
    }
  }
  `,
    "variables": {
      "input": {
        "post": postId,
        "category": categoryId
      }
    }
  }
};

const getUpdateCategoryOfPostQry = function(id, postId, categoryId){
  return {
      "query": `
    mutation updateCategoryOfPost($input: UpdateCategoryOfPostInput!) {
        updateCategoryOfPost(input: $input) {
          changedCategoryOfPost {
            id,
            post,
            category
        }
      }
    }
    `,
      "variables": {
        "input": {
          "id": id,
          "post": postId,
          "category": categoryId
        }
      }
    }
  };

const createUpdateCategoryOfPostMtn = function(postId, currentCat, newCat){
  var variables = {};
  var deleteList = _.difference(currentCat, newCat);
  var addList = _.difference(newCat, currentCat);

  var query = "mutation (";
  
  var _tempArr = [];
  var index = 0;
  _.forEach(deleteList, function(item){
    _tempArr.push("$input"+index+": DeleteCategoryOfPostInput!")
    index++;
  });
  _.forEach(addList, function(item){
    _tempArr.push("$input"+index+": CreateCategoryOfPostInput!")
    index++;
  });
  query += _.join(_tempArr, ",");
  query += ") {";

  index = 0;
  _.forEach(deleteList, function(item){
    query += ' DeleteCategoryOfPost'+index+' : deleteCategoryOfPost(input: $input'+index+'){ changedCategoryOfPost{ id } }'; 
    variables["input"+index] = {
      postId: postId,
      categoryId: item
    }

    index++;
  });

  _.forEach(addList, function(item){
    query += ' CreateCategoryOfPost'+index+' : createCategoryOfPost(input: $input'+index+'){ changedCategoryOfPost{ id } }'; 
    variables["input"+index] = {
      postId: postId,
      categoryId: item
    }

    index++;
  });
  
  query += "}";
  return {
    "query": query,
    "variables": variables
  }
}

const getPostQry = function(postId){
  return {"query": 
      '{getPost(id:"'+postId+'"){ id,title,content,slug,author{username},status,visibility,'
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



const queries = {
  getPostListQry: getPostListQry,
  getAllCategoryQry: getAllCategoryQry,
  getPostQry: getPostQry,
  getCreatePostQry: getCreatePostQry,
  getUpdatePostQry: getUpdatePostQry,
  getCreateCategoryOfPostQry: getCreateCategoryOfPostQry,
  getUpdateCategoryOfPostQry: getUpdateCategoryOfPostQry,
  deletePostQry: deletePostQry,
  deletePostPermanentQry: deletePostPermanentQry,
  recoverPostQry: recoverPostQry,
  createUpdateCategoryOfPostMtn: createUpdateCategoryOfPostMtn,
  getContentsQry: getContentsQry
}

module.exports = queries;