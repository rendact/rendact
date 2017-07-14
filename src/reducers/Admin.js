const admin = (state = [], action) => {
  switch (action.type) {
    case 'MASK_AREA':
      return [
        ...state,
        {
          isProcessing: action.isMasked,
          opacity: action.isMasked?0.4:1
        }
      ]
    case 'TOGGLE_CONFIG_LOAD':
      return [
        ...state,
        {
          configLoaded: action.state,
        }
      ]
    case 'TOGGLE_CONTROL_SIDEBAR':
      return [
        ...state,
        {
          showCtrlSidebar: action.state
        }
      ]
    case 'TOGGLE_UNSAVED_DATA':
      return [
        ...state,
        {
          hasUnsavedData: action.state
        }
      ]
    case 'SET_ACTIVE_PAGE':
      return [
        ...state,
        {
          page: action.pageId,
          action: action.actionId,
          postId: action.postId
        }
      ]
    default:
      return state
  }
}

export default admin
