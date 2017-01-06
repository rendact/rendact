import React from 'react';
import $ from 'jquery';
window.jQuery = $;
window.$ = $;

import '../../public/css/bootstrap.min.css';
import '../../public/css/ionicons.min.css';
import '../../public/css/AdminLTE.min.css';
import '../../public/css/skins/_all-skins.min.css';

require ('../../public/js/jquery-ui.min.js');
require ('../../public/js/app.min.js');

class SideMenu extends React.Component {
	render() {
		return (
			<aside className="main-sidebar">
			    <section className="sidebar">
			      <div className="user-panel">
			        <div className="pull-left image">
			          <img src="../../images/user2-160x160.jpg" className="img-circle" alt="User" />
			        </div>
			        <div className="pull-left info">
			          <p>Alexander Pierce</p>
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
			        <li className="active treeview">
			          <a href="#">
			            <i className="fa fa-dashboard"></i> <span>Dashboard</span>
			            <span className="pull-right-container">
			              <i className="fa fa-angle-left pull-right"></i>
			            </span>
			          </a>
			          <ul className="treeview-menu">
			            <li className="active"><a href="#"><i className="fa fa-circle-o"></i> Settings</a></li>
			            <li><a href="#"><i className="fa fa-circle-o"></i> Content Type</a></li>
			          </ul>
			        </li>
			        <li className="treeview">
			          <a href="#">
			            <i className="fa fa-files-o"></i>
			            <span>Posts</span>
			            <span className="pull-right-container">
			              <span className="label label-primary pull-right">4</span>
			            </span>
			          </a>
			          <ul className="treeview-menu">
			            <li><a href="#"><i className="fa fa-circle-o"></i> Add New</a></li>
			            <li><a href="#"><i className="fa fa-circle-o"></i> List</a></li>
			            <li><a href="#"><i className="fa fa-circle-o"></i> Categories</a></li>
			          </ul>
			        </li>
			        <li className="treeview">
			          <a href="#">
			            <i className="fa fa-th"></i> <span>Pages</span>
			            <span className="pull-right-container">
			              <small className="label pull-right bg-green">new</small>
			            </span>
			          </a>
			          <ul className="treeview-menu">
			            <li><a href="#"><i className="fa fa-circle-o"></i> Add New</a></li>
			            <li><a href="#"><i className="fa fa-circle-o"></i> List</a></li>
			          </ul>
			        </li>
			        <li className="treeview">
			          <a href="#">
			            <i className="fa fa-pie-chart"></i>
			            <span>Themes</span>
			            <span className="pull-right-container">
			              <i className="fa fa-angle-left pull-right"></i>
			            </span>
			          </a>
			          <ul className="treeview-menu">
			            <li><a href="#"><i className="fa fa-circle-o"></i> Install</a></li>
			            <li><a href="#"><i className="fa fa-circle-o"></i> Configure</a></li>
			          </ul>
			        </li>
			        <li className="treeview">
			          <a href="#">
			            <i className="fa fa-laptop"></i>
			            <span>Plugins</span>
			            <span className="pull-right-container">
			              <i className="fa fa-angle-left pull-right"></i>
			            </span>
			          </a>
			          <ul className="treeview-menu">
			            <li><a href="#"><i className="fa fa-circle-o"></i> Install</a></li>
			            <li><a href="#"><i className="fa fa-circle-o"></i> Configure</a></li>
			          </ul>
			        </li>
			        <li className="header">LABELS</li>
			        <li><a href="#"><i className="fa fa-circle-o text-red"></i> <span>Important</span></a></li>
			        <li><a href="#"><i className="fa fa-circle-o text-yellow"></i> <span>Warning</span></a></li>
			        <li><a href="#"><i className="fa fa-circle-o text-aqua"></i> <span>Information</span></a></li>
			      </ul>
			    </section>
			  </aside>
		)
	}
}

var fullHeight = {
	height: '100%'
}

const Admin = React.createClass({
	// router params @ this.props.params
	getDefaultProps: function() {},
	getInitialState: function() {
		console.log(this.props.params);
		return this.props.params;
		// Query if params match page and pass to switch below..
		// ie. return {page: "Plugins"};
	},
	render: function() {
		// switch (this.state.layout) or similar
		return (
			<div className="hold-transition skin-blue sidebar-mini" style={fullHeight}>
				<div className="wrapper" style={fullHeight}>
	        		<header className="main-header">
	    				<nav className="navbar navbar-static-top">
		        		Hello
		        		</nav>
	  				</header>
	  				<SideMenu/>
	  				<div className="content-wrapper" style={fullHeight}>
					    <section className="content-header">
					      <h1>
					        Dashboard
					        <small>Control panel</small>
					      </h1>
					      <ol className="breadcrumb">
					        <li><a href="#"><i className="fa fa-dashboard"></i> Home</a></li>
					        <li className="active">Dashboard</li>
					      </ol>
					    </section>

					    <section className="content">
					    </section>
					</div>
	            </div>
	        </div>
		);
	}
});

export default Admin
