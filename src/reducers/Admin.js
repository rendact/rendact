const admin = (state = [], action) => {
  switch (action.type) {
    case 'MASK_AREA':
      return [
        {
          isProcessing: action.isMasked,
          opacity: action.isMasked?0.4:1
        }
      ]
    case 'TOGGLE_CONFIG_LOAD':
      return [
        {
          configLoaded: action.state,
        }
      ]
    case 'TOGGLE_CONTROL_SIDEBAR':
      return [
        {
          showCtrlSidebar: action.state
        }
      ]
    case 'TOGGLE_UNSAVED_DATA':
      return [
        {
          hasUnsavedData: action.state
        }
      ]
    case 'SET_ACTIVE_PAGE':
      return [
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
