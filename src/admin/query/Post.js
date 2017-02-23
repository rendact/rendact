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
          "type": "page",
          "authorId": userId,
          "slug": slug,
          "summary": summary,
          "category": category
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
          "summary": summary,
          "category": category
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

  const checkSlugQry = function(slug){
  return {
    query: 'query checkSlug{ viewer { allPosts(where: {type: {eq: "page"}, slug: {like: "'+slug+'"}}) { edges { node { id } } } } }'
  }
}


const queries = {
  getPostListQry: getPostListQry,
  getAllCategoryQry: getAllCategoryQry,
  getPostQry: getPostQry,
  getCreatePostQry: getCreatePostQry,
  getUpdatePostQry: getUpdatePostQry,
  checkSlugQry: checkSlugQry
}

module.exports = queries;