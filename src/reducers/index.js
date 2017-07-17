import { combineReducers } from 'redux'
import { reducer as reduxFormReducer } from 'redux-form';
import settings from './Settings'
import contentType from './ContentType'
import contentTypeNew from './ContentTypeNew'
import categoryContent from './CategoryContent'
import tagContent from './TagContent'
import content from './Content'
import permission from './Permission'
import customize from './Customize'
import profile from './Profile'
import admin from './Admin'

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
  form: reduxFormReducer,
	main,
  settings,
  contentType,
  contentTypeNew,
  categoryContent,
  tagContent,
  content,
  permission,
  customize,
  profile,
  admin
})

export default rendactApp
