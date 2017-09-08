const initial = {
  isProcessing: false,
  opacity: 1
}

const maskArea = (state = initial, action) => {
  switch(action.type){
    case 'MASK_AREA':
      return {
        isProcessing: action.isMasked, 
        opacity: action.isMasked ? 0.4 : 1
      }

    default:
      return state
  }
}

export default maskArea;
