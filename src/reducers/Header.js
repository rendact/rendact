const INITIAL_VALUES =  [{
      ControlSidebar: false,
    }]

const header = (state = INITIAL_VALUES, action) => {
  switch (action.type) {
    
    case 'CONTROL_SIDEBAR':
      return state.map(item =>  ({...item, ControlSidebar: action.ControlSidebar}))
        
    default:
      return state
  }
}

export default header
