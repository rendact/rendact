import React from 'react';
import {Redirect} from 'react-router'
import request from 'request';
import AuthService from './AuthService'
import $ from 'jquery';
window.jQuery = $;

import Admin from './admin';
import Config from './config';
import AdminLTEinit from './admin/lib/app.js';
import 'bootstrap/dist/css/bootstrap.css';
import '../public/css/Login.css';

const auth = new AuthService('ppT7SigAoZtxsMkivihT2O1PLS7TYBFf', 'rendact.auth0.com');
window.auth = auth;

const Login = React.createClass({
	getInitialState: function(){
		return {
			errorMsg:null,
			loadingMsg:null,
			logged: (this.props.logged!=null?this.props.logged:false),
			profile: {
				name: null,
				image: null
			}

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
		var me = this;
		this.disableForm(true);
		var username = $("#username").val();
		var password = $("#password").val();

		let data = {
		  "query": `mutation LoginUserQuery ($input: LoginUserInput!) {
		    loginUser(input: $input) {
		      token
		      user {
		      	id
		      	username
		      	fullName
		      	gender
		      	email
		      	lastLogin
		      	createdAt
		      }
		    }
		  }`,
		  "variables": {
		    "input": {
		      "username": username,
		      "password": password
		    }
		  }

		};

		request({
		  url: Config.scapholdUrl,
		  method: "POST",
		  json: true,
		  headers: {
		    "content-type": "application/json"
		  },
		  body: data
		}, (error, response, body) => {
			if (!error && !body.errors && response.statusCode === 200) {
				if (body.data.loginUser) {
					var p = body.data.loginUser.user;
			    localStorage.token = body.data.loginUser.token;
			    localStorage.userId = p.id;
			    var profile = {
			    	name: p.fullName?p.fullName:p.username,
			    	username: p.username,
			    	email: p.email,
			    	gender: p.gender,
			    	lastLogin: p.lastLogin,
			    	createdAt: p.createdAt
			    }
			    localStorage.profile = JSON.stringify(profile);
			    this.setState({profile: profile});
		  	}
		    me.disableForm(false);
		    me.setState({logged: true});
		  } else {
		  	if (body && body.errors) {
		  		me.setState({errorMsg: body.errors[0].message});
		  	} else {
		    	me.setState({errorMsg: error.toString()});
			  }
			  me.disableForm(false);
		  }
		});
		
		event.preventDefault();
	},
	auth0LoginHandle: function(){
		window.auth.login()
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
		
		var from = this.props.location.state?this.props.location.state.from.pathname:this.props.location.pathname;
		if (!this.state.logged ) {
			return loginPage;
		} else if (
				from==="/admin" || from==="/admin/" || from==="/login" || from==="/login/" 
			){
			window.history.pushState("", "", '/admin');
			return <Admin profile={this.state.profile} logged={this.state.logged}/>
		} else {
			return <Redirect to={{pathname: this.props.location.state.from.pathname}}/>
		}
	}
})

export default Login;