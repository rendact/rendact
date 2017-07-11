const content = (state = [], action) => {
  switch (action.type) {
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

export default content
