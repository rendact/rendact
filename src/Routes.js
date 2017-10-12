import loadable from 'loadable-components'

export const Admin = loadable(() => import(/* webpackChunkName: "admin"*/'./admin'))
export const ThemeSingle = loadable(() =>   import(/* webpackChunkName: "ThemeSingle"*/ './includes/Theme/ThemeSingle'))
export const ThemeBlog = loadable(() =>   import(/* webpackChunkName: "ThemeBlog"*/ './includes/Theme/ThemeBlog'))
export const ThemeSearch = loadable(() =>   import(/* webpackChunkName: "Themesearch"*/ './includes/themeSearch'))
export const Register = loadable(() =>   import(/* webpackChunkName: "register"*/ './register'))
export const Login = loadable(() =>   import(/* webpackChunkName: "login"*/ './login'))
export const ThemeHome = loadable(() =>  import(/* webpackChunkName: "themehome" */'./includes/Theme/ThemeHome'))

