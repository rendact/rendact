import { combineReducers } from 'redux'
import { reducer as reduxFormReducer } from 'redux-form';
import settings from './Settings'
import contentType from './ContentType'
import contentTypeNew from './ContentTypeNew'
import categoryContent from './CategoryContent'
import tagContent from './TagContent'
import content from './Content'
import contentNew from './ContentNew'
import permission from './Permission'
import customize from './Customize'
import profile from './Profile'
import admin from './Admin'
import menu from './Menu'
import widgets from './Widgets';
import search from './Search';
import maskArea from './MaskArea';
import listOfWidgets from './ListOfWidgets';
import clientGraphql from '../apollo'

const main = (state = [], action) => {
  switch (action.type) {
    case 'LOGGED':
      return { ...state, logged: action.isLogged, pathname: action.pathname?action.pathname:null}
    case 'SET_CHECK_AUTH_DONE':
      return { ...state, checkAuthDone: action.state }
    default:
      return state
  }
}


const rendactApp = combineReducers({
  form: reduxFormReducer,
  apollo: clientGraphql.reducer(),
	main,
  settings,
  contentNew,
  contentType,
  contentTypeNew,
  categoryContent,
  tagContent,
  content,
  permission,
  customize,
  profile,
  admin,
  menu,
  widgets,
  maskArea,
  search,
  listOfWidgets
})

export default rendactApp
