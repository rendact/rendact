// import _ from 'lodash';

// const INITIAL_VALUES =  {
//       isProcessing: false,
//       opacity: 1,
//       name:"",
//       slug:"",
//       postId:"",
//       tagId:"",
//       monthList: [],
//       deleteMode: false,
//       statusList: ["All", "Published", "Draft", "Pending Review", "Deleted"],
//       dynamicStateBtnList: ["deleteBtn", "recoverBtn", "deletePermanentBtn"],
//       activeStatus: "All",
//       itemSelected: false,
//       mode: "create",
//     }

// const tagContent = (state = INITIAL_VALUES, action) => {

const tagContent = (state = [], action) => {
  switch (action.type) {
    case 'INIT_CONTENT_LIST':
      return [
        {
          monthList: action.monthList
        }
      ]
    case 'TOGGLE_DELETE_MODE':
      return [
        {
          activeStatus: action.status,
          deleteMode: action.state,
        }
      ]
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
        {
          mode: action.mode
        }
      ]
    // case 'SET_ID':
    //   return [
    //     {
    //       postId: action.postId
    //     }
    //   ]
    case 'SET_ID':
      return state.map(item =>  ({...item, postId: action.postId}))
    
    // case 'SET_NAME_VALUE':
    //   return [
    //     {
    //       name: action.name
    //     }
    //   ]
    case 'SET_NAME_VALUE':
      return state.map(item =>  ({...item, name: action.name}))
    
    case 'SET_MODE_NAME_ID':
      return state.map(item =>  ({...item,mode: action.mode, name: action.name, postId: action.postId}))
    
    
    default:
      return state
  }
}

export default tagContent
