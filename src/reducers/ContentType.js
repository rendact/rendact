const contentType = (state = [], action) => {
  switch (action.type) {
    case 'UPDATE_STATUS_COUNTER':
      return [
        {
          statusCount: action.count
        }
      ]
    case 'INIT_CONTENT_LIST':
      return [
        {
          monthList: action.monthList, 
          allPostId: action.allPostId
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
    default:
      return state
  }
}

export default contentType
