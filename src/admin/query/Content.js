import _ from 'lodash';

const getContentListQry = function(status){
  var statusFilter = "";
  if (status) {
    statusFilter = '(where: {status: {eq: "'+status+'"}})'
  }
  return {
    "query": `query getContentList{
      viewer {
        allContents `+statusFilter+` {
          edges {
            node {
              id,
              name,
              slug,
              description,
              menuIcon,
              fields,
              customFields,
              label,
              labelSingular,
              labelAddNew,
              labelEdit,
              createdAt,
              status
            }
          }
        }
      }
    }`
  }
}

const createContentMtn = function(data){
  return {
      "query": `
    mutation createContent($input: CreateContentInput!) {
        createContent(input: $input) {
          changedContent {
            id,
            name,
            slug,
            fields,
            createdAt
        }
      }
    }
    `,
      "variables": {
        "input": data
      }
    }
  };

  const updateContentMtn = function(data){
  return {
      "query": `
    mutation updateContent($input: UpdateContentInput!) {
        updateContent(input: $input) {
          changedContent {
            id,
            name,
            slug,
            fields,
            createdAt
        }
      }
    }
    `,
      "variables": {
        "input": data
      }
    }
  };

const getContentQry = function(contentId){
  return {"query": 
      `{
        getContent(id:"`+contentId+`"){ 
          id,
          name,
          slug,
          description,
          menuIcon,
          fields,
          customFields,
          label,
          labelSingular,
          labelAddNew,
          labelEdit,
          createdAt,
          status
        }
      }`
  };
}

const getContentPostListQry = function(s, postType, tagId, cateId) {
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
      'query getPosts{viewer {allPosts(where: {type: {eq: "'+postType+'"}, status: '+status+' '+tag+' '+category+' }) { edges { node { '
     +'id,title,slug,author{username},status,meta{edges{node{id,item,value}}},category{edges{node{category{id, name}}}},tag{edges{node{tag{id, name}}}},comments{edges{node{id}}},featuredImage,createdAt}}}}}'
  };
}

const checkContentSlugQry = function(slug){
  return {
    query: 'query checkContentSlug{ viewer { allContents(where: {slug: {like: "'+slug+'"}}) { edges { node { id } } } } }'
  }
}

const deleteContentQry = function(idList){
  var query = "mutation { ";
  _.forEach(idList, function(val, index){
    query += ' DeleteContent'+index+' : deleteContent(input: {id: "'+val+'"}){ changedContent{ id } }'; 
  });
  query += "}";

  return {
    "query": query
  }
};


const queries = {
  getContentListQry: getContentListQry,
  createContentMtn: createContentMtn,
  getContentQry: getContentQry,
  getContentPostListQry: getContentPostListQry,
  checkContentSlugQry: checkContentSlugQry,
  deleteContentQry: deleteContentQry,
  updateContentMtn: updateContentMtn
}

module.exports = queries;