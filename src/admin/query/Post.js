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
        category{
          edges{
            node{
              category {
                id
                name
              }
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

const getCreatePostQry = function(title, content, draft, visibility, passwordPage, 
  publishDate, userId, slug, summary){
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
            category {
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
          "type": "page",
          "authorId": userId,
          "slug": slug,
          "summary": summary
        }
      }
    }
  };

const getUpdatePostQry = function(id, title, content, draft, visibility, passwordPage, 
  publishDate, userId, slug, summary){
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
                }
              }
            }
            category {
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
          "summary": summary
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

const getPostQry = function(postId){
  return {"query": 
      '{getPost(id:"'+postId+'"){ id,title,content,slug,author{username},status,visibility,'
      +'summary,category{edges{node{category{id,name}}}}comments{edges{node{id}}},meta{edges{node{item,value}'
      +'}}createdAt}}'
    }
  };



const queries = {
  getPostListQry: getPostListQry,
  getAllCategoryQry: getAllCategoryQry,
  getPostQry: getPostQry,
  getCreatePostQry: getCreatePostQry,
  getUpdatePostQry: getUpdatePostQry,
  getCreateCategoryOfPostQry: getCreateCategoryOfPostQry,
  getUpdateCategoryOfPostQry, getUpdateCategoryOfPostQry
}

module.exports = queries;