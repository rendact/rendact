const settings = (state = [], action) => {
  switch (action.type) {
    case 'UPDATE_GENERAL_SETTING':
      return [...state]
    case 'UPDATE_META_SETTING':
      return [...state]
    case 'MASK_AREA':
      return [
        ...state,
        {
          isProcessing: action.isMasked, opacity: action.isMasked?0.4:1
        }
      ]
    default:
      return state
  }
}

export default settings
