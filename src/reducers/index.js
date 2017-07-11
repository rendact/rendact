import { combineReducers } from 'redux'
import settings from './Settings'
import contentType from './ContentType'
import contentTypeNew from './ContentTypeNew'
import categoryContent from './CategoryContent'

const main = (state = [], action) => {
  switch (action.type) {
    case 'LOGGED':
      return [
        ...state,
        {
          logged: action.isLogged, pathname: action.pathname?action.pathname:null
        }
      ]
    default:
      return state
  }
}


const rendactApp = combineReducers({
	main,
  settings,
  contentType,
  contentTypeNew,
  categoryContent
})

export default rendactApp
