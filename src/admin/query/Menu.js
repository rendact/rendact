import _ from 'lodash';

const createMenu = function(name){
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
          "name": name
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
            name
          }
        }
      }
    }
  }`

}

const queries = {
  createMenu: createMenu,
  getAllMenu: getAllMenu,
}

module.exports = queries;