
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

const queries = {
  getContentListQry: getContentListQry
}

module.exports = queries;