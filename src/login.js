import React from 'react';
import $ from 'jquery';
window.jQuery = $;

import AdminLTEinit from './admin/lib/app.js';
import 'bootstrap/dist/css/bootstrap.css';
import '../public/css/Login.css';

const Login = React.createClass({
	getInitialState: function(){
		return {
			errorMsg:null,
			loadingMsg:null
		}
	},
	disableForm: function(state){
		$("#username").attr('disabled',state);
		$("#password").attr('disabled',state);
		$("#loginBtn").attr('disabled',state);
		this.setState({loadingMsg: state?"Signing in...":null});
	},
	componentDidMount: function(){
		require ('font-awesome/css/font-awesome.css');
		require ('../public/css/ionicons.min.css');
		require ('../public/css/AdminLTE.css');

		AdminLTEinit();
	},
	handleSubmit: function(event) {
		event.preventDefault();
		this.disableForm(true);

		var username = $("#username").val();
    var password = $("#password").val();

		var me = this;
		function successFn(){
			me.disableForm(false);
			me.props.onlogin(true);
		}
		function failedFn(msg){
			me.setState({errorMsg: msg});
	  	me.disableForm(false);
		}
		this.props.authService.doLogin(username, password, successFn, failedFn);
	},
	auth0LoginHandle: function(){
		this.props.authService.showPopup()
	},
	render: function(){
		const loginPage = (
			<div className="login-box">
			  <div className="login-logo">
			    <a href="/"><b>Rendact</b></a>
			  </div>
			  <div className="login-box-body">
			    <p className="login-box-msg">Sign in to start your session</p>
			    { this.state.errorMsg &&
			    	<div className="alert alert-danger alert-dismissible">
	            <button type="button" className="close" data-dismiss="alert" aria-hidden="true">×</button>
	            {this.state.errorMsg}
	          </div>
			    }
			    <form id="login" onSubmit={this.handleSubmit} method="get">
			      <div className="form-group has-feedback">
			        <input id="username" className="form-control" placeholder="Username"/>
			        <span className="glyphicon glyphicon-envelope form-control-feedback"></span>
			      </div>
			      <div className="form-group has-feedback">
			        <input type="password" id="password" className="form-control" placeholder="Password"/>
			        <span className="glyphicon glyphicon-lock form-control-feedback"></span>
			      </div>
			      <div className="row">
			        <div className="col-xs-8">
			          <div className="checkbox icheck">
			            <label>
			              <div className="icheckbox_square-blue" aria-checked="false" aria-disabled="false" style={{position: "relative"}}>
			              <input type="checkbox" style={{position: "absolute", top: "-20%", left: -20, display: "block", width: "140%", height: "140%", margin: 0, padding: 0, background: "white", border: 0, opacity: 0}}/>
			              <ins className="iCheck-helper" style={{position: "absolute", top: "-20%", left: -20, display: "block", width: "140%", height: "140%", margin: 0, padding: 0, background: "white", border: 0, opacity: 0}}></ins></div> Remember Me
			            </label>
			          </div>
			        </div>
			        <div className="col-xs-4">
			          <button id="loginBtn" type="submit" className="btn btn-primary btn-block btn-flat">Sign In</button>
			          <p>{this.state.loadingMsg}</p>
			        </div>
			      </div>
			    </form>

			    <a href="#" onClick={this.auth0LoginHandle}>Sign in with Auth0</a><br/>
			    <a href="#">I forgot my password</a><br/>
			    <a href="register.html" className="text-center">Register a new membership</a>
				</div>
			</div>
			)
		
		return loginPage;
	}
})

export default Login;