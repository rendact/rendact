import _ from 'lodash';
import gql from 'graphql-tag';

const createMenu = gql`
  mutation createMenu($input: CreateMenuInput!) {
      createMenu(input: $input) {
        changedMenu{
          id,
          name
      }
    }
  }
  `

const getAllMenu = {
  "query": `query getMenus{
    viewer {
      allMenus {
        edges {
          node {
            id,
            name,
            items
          }
        }
      }
    }
  }`
}

const getMenuQry = function(menuId) {
  return{"query": 
    `{getMenu(id: "`+menuId+`"){items, id, name, position}}`
    }
};

const getAllCategory = {
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

const getAllPage = {
  "query":
    '{viewer {allPosts(where:  {status: {eq: "Published"}, type:{eq: "page"}} ) { edges { node { id,title}}}}}'
}

const getAllPost = {
  "query": 
    '{viewer {allPosts(where:  {status: {eq: "Published"}, type:{eq: "post"}} ) { edges { node { id,title}}}}}'
}

const deleteMenu = gql`
  mutation DeleteMenu($user: DeleteMenuInput!) {
    deleteMenu(input: $user) {
      changedMenu {
        id
      }
    }
  }
`
/*
"variables": {
  "user": {
    "id": idList
  }
}
*/
const updateMenu = gql`
  mutation UpdateMenu($input: UpdateMenuInput!) {
      updateMenu(input: $input) {
        changedMenu{
          id,
          name,
          items,
          position
      }
    }
  }
  `

const updateMainMenu = function(IdMainMenu){
return {
    "query": `
  mutation UpdateMenu($input: UpdateMenuInput!) {
      updateMenu(input: $input) {
        changedMenu{
          id,
          position
      }
    }
  }
  `,
    "variables": {
      "input": {
        "id": IdMainMenu,
        "position": ""
      }
    }
  }
};

const getMainMenu = {
  "query": 
    `query getMenus{
      viewer {
        allMenus(where: {position: {eq: "Main Menu"}}) { 
          edges {
            node { 
              id,
              name, 
              items
              }
            }
          }
        }
    }`
}

const loadAllMenuData = gql`
query{
  viewer {
    mainMenu:allMenus(where: {position :{eq: "Main Menu"}}){
      edges {
        node {
          id
          name
          items
          position
        }
      }
    }
    
    allMenu:allMenus{
      edges {
        node {
          id
          name
          items
          position
        }
      }
    }
    
    allPage:allPosts(where: {type: {eq : "page"}, status: {eq: "Published"}}){
      edges {
        node {
          id
          title
        }
      }
    }
    allPost:allPosts(where: {type: {eq : "post"}, status: {eq: "Published"}}){
      edges {
        node {
          id
          title
        }
      }
    }
    
    allCategory:allCategories {
      edges {
        node {
          id
          name
        }
      }
    }
  }  
}
`

const updateMenuWithPos = gql`
mutation ($updateMenuInput:UpdateMenuInput!, $positionInput:UpdateMenuInput!){
  positionUpdate: updateMenu(input: $positionInput){
    changedMenu {
      id
    }
  }
  
  updateMenu: updateMenu(input: $updateMenuInput){
    changedMenu {
      id
      name
      items
      position
    }
  }
}
`

const queries = {
  createMenu: createMenu,
  getAllMenu: getAllMenu,
  deleteMenu: deleteMenu,
  updateMenu: updateMenu,
  updateMainMenu: updateMainMenu,
  getAllPage: getAllPage,
  getAllPost: getAllPost,
  getAllCategory: getAllCategory,
  getMenuQry: getMenuQry,
  getMainMenu: getMainMenu,
  loadAllMenuData: loadAllMenuData,
  updateMenuWithPos: updateMenuWithPos
}

export default queries;
