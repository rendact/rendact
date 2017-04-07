
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


const queries = {
  getContentListQry: getContentListQry,
  createContentMtn: createContentMtn,
  getContentQry: getContentQry
}

module.exports = queries;