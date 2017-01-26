import React from 'react';
import request from 'request';
import Router from 'react-router';
import $ from 'jquery';
const jQuery = $;
window.jQuery = $;

import Config from './config';
import AdminLTEinit from './admin/lib/app.js';
import 'bootstrap/dist/css/bootstrap.css';
import '../public/css/Login.css';

const Login = React.createClass({
	getInitialState: function(){
		return {
			errorMsg:null
		}
	},
	componentDidMount: function(){
		require ('font-awesome/css/font-awesome.css');
		require ('../public/css/ionicons.min.css');
		require ('../public/css/AdminLTE.css');

		AdminLTEinit();
	},
	handleSubmit: function(event) {
		var username = $("#username").val();
		var password = $("#password").val();

		let data = {
		  "query": `mutation LoginUserQuery ($input: LoginUserInput!) {
		    loginUser(input: $input) {
		      token
		      user {
		        id
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
			if (!error && !body.errors && response.statusCode == 200) {
		    localStorage.token = body.data.loginUser.token;
		    localStorage.userId = body.data.loginUser.user.id;
		    window.location.replace("/admin");
		  } else {
		  	if (body.errors) {
		  		this.setState({errorMsg: body.errors[0].message});
		  	} else {
			  	this.setState({errorMsg: error});
			    console.log(error);
			    console.log(response.statusCode);
			  }
		  }
		});

		event.preventDefault();
	},
	render: function(){
		return (
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
			    <p className="error-msg has-error">{this.state.errorMsg}</p>
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
			              <input type="checkbox" style={{position: "absolute", top: "-20%", left: "-20", display: "block", width: "140%", height: "140%", margin: 0, padding: 0, background: "white", border: 0, opacity: 0}}/>
			              <ins className="iCheck-helper" style={{position: "absolute", top: "-20%", left: "-20", display: "block", width: "140%", height: "140%", margin: 0, padding: 0, background: "white", border: 0, opacity: 0}}></ins></div> Remember Me
			            </label>
			          </div>
			        </div>
			        <div className="col-xs-4">
			          <button type="submit" className="btn btn-primary btn-block btn-flat">Sign In</button>
			        </div>
			      </div>
			    </form>

			    <a href="#">I forgot my password</a><br/>
			    <a href="register.html" className="text-center">Register a new membership</a>
				</div>
			</div>
			)
	}
})

export default Login;