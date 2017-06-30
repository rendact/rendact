const contentType = (state = [], action) => {
  switch (action.type) {
    case 'UPDATE_STATUS_COUNTER':
      return [
        ...state,
        {
          statusCount: action.count
        }
      ]
    case 'INIT_CONTENT_LIST':
      return [
        ...state,
        {
          monthList: action.monthList, 
          allPostId: action.allPostId
        }
      ]
    case 'TOGGLE_DELETE_MODE':
      return [
        ...state,
        {
          activeStatus: action.status,
          deleteMode: action.state,
        }
      ]
    case 'TOGGLE_SELECTED_ITEM':
      return [
        ...state,
        {
          itemSelected: action.isSelected
        }
      ]
    default:
      return state
  }
}

export default contentType
