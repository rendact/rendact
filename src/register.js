import React from 'react';
import $ from 'jquery';
window.jQuery = $;

import AdminLTEinit from './admin/lib/app.js';
import 'bootstrap/dist/css/bootstrap.css';
import '../public/css/Login.css';

const Register = React.createClass({
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
		const redirect = (
			<div>
			<h2 style={{marginTop:100,width:"100%",textAlign:"center"}}>Redirecting...</h2>
			</div>
		)

		if(this.props.params && this.props.params.param1==="redirect")
			return redirect;
		
		const registerPage = (
			<div className="register-box">
			  <div className="register-logo">
			    <a href="../../index2.html"><b>Admin</b>LTE</a>
			  </div>

			  <div className="register-box-body">
			    <p className="login-box-msg">Register a new membership</p>

			    <form action="../../index.html" method="post">
			      <div className="form-group has-feedback">
			        <input type="text" className="form-control" placeholder="Full name" />
			        <span className="glyphicon glyphicon-user form-control-feedback"></span>
			      </div>
			      <div className="form-group has-feedback">
			        <input type="email" className="form-control" placeholder="Email" />
			        <span className="glyphicon glyphicon-envelope form-control-feedback"></span>
			      </div>
			      <div className="form-group has-feedback">
			        <input type="password" className="form-control" placeholder="Password" />
			        <span className="glyphicon glyphicon-lock form-control-feedback"></span>
			      </div>
			      <div className="form-group has-feedback">
			        <input type="password" className="form-control" placeholder="Retype password" />
			        <span className="glyphicon glyphicon-log-in form-control-feedback"></span>
			      </div>
			      <div className="row">
			        <div className="col-xs-8">
			          <div className="checkbox icheck">
			            <label>
			              <input type="checkbox"/> I agree to the <a href="#">terms</a>
			            </label>
			          </div>
			        </div>
			        <div className="col-xs-4">
			          <button type="submit" className="btn btn-primary btn-block btn-flat">Register</button>
			        </div>
			      </div>
			    </form>

			    <div className="social-auth-links text-center">
			      <button type="button" className="btn btn-block btn-info btn-lg" onClick={this.auth0LoginHandle}>
			    		Sign in with Auth0</button>
			    </div>

			    <a href="/login" className="text-center">I already have a membership</a>
			  </div>
			</div>
			)
		
			return registerPage;
	}
})

export default Register;