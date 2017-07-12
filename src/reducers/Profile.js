const profile = (state = [], action) => {
  switch (action.type) {
    case 'MASK_AREA':
      return [
        {
          isProcessing: action.isMasked,
          opacity: action.isMasked?0.4:1
        }
      ]
    case 'SET_DATEBIRTH_TIMEZONE':
      return [
        {
          dateOfBirth: action.dateOfBirth,
          timezone: action.timeZone
        }
      ]
    case 'SET_AVATAR':
      return [
        {
          avatar: action.avatar
        }
      ]
    default:
      return state
  }
}

export default profile
