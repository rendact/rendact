import _ from 'lodash';

const menu = (state = [], action) => {
  switch (action.type) {
    case 'SET_RESET_DELETE':
      return [
        {
          newMenuName: "",
          selectedMenuName: "",
          treeData: [],
          allSelectState : {
            page: false,
            category: false,
            post: false
          }
        }
      ]
    case 'MASK_AREA':
      return state.map(item =>  ({...item, isProcessing: action.isMasked, opacity: action.isMasked?0.4:1}))

    case 'SET_LOAD_MENU':
      return state.map(item =>  ({...item, treeData: action.treeData, position: action.position}))
      
    case 'SET_HANDLE_MENU_NAME':
      return state.map(item =>  ({...item, menuId: action.menuId, treeData: action.treeData}))
      
    case 'SET_TREE_DATA':
      return state.map(item =>  ({...item, treeData: action.treeData}))

    case 'SET_NEW_MENU_NAME':
      return state.map(item =>  ({...item, newMenuName: action.newMenuName}))
      
    case 'SET_SELECTED_MENU_NAME':
      return state.map(item =>  ({...item, selectedMenuName: action.selectedMenuName}))
    
    case 'SET_NEW_MENU_ID':
      return state.map(item =>  ({...item, newMenuId: action.newMenuId}))

    case 'SET_ID_MAIN_MENU':
      return state.map(item =>  ({...item, IdMainMenu: action.IdMainMenu}))

    case 'SET_PAGE_LIST_MENU':
      return state.map(item =>  ({...item, pageList: action.pageList}))

    case 'SET_MENU_ID':
      return state.map(item =>  ({...item, menuId: action.menuId}))
      
    case 'SET_ALL_PAGE_LIST':
      return state.map(item =>  ({...item, allPageList: action.allPageList}))

    case 'SET_ALL_POST_LIST':
      return state.map(item =>  ({...item, allPostList: action.allPostList}))

    case 'SET_CATEGORY_LIST':
      return state.map(item =>  ({...item, categoryList: action.categoryList}))

    case 'SET_MENU_STRUCTURE':
      return state.map(item =>  ({...item, menuStructure: action.menuStructure}))

    case 'SET_DISABLED':
      return state.map(item =>  ({...item, disabled: action.disabled}))

    case 'TOGGLE_SELECTED_ITEM':
      return state.map(item =>  ({...item, itemSelected: action.isSelected}))
      
    case 'SET_EDITOR_MODE':
      return state.map(item =>  ({...item, mode: action.mode}))

    case 'LOAD_MENU_SELECT':
      return state.map(item =>  ({...item, menuSelect: action.menuSelect}))

    case 'SET_PREV_STATE':
      return state.map(item =>  ({...item, prevState: action.prevState}))

    case 'SET_URL_MENU':
      return state.map(item =>  ({...item, url: action.url}))

    case 'SET_POSITION':
      return state.map(item =>  ({...item, position: action.position}))

    case 'ASSIGN_VALUE_TO_MENU_ITEM':
      return state.map(item=> {
        let treeData = [...item.treeData]

        const assignHelper = (items) => {

          _.forEach(items, item => {
            if (item.id === action.menuId) {
              item[action.name] = action.value
              return
            }
            if (item.children && item.children.length) {
              assignHelper(item.children);
              return
            }

          })
        }

        assignHelper(treeData);


        return {...item, treeData: treeData}
      });

    case 'TOGGLE_SELECT_ALL':
      if (action.listType === 'all') {
        return state.map(item => ({...item, allSelectState:{page: action.state, post: action.state, category: action.state} }))
      } 
       
        return state.map(item => {
          let allSelectState = _.clone(item.allSelectState);
          _.set(allSelectState, action.listType, action.state)

          return {...item, allSelectState}
        });
      
    default:
      return state
  }
}

export default menu
