import _ from 'lodash';

const getPostListQry = function(s) {
  var status = '{ne: "Deleted"}';
  if (s==="Deleted" || s==="Draft" || s==="Pending Review")
    status = '{eq: "'+s+'"}';

  return {
    "query": 
      'query getPosts{viewer {allPosts(where: {type: {eq: "post"}, status: '+status+'}) { edges { node { '
     +'id,title,slug,author{username},status,meta{edges{node{id,item,value}}},category{edges{node{category{id, name}}}},tag{edges{node{tag{id, name}}}},comments{edges{node{id}}},featuredImage,createdAt}}}}}'
  };
};

const getContentsQry = function(type, status) {
  var status = '{ne: "Deleted"}';
  if (status==="Deleted" || status==="Draft" || status==="Pending Review")
    status = '{eq: "'+status+'"}';

  return {
    "query": 
      'query getPosts{viewer {allPosts(where: {type: {eq: "'+type+'"}, status: '+status+'}) { edges { node { '
     +'id,title,slug,author{username},status,meta{edges{node{id,item,value}}},category{edges{node{category{id, name}}}},comments{edges{node{id}}},featuredImage,createdAt}}}}}'
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

const getAllTagQry = {
  "query": `query getTags{
    viewer {
      allTags {
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

const getCreatePostQry = function(data){
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
        "input": data
      }
    }
  };

  const createCategory = function(name){
  return {
      "query": `
    mutation createCategory($input: CreateCategoryInput!) {
        createCategory(input: $input) {
          changedCategory {
            id,
            name
        }
      }
    }
    `,
      "variables": {
        "input": {
          "name": name
        }
      }
    }
  };

  const createTag = function(name){
  return {
      "query": `
    mutation createTag($input: CreateTagInput!) {
        createTag(input: $input) {
          changedTag {
            id,
            name
        }
      }
    }
    `,
      "variables": {
        "input": {
          "name": name
        }
      }
    }
  };

const getUpdatePostQry = function(data){
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

  const UpdateTag = function(postId, name){
  return {
      "query": `
    mutation updateTag($input: UpdateTagInput!) {
        updateTag(input: $input) {
          changedTag {
            id,
            name
        }
      }
    }
    `,
      "variables": {
        "input": {
          "id": postId,
          "name": name
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

const createUpdateTagOfPostMtn = function(postId, currentTag, newTag){
  var variables = {};
  var deleteList = _.difference(currentTag, newTag);
  var addList = _.difference(newTag, currentTag);

  var query = "mutation (";
  
  var _tempArr = [];
  var index = 0;
  _.forEach(deleteList, function(item){
    _tempArr.push("$input"+index+": DeleteTagOfPostInput!")
    index++;
  });
  _.forEach(addList, function(item){
    _tempArr.push("$input"+index+": CreateTagOfPostInput!")
    index++;
  });
  query += _.join(_tempArr, ",");
  query += ") {";

  index = 0;
  _.forEach(deleteList, function(item){
    query += ' DeleteTagOfPost'+index+' : deleteTagOfPost(input: $input'+index+'){ changedTagOfPost{ id } }'; 
    variables["input"+index] = {
      postId: postId,
      tagId: item
    }

    index++;
  });

  _.forEach(addList, function(item){
    query += ' CreateTagOfPost'+index+' : createTagOfPost(input: $input'+index+'){ changedTagOfPost{ id } }'; 
    variables["input"+index] = {
      postId: postId,
      tagId: item
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
      '{getPost(id:"'+postId+'"){ id,title,content,slug,author{username},status,visibility,featuredImage,'
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

const deleteCategoryPermanentQry = function(idList){
  var query = "mutation { ";
  _.forEach(idList, function(val, index){
    query += ' DeleteCategory'+index+' : deleteCategory(input: {id: "'+val+'"}){ changedCategory{ id } }'; 
  });
  query += "}";

  return {
    "query": query
  }
};

const deleteTagPermanentQry = function(idList){
  var query = "mutation { ";
  _.forEach(idList, function(val, index){
    query += ' DeleteTag'+index+' : deleteTag(input: {id: "'+val+'"}){ changedTag{ id } }'; 
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
  getAllTagQry: getAllTagQry,
  getPostQry: getPostQry,
  getCreatePostQry: getCreatePostQry,
  getUpdatePostQry: getUpdatePostQry,
  getCreateCategoryOfPostQry: getCreateCategoryOfPostQry,
  getUpdateCategoryOfPostQry: getUpdateCategoryOfPostQry,
  deletePostQry: deletePostQry,
  deletePostPermanentQry: deletePostPermanentQry,
  recoverPostQry: recoverPostQry,
  createUpdateCategoryOfPostMtn: createUpdateCategoryOfPostMtn,
  createUpdateTagOfPostMtn: createUpdateTagOfPostMtn,
  getContentsQry: getContentsQry,
  deleteCategoryPermanentQry: deleteCategoryPermanentQry,
  deleteTagPermanentQry: deleteTagPermanentQry,
  createCategory: createCategory,
  createTag: createTag,
  UpdateTag: UpdateTag,
}

module.exports = queries;