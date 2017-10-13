import React from 'react';
import concat from 'lodash/concat';
import forEach from 'lodash/forEach';
import AdminHeader from './Header';
import AdminLoading from './AdminLoading';
import Footer from './Footer';
import SideMenu from './SideMenu';
import AdminLTEinit from './lib/app.js';
import {swalert} from '../utils/swalert';
import queries from './query/Content';
import {saveConfig} from '../utils/saveConfig';
import {toggleControlSidebarState, toggleUnsavedDataState, setActivePage, setActiveMenuId, setLogged } from '../actions';
import gql from 'graphql-tag'
import {graphql} from 'react-apollo';
import {connect} from 'react-redux'
import request from 'request';
import Loadable from 'react-loadable';
import {preload} from '../Routes'

import 'jquery-ui/ui/core';
import 'bootstrap/dist/css/bootstrap.css';
import 'jquery-ui/themes/base/core.css';
import 'sweetalert2/dist/sweetalert2.css';

require ('bootstrap');

const ControlSidebar = Loadable({
  loader: () => import(/* webpackChunkName: "controlSidebar" */ './ControlSidebar'),
  loading: () => null
})

const PageLoader = Loadable({
  loader: () => import(/* webpackChunkName: "pageLoader" */'./PageLoader'),
  loading: () => <AdminLoading/>
})


let Admin = React.createClass({
  propTypes: {
    params: React.PropTypes.object,
    page: React.PropTypes.string,
    action: React.PropTypes.string,
    postId: React.PropTypes.string,
    configLoaded: React.PropTypes.bool,
    hasUnsavedData: React.PropTypes.bool,
    showCtrlSidebar: React.PropTypes.bool,
    contentList: React.PropTypes.array,
    activeMenu: React.PropTypes.string
  },
  getDefaultProps: function() {
    return { 
      params: {
        page: 'dashboard',
        action: ''
      },
      page: 'dashboard',
      action: '',
      postId: '',
      configLoaded: false,
      hasUnsavedData: false,
      showCtrlSidebar: false,
      contentList: [],
      activeMenu: ''
    }
  },
  componentDidMount(){
    require ('jquery-ui/themes/base/theme.css');
    require ('jquery-ui/themes/base/tooltip.css');
    require ('font-awesome/css/font-awesome.css');
    require ('../css/ionicons.css');
    require ('../css/AdminLTE.css');
    require ('../css/skins/_all-skins.min.css');
    require ('jquery-ui/ui/widgets/tooltip')
    preload();

    AdminLTEinit();

    if (this.props.page==="themes" && this.props.action==="customize") {
      this.props.dispatch(toggleControlSidebarState(false))
    } else {
      this.props.dispatch(toggleControlSidebarState(true))
    }

    window.onpopstate = this.onBackButtonEvent;
  },
  onBackButtonEvent(e){
    e.preventDefault();
    if (this._reactInternalInstance)
      this._reactInternalInstance._context.history.go(0);
  },
  setUnsavedDataState(state){
    this.props.dispatch(toggleUnsavedDataState(state))
  },
  confirmUnsavedData(callback){
    var state = true;
    var me = this;
    if (!callback)
    callback = function() {}

    if (this.props.hasUnsavedData) {
      swalert('warning','Sure want to navigate away?','You might lost some data',
        function(){
            callback.call();
            state = true;
            me.setUnsavedDataState(false);
        },
        function(){
            state = false;
        }
      );
    } else {
      callback.call();
      state = true;
    }
    return state;
  },
  handleProfileClick(e){
        e.preventDefault();
        this.redirectToPage('profile');
    },

  redirectToPage(pageId, actionId, postId, tagId, callback){
      var me = this;
      this.confirmUnsavedData(
        function() {
          if (postId) {
            me.props.dispatch(setActivePage(pageId, actionId, postId))
            me._reactInternalInstance._context.history.push('/admin/'+pageId+'/'+actionId+'/'+postId)
          } else {
            me.props.dispatch(setActivePage(pageId, actionId))
            if (actionId)
              me._reactInternalInstance._context.history.push('/admin/'+pageId+'/'+actionId)
            else 
              me._reactInternalInstance._context.history.push('/admin/'+pageId)
          }

          if (callback) callback.call()
      });
  },
  handleMenuClick(pageId, callback){
    var me = this;
    this.confirmUnsavedData(
      function(){
        var pg = pageId.split("-");
        me.props.dispatch(setActivePage(pg[0], pg[1]?pg[1]:''))
        me.props.dispatch(setActiveMenuId(pageId));
        callback.call();
      }
    );
  },
  handleSignout(e){
    e.preventDefault()
    this.props.dispatch(setLogged(false, '/login'))
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('profile');
    localStorage.removeItem('loginType');
    localStorage.removeItem('auth0_profile');
    localStorage.removeItem('config');
    request({url: 'https://rendact.auth0.com/v2/logout'});
    window.location.reload()
  },
  render() {
    if (this.props.logged && this.props.configLoaded) {
      return (
        <div className="wrapper">
                  
          <AdminHeader handleSignout={this.handleSignout} onProfileClick={this.handleProfileClick} />
            <SideMenu 
              onClick={this.handleMenuClick} 
              activeMenu={this.props.page+(this.props.action?'-':'')+this.props.action}
              contentList={this.props.contentList}
            />
                <PageLoader 
                  pageId={this.props.params.page} 
                  actionId={this.props.params.action} 
                  postId={this.props.params.postId} 
                  handleNav={this.redirectToPage}
                  handleUnsavedData={this.setUnsavedDataState}
                  urlParams={this.props.params}
                />
                <Footer/>
                { this.props.showCtrlSidebar && 
                  <ControlSidebar/>
                }
                <div className="control-sidebar-bg"></div>
        </div>
      );
    } else {
      return (
        null
      )
    }
  }
});

const mapStateToProps = function(state){
    return state.admin||{}
}
Admin = connect(mapStateToProps)(Admin);


Admin = graphql(gql`${queries.getContentListQry("active").query}`, {
  props: ({ownProps, data}) => {
    if (data.viewer) {
      var _dataArr = [];

      forEach(data.viewer.allContents.edges, function(item){
        var dt = new Date(item.node.createdAt);
        var fields = item.node.fields;
        if (item.node.customFields) fields = concat(item.node.fields, item.node.customFields)

        _dataArr.push({
          "postId": item.node.id,
          "name": item.node.name,
          "fields": fields,
          "customFields": item.node.customFields,
          "slug": item.node.slug?item.node.slug:"",
          "status": item.node.status?item.node.status:"",
          "createdAt": dt.getFullYear() + "/" + (dt.getMonth() + 1) + "/" + dt.getDate()
        });

      });
      saveConfig("contentList", _dataArr);

      forEach(data.viewer.allOptions.edges, function(item){
        saveConfig(item.node.item, item.node.value);
      });

      return {
        configLoaded: true,
        contentList: data.viewer.allContents.edges
      }
    } 
  }
})(Admin);

export default Admin
