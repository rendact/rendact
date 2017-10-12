import React from 'react';
import $ from 'jquery';
import concat from 'lodash/concat';
import {hasRole} from '../utils/hasRole';
import {getConfig} from '../utils/getConfig';
import AdminConfig from './AdminConfig';
import forEach from 'lodash/forEach';

let SideMenu = React.createClass({
  propTypes: {
    activeMenu: React.PropTypes.string,
    menuList: React.PropTypes.array
  },
  getDefaultProps: function() {
    return { 
      menuList: AdminConfig.menuList
    }
  },  
  onClick(id, url, e){
    e.preventDefault();
    var callback = function(){
      $(".menu-item").removeClass("active");
      $("#menu-"+id).addClass("active");
      window.history.pushState("", "", url);
    }
    this.props.onClick(id, callback);
  },

  componentDidMount(){
    $("#menu-"+this.props.activeMenu).addClass("active");
    $("#menu-"+this.props.activeMenu).parent("ul").parent("li").addClass("active");
  },

  render() {
    let p = JSON.parse(localStorage.getItem("profile"));
    var image = getConfig('rootUrl')+"/images/avatar-default.png";
    if (p.image)
      image = p.image;

    var menuList = this.props.menuList;
    var _dataArr = [];

    forEach(this.props.contentList, function(item){
      _dataArr.push(
        {id: item.node.slug, label: item.node.name, icon: item.node.menuIcon?item.node.menuIcon:'fa-drivers-license-o', open: false, role: 5, roleId: 'view-post',
          elements: [
            {id: item.node.slug, label: item.node.name, icon: 'fa-drivers-license-o', open: true, url: '/admin/'+item.node.slug, role: 5, roleId: 'view-post'},
            {id: item.node.slug+'-new', label: 'Add New', icon: 'fa-edit', open: false, url: '/admin/'+item.node.slug+'/new', role: 5, roleId: 'modify-post'},
            {id: item.node.slug+'-category', label: 'Category', icon: 'fa-edit', open: false, url: '/admin/'+item.node.slug+'/category', role: 5, roleId: 'modify-category'},
            {id: item.node.slug+'-tag', label: 'Tag', icon: 'fa-edit', open: false, url: '/admin/'+item.node.slug+'/tag', role: 5, roleId: 'modify-tag'}
          ]
        }
      );
    });
    
    menuList = concat(menuList, _dataArr);

    return (
      <aside className="main-sidebar">
        <section className="sidebar">
          <div className="user-panel user-panel-hidden">
            <div className="pull-left image">
              <img src={image} className="img-circle" alt="User" />
            </div>
            <div className="pull-left info">
              <p>{p.name}</p>
              <a href="#"><i className="fa fa-circle text-success"></i> Online</a>
            </div>
          </div>
          <form action="#" method="get" className="sidebar-form">
            <div className="input-group">
              <input type="text" name="q" className="form-control" placeholder="Search..."/>
                  <span className="input-group-btn">
                    <button type="submit" name="search" id="search-btn" className="btn btn-flat"><i className="fa fa-search"></i>
                    </button>
                  </span>
            </div>
          </form>
          <ul className="sidebar-menu">
            { menuList.map(function(item, index) {
              if (item.roleId) {
                if (!hasRole(item.roleId)) {
                  return null
                }
              }
              if (item.id === 'separator') {
                return <li className="header" key={item.id}>{item.label}</li>
              }

              var childItems = "";
              if (item.elements) {
                childItems = (
                  <ul className="treeview-menu">
                      {
                        item.elements.map(function(item) {
                          if (item.roleId) {
                            if (!hasRole(item.roleId)) {
                              return null
                            }
                          }

                          var iconClass = "fa "+item.icon;
                          return <li key={item.id} id={"menu-"+item.id} className="menu-item" onClick={this.onClick.bind(this, item.id, item.url)}><a href={item.url}><i className={iconClass}></i> {item.label}</a></li>
                        }, this)
                      }
                  </ul>
                );
              }

              var rootActiveClass = item.open?"active treeview":"treeview";
              var rootIconClass = "fa "+item.icon;
              var menuItem = (
                <li className={rootActiveClass} key={item.id}>
                  <a href="#">
                    <i className={rootIconClass}></i> <span>{item.label}</span>
                  </a>
                 {childItems}
                </li> 
              );
              return menuItem;
            }, this)}
      </ul>
        </section>
      </aside>
    )
  }
});

export default SideMenu
