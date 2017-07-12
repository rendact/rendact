const permission = (state = [], action) => {
  switch (action.type) {
    case 'MASK_AREA':
      return [
        {
          isProcessing: action.isMasked,
          opacity: action.isMasked?0.4:1
        }
      ]
    case 'SET_OPTION_ID':
      return [
        {
          name: action.optionId
        }
      ]
    default:
      return state
  }
}

export default permission
