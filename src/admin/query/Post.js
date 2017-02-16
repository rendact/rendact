const getPostListQry = {"query": `
  query getPosts{
  viewer {
    allPosts(where: {type: {eq: "post"}}) {
      edges {
        node{
        id
        title,
        author{
          username
        },
        status,
        categories{
          edges{
            node{
              name
            }
          }
        },
        createdAt
      }
      }
    }
  }
  } 
`};

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

const queries = {
  getPostListQry: getPostListQry,
  getAllCategoryQry: getAllCategoryQry
}

module.exports = queries;