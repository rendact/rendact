import Loadable from 'react-loadable';

export const Admin = Loadable({
  loader: () => import(/* webpackChunkName: "admin"*/'./admin'),
  loading: () => null
})
export const ThemeSingle = Loadable({
  loader: () =>   import(/* webpackChunkName: "ThemeSingle"*/ './includes/Theme/ThemeSingle'),
  loading: () => null
})
export const ThemeBlog = Loadable({
  loader: () =>   import(/* webpackChunkName: "ThemeBlog"*/ './includes/Theme/ThemeBlog'),
  loading: () => null
})
export const ThemeSearch = Loadable({
  loader: () =>   import(/* webpackChunkName: "Themesearch"*/ './includes/themeSearch'),
  loading: () => null
})
export const Register = Loadable({
  loader: () =>   import(/* webpackChunkName: "register"*/ './register'),
  loading: () => null
})
export const Login = Loadable({
  loader: () =>   import(/* webpackChunkName: "login"*/ './login'),
  loading: () => null
})
export const ThemeHome = Loadable({
  loader: () =>  import(/* webpackChunkName: "themehome" */'./includes/Theme/ThemeHome'),
  loading: () => null
})

export const preload = () => {
    Admin.preload()
    ThemeSingle.preload()
    ThemeBlog.preload()
    ThemeSearch.preload()
    Register.preload()
    Login.preload()
    ThemeHome.preload()
}
