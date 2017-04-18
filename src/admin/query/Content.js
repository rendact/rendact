
let getContentListQry = {
  "query": `query getContentList{
    viewer {
      allContents {
        edges {
          node {
            id,
            name,
            slug,
            fields,
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

const getContentQry = function(contentId){
  return {"query": 
      `{
        getContent(id:"`+contentId+`"){ 
          id,
          name,
          slug,
          fields,
          createdAt
        }
      }`
  };
}

const getContentPostListQry = function(s, postType) {
  var status = '{ne: "Deleted"}';
  if (s==="Deleted" || s==="Draft" || s==="Pending Review")
    status = '{eq: "'+s+'"}';

  return {
    "query": 
      'query getPosts{viewer {allPosts(where: {type: {eq: "'+postType+'"}, status: '+status+'}) { edges { node { '
     +'id,title,slug,author{username},status,meta{edges{node{id,item,value}}},category{edges{node{category{id, name}}}},tag{edges{node{tag{id, name}}}},comments{edges{node{id}}},featuredImage,createdAt}}}}}'
  };
}

const queries = {
  getContentListQry: getContentListQry,
  createContentMtn: createContentMtn,
  getContentQry: getContentQry,
  getContentPostListQry: getContentPostListQry
}

module.exports = queries;