import React from 'react';
import Config from '../config'
import { Redirect } from 'react-router'

const AdminHeader = React.createClass({
  getInitialState: function(){
    return {
      goToProfile: false
    }
  },
  getDefaultProps: function() {
    return { 
      profile: {
        name: ''
      }
    }
  },
  handleSignout: function(){
    //localStorage.token="";
    //this.setState({logged: false});
    this.props.authService.logout();
    location.reload();
  },
  render: function() {
    var profile = this.props.profile;
    if (this.props.authService.getProfile())
      profile = this.props.authService.getProfile()

    let header = (
      <header className="main-header">
      <nav className="navbar navbar-static-top">
        <a href="#" className="logo dropdown-toggle" data-toggle="dropdown">
          <span className="logo-mini">
            <img src={Config.rootUrl+"/images/icon-32.png"} className="img-circle" alt="Rendact Logo"/> 
          </span>
          <span className="logo-lg" style={{paddingRight:10}}>
            <img src={Config.rootUrl+"/images/icon-32.png"} className="img-circle" alt="Rendact Logo"/> 
          </span>
        </a>
        <ul className="dropdown-menu logo-menu">
          <li>
            <a href="#">
              Documentation
            </a>
          </li>
          <li>
            <a href="#">
              Supports Forum
            </a>
          </li>
          <li>
            <a href="#">
              Feedback
            </a>
          </li>
        </ul>
        <a href="/" className="site-name dropdown-toggle" data-toggle="dropdown">
          <span><i className="fa fa-home"></i> My Site</span>
        </a>
        <div className="navbar-custom-menu">
          <ul className="nav navbar-nav">
            <li className="dropdown notifications-menu">
              <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                <i className="fa fa-bell-o"></i>
                <span className="label label-warning">10</span>
              </a>
              <ul className="dropdown-menu">
                <li className="header">You have 10 notifications</li>
                <li>
                  <ul className="menu">
                    <li>
                      <a href="#">
                        <i className="fa fa-users text-aqua"></i> 5 new members joined today
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa fa-warning text-yellow"></i> Very long description here that may not fit into the
                        page and may cause design problems
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa fa-users text-red"></i> 5 new members joined
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa fa-shopping-cart text-green"></i> 25 sales made
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa fa-user text-red"></i> You changed your username
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="footer"><a href="#">View all</a></li>
              </ul>
            </li>
            <li className="dropdown user user-menu">
              <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                <img src={Config.rootUrl+"/images/avatar-default.png"} className="user-image" alt="User" />
                <span className="hidden-xs">{profile.name}</span>
              </a>
              <ul className="dropdown-menu">
                <li className="user-header">
                  <img src={Config.rootUrl+"/images/avatar-default.png"} className="img-circle" alt="User" />

                  <p>
                    {profile.name}
                    <small>Member since Nov. 2012</small>
                  </p>
                </li>
                <li className="user-footer">
                  <div className="pull-left">
                    <a href="#" onClick={this.props.onProfileClick} className="btn btn-default btn-flat">Profile</a>
                  </div>
                  <div className="pull-right">
                    <a href="#" className="btn btn-default btn-flat" onClick={this.handleSignout}>Sign out</a>
                  </div>
                </li>
              </ul>
            </li>
            <li>
              <a href="#" data-toggle="control-sidebar"><i className="fa fa-gears"></i></a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
    )
    
    return header;
  }
});

export default AdminHeader;