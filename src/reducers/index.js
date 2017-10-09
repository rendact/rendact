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
import {themeHome, themeSingle, themeBlog } from './Theme'
import userNew from './UserNew';

const INITIAL_STATE = {
  referrer: '/admin/dashboard',
  logged: localStorage.getItem('token') ? true : false,
}

const main = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'LOGGED':
      return { ...state, logged: action.isLogged, referrer: action.pathname?action.pathname:state.referrer}
    case 'SET_REFERRER':
      return {...state, referrer: action.referrer}
    default:
      return state
  }
}


const rendactApp = combineReducers({
  form: reduxFormReducer,
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
  listOfWidgets,
  themeHome,
  themeSingle,
  themeBlog,
  userNew
})

export default rendactApp
