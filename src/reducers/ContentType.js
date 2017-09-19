const INITIAL_VALUES =  [{
      isProcessing: false,
      opacity: 1,
      statusCount: {},
      dynamicStateBtnList: ["deleteBtn", "recoverBtn", "deletePermanentBtn"],
      replaceStatusWithRole: false
    }]

const contentType = (state = INITIAL_VALUES, action) => {
  console.log(action.type)
  switch (action.type) {

    case 'UPDATE_STATUS_COUNTER':
      return state.map(item =>  ({...item, statusCount: action.count}))

    case 'INIT_CONTENT_LIST':
      return state.map(item =>  ({...item, monthList: action.monthList, allPostId: action.allPostId}))
    
    case 'SET_LOAD_DATA':
      return state.map(item =>  ({...item, _dataArr: action._dataArr, bEdit: action.bEdit}))

    case 'TOGGLE_DELETE_MODE':
      return state.map(item =>  ({...item, activeStatus: action.status, deleteMode: action.state}))

    case 'TOGGLE_SELECTED_ITEM':
      return state.map(item =>  ({...item, itemSelected: action.isSelected}))

    case 'MASK_AREA':
      if (state)
        return state.map(item =>  ({...item, isProcessing: action.isMasked, opacity: action.isMasked?0.4:1}))
      else
        return [
          {
            isProcessing: action.isMasked,
            opacity: action.isMasked?0.4:1
          }
        ]
    default:
      return state
  }
}

export default contentType
