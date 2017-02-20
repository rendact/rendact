import $ from 'jquery';
window.jQuery = $;

const getPageListQry = {"query": `
  query getPages{
  viewer {
    allPosts(where: {type: {eq: "page"}, deleteDate: {isNull: true}}) {
      edges {
        node {
          id
          title,
          slug,
          author {
            username
          },
          status,
          comments{
            edges{
              node{
                id
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

  const getPageDelQry = {"query": `
      query getPages{
        viewer {
          allPosts(where: {type: {eq: "page"}, deleteDate: {isNull: false}}) {
            edges {
              node {
                id
                title,
                slug,
                author {
                  username
                },
                status,
                comments{
                  edges{
                    node{
                      id
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
      
const getCreatePostQry = function(title, content, titleTag, draft, visibility, passwordPage, 
  publishDate, userId, slug, parentPage, pageOrder, type){
  return {
      "query": `
    mutation createPost($input: CreatePostInput!) {
        createPost(input: $input) {
          changedPost {
            title,
            content,
            titleTag
        }
      }
    }
    `,
      "variables": {
        "input": {
          "title": title,
          "content": content,
          "titleTag": titleTag,
          "status": draft,
          "visibility": visibility,
          "passwordPage": passwordPage,
          "publishDate": publishDate,
          "type": type,
          "authorId": userId,
          "slug": slug,
          "parent": parentPage,
          "order": pageOrder
        }
      }
    }
  };

const getUpdatePostQry = function(id, title, content, titleTag, draft, visibility, passwordPage, 
  publishDate, userId, slug, parentPage, pageOrder, type){
  return {
      "query": `
    mutation updatePost($input: UpdatePostInput!) {
        updatePost(input: $input) {
          changedPost {
            title,
            content,
            titleTag
        }
      }
    }
    `,
      "variables": {
        "input": {
          "id": id,
          "title": title,
          "content": content,
          "titleTag": titleTag,
          "status": draft,
          "visibility": visibility,
          "passwordPage": passwordPage,
          "publishDate": publishDate,
          "type": type,
          "authorId": userId,
          "slug": slug,
          "parent": parentPage,
          "order": pageOrder
        }
      }
    }
  };

const getCreatePostMetaQry = function(metaKeyword, metaDescription, summary){
  return {
      "query": `
        mutation createPostMeta($input: CreatePostMetaInput!) {
          createPostMeta(input: $input) {
            changedPostMeta {
              metaKeyword,
              metaDescription,
              summary
            }
          }
        }
    `,
      "variables": {
        "input": {
          "metaKeyword": metaKeyword,
          "metaDescription": metaDescription,
          "summary": summary
        }
      }
    }
  };

const getPageQry = function(postId){
  return {"query": 
      '{getPost(id:"'+postId+'"){ id,title,content,slug,author{username},status,comments{edges{node{id}}},createdAt}}'
    }
  };

const deletePostQry = function(idList){
  var query = "mutation { ";
  $.each(idList, function(key, val){
    query += ' DeletePost'+key+': updatePost(input: {id: "'+val+'", deleteDate: "'+new Date()+'"}){ changedPost{ id } }'; 
  });
  query += "}";

  return {
    "query": query
  }
};

const queries = {
  getPageListQry: getPageListQry,
  getPageDelQry: getPageDelQry,
  getCreatePostQry: getCreatePostQry,
  getUpdatePostQry: getUpdatePostQry,
  getCreatePostMetaQry: getCreatePostMetaQry,
  getPageQry: getPageQry,
  deletePostQry: deletePostQry
}

module.exports = queries;