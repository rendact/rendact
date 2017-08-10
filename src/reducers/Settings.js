const settings = (state = [], action) => {
  switch (action.type) {
    case 'MASK_AREA':
      return [
        {
          isProcessing: action.isMasked,
          opacity: action.isMasked?0.4:1
        }
      ]
    case 'LOAD_FORM_DATA':
      return state.map(item =>  ({...item, data: action.data}))
    default:
      return state
  }
}

export default settings
