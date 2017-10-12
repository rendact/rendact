import _ from 'lodash';
import gql from 'graphql-tag';


const updateFeaturedImage = gql`
mutation updateFile($input: UpdateFileInput!) {
        updateFile(input: $input) {
          changedFile {
            id
            type
            value
            blobMimeType
            blobUrl
          }
        }
      }
      `

const getPostListQry = function(s, postType, tagId, cateId) {
  var status = '{ne: "Trash"}';
  if (s==="Published" || s==="Trash" || s==="Draft" || s==="Reviewing")
    status = '{eq: "'+s+'"}';
  if (s==="Full") {
    status = '{ne: ""}';
  }

  var tag = "";
  if (tagId){
    tag = ', tag: {tag: {id: {eq: "'+tagId+'"}}}';
  }

  var category = "";
  if (cateId){
    category = ', category: {category: {id: {eq: "'+cateId+'"}}}';
  }

  return {
    "query": 
      'query getPosts{viewer {allPosts(where: {type: {eq: "post"}, status: '+status+' '+tag+' '+category+' }) { edges { node { '
      +'id,title,content,slug,author{username},status,meta{edges{node{id,item,value}}},category{edges{node{id,category{id, name}}}},tag{edges{node{tag{id, name}}}},comments{edges{node{id,content,name,email,website}}},file{edges{node{id,value}}}, featuredImage,createdAt}}}}}'
  };
}

const getContentsQry = function(type, s) {
  var status = '{ne: "Trash"}';
  if (s==="Published" || s==="Trash" || s==="Draft" || s==="Reviewing")
    status = '{eq: "'+s+'"}';
  if (s==="Full") {
    status = '{ne: ""}';
  }

  return {
    "query": 
      `query getPosts{viewer {allPosts(where: {type: {eq: "`+type+`"}, status: `+status+`}) { edges { node { 
       id,title,slug,author{username},status,meta{edges{node{id,item,value}}},category{edges{node{category{id, name}}}},
       tag{edges{node{tag{id, name}}}},comments{edges{node{id}}},file{edges{node{id,value}}},featuredImage,createdAt}}}}}`
  };
}

const getAllCategoryQry = function(postType) {
  return{
  "query": `query getCategories{
    viewer {
      allCategories (where: {type: {eq: "`+postType+`"}}) {
        edges {
          node {
            id,
            name,
            description,
            post {
              edges {
                node{
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
}

const getAllTagQry = function( postType) {
  return{
  "query": `query getTags{
    viewer {
      allTags (where: {type: {eq: "`+postType+`"}}) {
        edges {
          node {
            id,
            name,
            post {
              edges {
                node{
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

  const createCategory = function(name, description, type){
  return {
      "query": `
    mutation createCategory($input: CreateCategoryInput!) {
        createCategory(input: $input) {
          changedCategory {
            id,
            name, 
            description,
            type
        }
      }
    }
    `,
      "variables": {
        "input": {
          "name": name,
          "description": description,
          "type" : type
        }
      }
    }
  };

  const updateCategory = function(postId, name, description, type){
  return {
      "query": `
    mutation updateCategory($input: UpdateCategoryInput!) {
        updateCategory(input: $input) {
          changedCategory {
            id,
            name,
            description,
            type
        }
      }
    }
    `,
      "variables": {
        "input": {
          "id": postId,
          "name": name,
          "description": description,
          "type" : type
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

  const createTag = function(name, type){
  return {
      "query": `
    mutation createTag($input: CreateTagInput!) {
        createTag(input: $input) {
          changedTag {
            id,
            name,
            type
        }
      }
    }
    `,
      "variables": {
        "input": {
          "name": name,
          "type" : type
        }
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
    var currentCatIds = _.map(currentCat, x => x[0])
  var deleteList = [] ;
  _.forEach(currentCat, cc => {
    if (_.indexOf(newCat, cc[0]) === -1){
      deleteList.push(cc[1])
    }
  })
 
  var addList = _.difference(newCat, currentCatIds);

  if (deleteList.length===0 && addList.length===0) return null;
  
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
      id: item
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

const createUpdateTagOfPostMtn = function(postId, oldTag, currentTag, tagMap){
  var variables = {};
  var deleteList = _.difference(oldTag, currentTag);
  var addList = _.difference(currentTag, oldTag);

  var deleteListId = _.map(deleteList, function(item){
    return item.connectionId;
  })
  if (deleteListId.length===0 && addList.length===0) return null;

  var query = "mutation (";
  
  var _tempArr = [];
  var index = 0;
  _.forEach(deleteListId, function(item){
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
  _.forEach(deleteListId, function(item){
    query += ' DeleteTagOfPost'+index+' : deleteTagOfPost(input: $input'+index+'){ changedTagOfPost{ id } }'; 
    variables["input"+index] = {
      id: item
    }

    index++;
  });

  _.forEach(addList, function(item){
    query += ' CreateTagOfPost'+index+' : createTagOfPost(input: $input'+index+'){ changedTagOfPost{ id } }'; 
    var _key = "input"+index 
    variables[_key] = {postId: postId,tag: {"name": item.label}}
    if (_.has(tagMap, item.label)) 
      variables[_key] = {postId: postId,tagId: tagMap[item.label].id}

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
     `{getPost(id:"`+postId+`"){ id,title,content,slug,author{username},status,visibility,featuredImage,
      summary,category{edges{node{id, category{id,name}}}},comments{edges{node{id,content,name,email,website}}},file{edges{node{id value}}},
      tag{edges{node{id,tag{id,name}}}},meta{edges{node{id,item,value}}},createdAt}}`
    }
};

const getPost = gql`query ($id: ID!){getPost(id: $id){ id,publishDate,imageFeatured{id, value, blobUrl},title,content,slug,author{username},status,visibility,order,summary,parent,category{edges{node{id, category{id,name}}}},comments{edges{node{id,content,name,email,website}}},file{edges{node{id blobUrl}}},
      tag{edges{node{id,tag{id,name}}}},meta{edges{node{id,item,value}}},createdAt}}`

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

const addImageGallery = function(blob, postId){
  return {
      "query": `mutation CreateFile($input: CreateFileInput!) {
        createFile(input: $input) {
          changedFile {
            id
            type
            value
            blobMimeType
            blobUrl
          }
        }
      }`,
      "variables": {
        input: {
          type: "gallery",
          value: blob,
          postId: postId,
          blobFieldName: "myBlobField"
        }
      },
      "myBlobField": ""
    }
}

const removeImageGallery = function(imageId){
  return {
      "query": `mutation DeleteFile($input: DeleteFileInput!) {
        deleteFile(input: $input) {
          changedFile {
            id
            type
            value
            blobMimeType
            blobUrl
          }
        }
      }`,
      "variables": {
        input: {
          id: imageId
        }
      }
    }
}

const bindImageGallery = function(arr, postId){
  var query = "mutation { ";
  _.forEach(arr, function(val, index){
    query += ' UpdateFile'+index+' : updateFile(input: {id: "'+val.id+'", postId: "'+postId+'"}){ changedFile{ id } }'; 
  });
  query += "}";

  return {
    "query": query
  }
}

const searchPost = (query) => ({
  query:
  `
  query {
    viewer {
      titleQuery: allPosts (where: {title: {like: "%${query}%" }}) {
        edges {
          node {
            id
            title
            content
            slug
            author {username}
            status
            meta {
              edges {
                node {id, item, value}
              }
            }
            category {
              edges {
                node { category { id, name } }
              }
            }
            tag {
              edges {
                node { tag { id, name } }
              }
            }
            comments {
              edges{
                node{id,content,name,email,website}
              }
            }
            file {
              edges {
                node{id,value}
              }
            }
            featuredImage
            createdAt
          }
        }
      }
    contentQuery: allPosts (where: {content: {like: "%${query}%" }}) {
        edges {
          node {
            id
            title
            content
            slug
            author {username}
            status
            meta {
              edges {
                node {id, item, value}
              }
            }
            category {
              edges {
                node { category { id, name } }
              }
            }
            tag {
              edges {
                node { tag { id, name } }
              }
            }
            comments {
              edges{
                node{id,content,name,email,website}
              }
            }
            file {
              edges {
                node{id,value}
              }
            }
            featuredImage
            createdAt
          }
        }
      }
    }
  }
  `
})

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
  updateCategory: updateCategory,
  createTag: createTag,
  UpdateTag: UpdateTag,
  addImageGallery: addImageGallery,
  removeImageGallery: removeImageGallery,
  bindImageGallery: bindImageGallery,
  searchPost: searchPost,
  getPost: getPost,
  updateFeaturedImage: updateFeaturedImage
}

export default queries;
