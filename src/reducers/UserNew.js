const userNew = (state = {}, action) => {
  switch (action.type) {
    case 'MASK_AREA':
      return {
          isProcessing: action.isMasked,
          opacity: action.isMasked?0.4:1
        }
      

    case 'RESET_FORM':
      return {
        passwordActive: false,
        mode: "create",
        timezone: "",
        country: "",
        dateOfBirth: ""
      }

    case 'SET_TIMEZONE':
      return {...state, timezone: action.timezone}

    case 'SET_PASSWORD_ACTIVE':
      return {...state, passwordActive: action.state}

    case 'SET_PASSWORD':
      return {...state, password: action.password}

    case 'SET_DATE_BIRTH':
      return {...state, dateOfBirth: action.date}
    
    case 'SET_AVATAR':
      return {...state, avatar: action.avatar}

    case 'IS_CHECKING_USERNAME':
      return {...state, checkingUsername: action.state}

    case 'IS_CHECKING_EMAIL':
      return {...state, checkingMail: action.state}

    default:
      return state
  }
}

export default userNew
