import React from 'react';

import AdminLoading from './AdminLoading';
import {hasRole} from '../utils/hasRole'
import {getConfig} from '../utils/getConfig'

import AdminConfig from './AdminConfig';
import queries from './query/Content';
import NotFound from './NotFound';
import NotPermissible from './NotPermissible';
import indexOf from 'lodash/indexOf';
import map from 'lodash/map';
import find from 'lodash/find';
import Loadable from 'react-loadable';

const loadPages = (page) => (
  Loadable({
    loader: () => import(/*webpackChunkName: "pages-[request]"*/ `./pages/${page}`),
    loading: () => <AdminLoading/>
  })
)

const loadLib = (lib) => (
  Loadable({
    loader: () => import(/*webpackChunkName: "lib-[request]"*/ `./lib/${lib}`),
    loading: () => <AdminLoading/>
  })
)
const ContentType = loadLib('ContentType')
const NewContentType = loadLib('ContentTypeNew')
const CategoryContent = loadLib('CategoryContent')
const TagContent = loadLib('TagContent')

const Dashboard = loadPages('Dashboard')
const Settings = loadPages('Settings')
const Content = loadPages('Content')
const NewContent = loadPages('ContentNew')
const CategoryPost = loadPages('Category')
const TagPost = loadPages('Tag')
const Themes = loadPages('Themes')
const Menu = loadPages('Menu')
const Customize = loadPages('Customize')
const Plugins = loadPages('Plugins')
const Permission = loadPages('Permission')
const Pages = loadPages('Pages')
const Posts = loadPages('Posts')
const Users = loadPages('Users')
const NewPost = loadPages('PostsNew')
const NewPage = loadPages('PagesNew')
const NewTheme = loadPages('ThemesNew')
const NewUser = loadPages('UsersNew')
const Profile = loadPages('Profile')
const Widgets = loadPages('Widgets')
let PageLoader = React.createClass({
  propTypes: {
    params: React.PropTypes.object,
    page: React.PropTypes.string,
    action: React.PropTypes.string,
    postId: React.PropTypes.string,
    configLoaded: React.PropTypes.bool,
    hasUnsavedData: React.PropTypes.bool,
    showCtrlSidebar: React.PropTypes.bool
  },
  getDefaultProps: function() {
    return { 
      page: 'dashboard',
    pageId: 'dashboard',
      action: '',
      postId: '',
      configLoaded: false,
      hasUnsavedData: false,
      showCtrlSidebar: false
    }
  },
  isContentType(page){
    var contentList = getConfig("contentList");
    var contentListIds = map(contentList, function(item){ return item.slug });
    return (indexOf(contentListIds, page) !== -1);
  },

  render() {
    var page = this.props.pageId;
    var action = this.props.actionId?"-"+this.props.actionId:"";
    var pid = this.props.postId;
    var hn = this.props.handleNav;
    var hud = this.props.handleUnsavedData;
    var params = this.props.urlParams;
    var map = {
      'dashboard' : <Dashboard />,
      'settings' : <Settings handleNav={hn}/>,
      'content' : <Content handleNav={hn}/>,
      'content-new' : <NewContent handleNav={hn}/>,
      'content-edit' : <NewContent postId={pid} handleNav={hn}/>,
      'profile' : <Profile handleNav={hn}/>,
      'posts': <Posts handleNav={hn}/>,
      'posts-bytag' : <Posts handleNav={hn} tagId={pid} />,
      'posts-bycategory' : <Posts handleNav={hn} cateId={pid}/>,
      'pages': <Pages handleNav={hn}/>,
      'posts-category' : <CategoryPost handleNav={hn}/>,
      'posts-tag' : <TagPost handleNav={hn}/>,
      'themes' : <Themes handleNav={hn}/>,
      'menu': <Menu handleNav={hn} handleUnsavedData={hud}/>,
      'themes-customize': <Customize handleNav={hn}/>,
      'users-permissions' : <Permission handleNav={hn}/>,
      'plugins' : <Plugins handleNav={hn}/>,
      'users': <Users handleNav={hn}/>,
      'posts-new' : <NewPost handleNav={hn} handleUnsavedData={hud}/>,
      'pages-new' : <NewPage handleNav={hn} handleUnsavedData={hud}/>,
      'theme-new' : <NewTheme handleNav={hn}/>,
      'users-new' : <NewUser handleNav={hn}/>,
      'posts-edit' : <NewPost postId={pid} urlParams={params} handleNav={hn} handleUnsavedData={hud}/>,
      'pages-edit' : <NewPage postId={pid} urlParams={params} handleNav={hn} handleUnsavedData={hud}/>,
      'users-edit' : <NewUser userId={pid} handleNav={hn}/>,
      'widget': <Widgets handleNav={hn}/>
    }
    
    var requiredRole = AdminConfig.MenuRoleValue[page+action];

    if (!hasRole(requiredRole) && !this.isContentType(page)){
      return <NotPermissible/>
    } else if (this.isContentType(page) && !hasRole("view-content")){
      return <NotPermissible/>
    }
    
    if (map[page+action]) {
      return map[page+action]
    } else if (this.isContentType(page)) {
      var contentList = getConfig("contentList");
      var contentData = find(contentList, {slug: page});
      var me = this;
      var tagId = "";
      var cateId = "";
      if (action==="-bytag"){
        tagId = this.props.postId;
      }
      if (action==="-bycategory"){
        cateId = this.props.postId;
      }
                  
      let ListComponent = React.createClass({
        render: function(){
          return <ContentType 
            name={contentData.name}  
            slug={contentData.slug} 
            tableName="Post"
            postType={page}
            fields={contentData.fields}
            customFields={contentData.customFields}
            listQuery={queries.getContentPostListQry}
            viewRole="view-post"
            modifyRole="modify-post"
            statusList={["All", "Published", "Draft", "Reviewing", "Trash"]}
            handleNav={me.props.handleNav}
            tagId={tagId}
            cateId={cateId}
          />
        }
      });

      let EditorComponent = React.createClass({
        render: function() {
          return <NewContentType
            name={ contentData.name }
            slug={ contentData.slug }
            postId={ me.props.postId }
            postType={ page }
            customFields={ contentData.customFields }
            tableName="Post"
            widgets={
                ["category", "featuredImage"] }
            viewRole="view-post"
            modifyRole="modify-post"
            handleNav={ me.props.handleNav }
            urlParams={params}
            />
        }
    });


      let CategoryComponent = React.createClass({
        render: function() {
          return <CategoryContent
            postType={ page }
            slug={ page }
            handleNav={ me.props.handleNav }
            />
        }
      });


      let TagComponent = React.createClass({
        render: function(){
          return <TagContent
              postType={page}
              slug={page}
              handleNav={me.props.handleNav}
          />
        }
      });

      if (action=== '-edit' || action=== '-new')
              return <EditorComponent/>
          if (action=== '-category')
              return <CategoryComponent/>
          if (action=== '-tag')
              return <TagComponent/>
          else
              return <ListComponent/>
      } else {
      return <NotFound/>
      }
  }
});

export default PageLoader
