const userNew = (state = [], action) => {
  switch (action.type) {
    case 'MASK_AREA':
      return [
        {
          isProcessing: action.isMasked,
          opacity: action.isMasked?0.4:1
        }
      ]

    case 'RESET_FORM':
      return {
        passwordActive: false,
        mode: "create",
        timezone: "",
        country: "",
        dateOfBirth: ""
      }

    case 'SET_TIMEZONE':
      return state.map(item =>  ({...item, timezone: action.timezone}))

    case 'SET_PASSWORD_ACTIVE':
      return state.map(item =>  ({...item, passwordActive: action.state}))

    case 'SET_DATE_BIRTH':
      return state.map(item =>  ({...item, dateOfBirth: action.date}))
    
    case 'SET_AVATAR':
      return state.map(item =>  ({...item, avatar: action.avatar}))

    case 'IS_CHECKING_USERNAME':
      return state.map(item =>  ({...item, checkingUsername: action.state}))

    case 'IS_CHECKING_EMAIL':
      return state.map(item =>  ({...item, checkingMail: action.state}))

    default:
      return state
  }
}

export default userNew
