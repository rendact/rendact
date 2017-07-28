import _ from 'lodash';

const createMenu = function(newMenuName){
  return {
      "query": `
    mutation createMenu($input: CreateMenuInput!) {
        createMenu(input: $input) {
          changedMenu{
            id,
            name
        }
      }
    }
    `,
      "variables": {
        "input": {
          "name": newMenuName
        }
      }
    }
  };

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
      'query getPages{viewer {allPosts(where: {type: {eq: "page"}}) { edges { node { id,title}}}}}'
}

const getAllPost = {
  "query": 
      'query getPages{viewer {allPosts(where: {type: {eq: "post"}}) { edges { node { id,title}}}}}'
}

const deleteMenuQry = function(idList) {
  return{
  "query": `
    mutation DeleteMenu($user: DeleteMenuInput!) {
      deleteMenu(input: $user) {
        changedMenu {
          id
        }
      }
    }
  `,
  "variables": {
    "user": {
      "id": idList
    }
  }
  }
};

const updateMenu = function(menuId, name, menuSortableTree, positionValues){
  return {
      "query": `
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
    `,
      "variables": {
        "input": {
          "id": menuId,
          "name": name,
          "items": menuSortableTree,
          "position": positionValues
        }
      }
    }
  };

const queries = {
  createMenu: createMenu,
  getAllMenu: getAllMenu,
  deleteMenuQry: deleteMenuQry,
  updateMenu: updateMenu,
  getAllPage: getAllPage,
  getAllPost: getAllPost,
  getAllCategory: getAllCategory,
  getMenuQry: getMenuQry
}

export default queries;