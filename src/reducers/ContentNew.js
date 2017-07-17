const settings = (state = [], action) => {
  switch (action.type) {
    case 'UPDATE_GENERAL_SETTING':
      return [...state]
    case 'UPDATE_META_SETTING':
      return [...state]
    case 'MASK_AREA':
      return [
        {
          isProcessing: action.isMasked,
          opacity: action.isMasked?0.4:1
        }
      ]
    case 'LOAD_FORM_DATA':
      return [
        {
          data: action.data
        }
      ]
    default:
      return state
  }
}

export default settings
