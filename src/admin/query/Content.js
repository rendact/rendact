import _ from 'lodash';

let getContentListQry = {
  "query": `query getContentList{
    viewer {
      allContents {
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
            createdAt
          }
        }
      }
    }
  }`
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
          createdAt
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
    tag = '{eq: "'+tagId+'"}';
  }
  else{
    tag = '{ne: ""}';
  }

  var category = "";
  if (cateId){
    category = '{eq: "'+cateId+'"}';
  }
  else{
    category = '{ne: ""}';
  }

  return {
    "query": 
      'query getPosts{viewer {allPosts(where: {type: {eq: "'+postType+'"}, status: '+status+', tag: {tag: {id: '+tag+'}}, category: {category: {id: '+category+'}} }) { edges { node { '
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