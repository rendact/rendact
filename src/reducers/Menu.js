import _ from 'lodash';

const menu = (state = [], action) => {
  console.log(action.type)
  switch (action.type) {
    case 'SET_RESET_DELETE':
      return [
        {
          newMenuName: "",
          selectedMenuName: "",
          treeData: []
        }
      ]
    case 'SET_LOAD_MENU':
      return [
        {
          treeData: action.treeData,
          position: action.position,
        }
      ]
    case 'SET_HANDLE_MENU_NAME':
      return [
        {
          menuId: action.menuId,
          treeData: action.treeData
        }
      ]
    /*case 'SET_TREE_DATA':
      return [
        {
          treeData: action.treeData
        }
      ]*/
    case 'SET_TREE_DATA':
      return state.map(item =>  ({...item, treeData: action.treeData}))

    case 'SET_NEW_MENU_NAME':
      return [
        {
          newMenuName: action.newMenuName
        }
      ]
    case 'SET_SELECTED_MENU_NAME':
      return [
        {
          selectedMenuName: action.selectedMenuName
        }
      ]
    /*case 'SET_NEW_MENU_ID':
      return [
        {
          newMenuId: action.newMenuId
        }
      ]*/
    case 'SET_NEW_MENU_ID':
      return state.map(item =>  ({...item, newMenuId: action.newMenuId}))

    /*case 'SET_ID_MAIN_MENU':
      return [
        {
          IdMainMenu: action.IdMainMenu
        }
      ]*/
    case 'SET_ID_MAIN_MENU':
      return state.map(item =>  ({...item, IdMainMenu: action.IdMainMenu}))

    /*case 'SET_POSITION':
      return [
        {
          position: action.position
        }
      ]*/
    case 'SET_POSITION':
      return state.map(item =>  ({...item, position: action.position}))

    case 'SET_PAGE_LIST_MENU':
      return state.map(item =>  ({...item, pageList: action.pageList}))

    case 'SET_MENU_ID':
      return [
        {
          menuId: action.menuId
        }
      ]
    case 'SET_ALL_PAGE_LIST':
      return state.map(item =>  ({...item, allPageList: action.allPageList}))

    case 'SET_ALL_POST_LIST':
      return state.map(item =>  ({...item, allPostList: action.allPostList}))

    case 'SET_CATEGORY_LIST':
      return state.map(item =>  ({...item, categoryList: action.categoryList}))

    /*case 'SET_DISABLED':
      return [
        {
          disabled: action.disabled
        }
      ]*/
    case 'SET_DISABLED':
      return state.map(item =>  ({...item, disabled: action.disabled}))

    case 'TOGGLE_SELECTED_ITEM':
      return [
        {
          itemSelected: action.isSelected
        }
      ]
    case 'MASK_AREA':
      return [
        {
          isProcessing: action.isMasked,
          opacity: action.isMasked?0.4:1
        }
      ]
    case 'SET_EDITOR_MODE':
      return [
        ...state,
        {
          mode: action.mode
        }
      ]
    default:
      return state
  }
}

export default menu
