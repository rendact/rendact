import React from 'react';

class AdminHeader extends React.Component {
  render() {
    return (
      <header className="main-header">
      <a href="#" className="logo">
        <span className="logo-mini">
          <img src="../../images/icon-32.png" className="img-circle" alt="Rendact Logo"/> 
        </span>
        <span className="logo-lg" style={{paddingRight:10}}>
          <img src="../../images/logo-white-230x85.png" width="110" className="img-circle" alt="Rendact Logo"/> 
        </span>
      </a>
      <nav className="navbar navbar-static-top">
        <a href="#" className="sidebar-toggle" data-toggle="offcanvas" role="button">
          <span className="sr-only">Toggle navigation</span>
        </a>
        <div className="navbar-custom-menu">
          <ul className="nav navbar-nav">
            <li>
              <a href="/">
                <span><i className="fa fa-home"></i> My Site</span>
              </a>
            </li>
            <li className="dropdown messages-menu">
              <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                <i className="fa fa-envelope-o"></i>
                <span className="label label-success">4</span>
              </a>
              <ul className="dropdown-menu">
                <li className="header">You have 4 messages</li>
                <li>
                  <ul className="menu">
                    <li>
                      <a href="#">
                        <div className="pull-left">
                          <img src="../../images/avatar-default.png" className="img-circle" alt="User"/>
                        </div>
                        <h4>
                          Support Team
                          <small><i className="fa fa-clock-o"></i> 5 mins</small>
                        </h4>
                        <p>Why not buy a new awesome theme?</p>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <div className="pull-left">
                          <img src="../../images/avatar-default.png" className="img-circle" alt="User"/>
                        </div>
                        <h4>
                          AdminLTE Design Team
                          <small><i className="fa fa-clock-o"></i> 2 hours</small>
                        </h4>
                        <p>Why not buy a new awesome theme?</p>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <div className="pull-left">
                          <img src="../../images/avatar-default.png" className="img-circle" alt="User"/>
                        </div>
                        <h4>
                          Developers
                          <small><i className="fa fa-clock-o"></i> Today</small>
                        </h4>
                        <p>Why not buy a new awesome theme?</p>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <div className="pull-left">
                          <img src="../../images/avatar-default.png" className="img-circle" alt="User"/>
                        </div>
                        <h4>
                          Sales Department
                          <small><i className="fa fa-clock-o"></i> Yesterday</small>
                        </h4>
                        <p>Why not buy a new awesome theme?</p>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <div className="pull-left">
                          <img src="../../images/avatar-default.png" className="img-circle" alt="User"/>
                        </div>
                        <h4>
                          Reviewers
                          <small><i className="fa fa-clock-o"></i> 2 days</small>
                        </h4>
                        <p>Why not buy a new awesome theme?</p>
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="footer"><a href="#">See All Messages</a></li>
              </ul>
            </li>
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
            <li className="dropdown tasks-menu">
              <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                <i className="fa fa-flag-o"></i>
                <span className="label label-danger">9</span>
              </a>
              <ul className="dropdown-menu">
                <li className="header">You have 9 tasks</li>
                <li>
                  <ul className="menu">
                    <li>
                      <a href="#">
                        <h3>
                          Design some buttons
                          <small className="pull-right">20%</small>
                        </h3>
                        <div className="progress xs">
                          <div className="progress-bar progress-bar-aqua" style={{width: '20%'}} role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">
                            <span className="sr-only">20% Complete</span>
                          </div>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <h3>
                          Create a nice theme
                          <small className="pull-right">40%</small>
                        </h3>
                        <div className="progress xs">
                          <div className="progress-bar progress-bar-green" style={{width: '40%'}} role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">
                            <span className="sr-only">40% Complete</span>
                          </div>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <h3>
                          Some task I need to do
                          <small className="pull-right">60%</small>
                        </h3>
                        <div className="progress xs">
                          <div className="progress-bar progress-bar-red" style={{width: '60%'}} role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">
                            <span className="sr-only">60% Complete</span>
                          </div>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <h3>
                          Make beautiful transitions
                          <small className="pull-right">80%</small>
                        </h3>
                        <div className="progress xs">
                          <div className="progress-bar progress-bar-yellow" style={{width: '80%'}} role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">
                            <span className="sr-only">80% Complete</span>
                          </div>
                        </div>
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="footer">
                  <a href="#">View all tasks</a>
                </li>
              </ul>
            </li>
            <li className="dropdown user user-menu">
              <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                <img src="../../images/avatar-default.png" className="user-image" alt="User" />
                <span className="hidden-xs">Ali Camarata</span>
              </a>
              <ul className="dropdown-menu">
                <li className="user-header">
                  <img src="../../images/avatar-default.png" className="img-circle" alt="User" />

                  <p>
                    Ali Camarata - Web Developer
                    <small>Member since Nov. 2012</small>
                  </p>
                </li>
                <li className="user-footer">
                  <div className="pull-left">
                    <a href="#" className="btn btn-default btn-flat">Profile</a>
                  </div>
                  <div className="pull-right">
                    <a href="#" className="btn btn-default btn-flat">Sign out</a>
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
  }
}

export default AdminHeader;