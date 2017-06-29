import React from 'react'
import AdminLTEinit from './admin/lib/app.js'
import 'bootstrap/dist/css/bootstrap.css'
import '../public/css/Login.css'
import {setLogged} from './actions'
import {connect} from 'react-redux'

let Login = React.createClass({
	getInitialState: function(){
		return {
			errorMsg:null,
			loadingMsg:null
		}
	},
	disableForm: function(state){
		document.getElementById("username").attributes.disabled = state;
    document.getElementById("password").attributes.disabled = state;
    document.getElementById("loginBtn").attributes.disabled = state;
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

		var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

		var me = this;
		var pathname = null;
		try {
			pathname = this.props.location.state.from.pathname;
		} catch(e) {}

		function successFn(){
			me.disableForm(false);
			debugger;
			//this.props.dispatch(setLogged(true, pathname))
			me.props.onlogin(true, pathname);
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
	handleErrorMsgClose: function(){
		this.setState({errorMsg: ""});
	},
	render: function(){
		const redirect = (
			<div>
			<h2 style={{marginTop:100,width:"100%",textAlign:"center"}}>Redirecting...</h2>
			</div>
		)

		if(this.props.params && this.props.params.param1==="redirect")
			return redirect;
		
		const loginPage = (
			<div className="login-box">
			  <div className="login-logo">
			    <a href="/"><b>Rendact</b></a>
			  </div>
			  <div className="login-box-body">
			    <p className="login-box-msg">Sign in to start your session</p>
			    { this.state.errorMsg &&
			    	<div className="alert alert-danger alert-dismissible">
	            <button type="button" className="close" data-dismiss="alert" onClick={this.handleErrorMsgClose}>×</button>
	            {this.state.errorMsg}
	          </div>
			    }
			    <form id="login" onSubmit={this.handleSubmit} method="get">
			      <div className="form-group has-feedback">
			        <input id="username" className="form-control" placeholder="Username" required="true"/>
			        <span className="glyphicon glyphicon-envelope form-control-feedback"></span>
			      </div>
			      <div className="form-group has-feedback">
			        <input type="password" id="password" className="form-control" placeholder="Password" required="true"/>
			        <span className="glyphicon glyphicon-lock form-control-feedback"></span>
			      </div>
			      <div className="row">
			        <div className="col-xs-8">
			            <label>
			              <input type="checkbox"/> Remember Me
			            </label>
			        </div>
			        <div className="col-xs-4">
			          <button id="loginBtn" type="submit" className="btn btn-primary btn-block btn-flat">Sign In</button>
			          <p>{this.state.loadingMsg}</p>
			        </div>
			      </div>
			    </form>
			    <a href="#">I forgot my password</a><br/>
			    <div className="social-auth-links text-center">
			    	<button type="button" className="btn btn-block btn-info btn-lg" onClick={this.auth0LoginHandle}>
			    		Sign in with Auth0</button>
			    	<a href="/register" className="btn btn-block btn-warning btn-lg" >
			    		Create account</a>
			    </div>
				</div>
			</div>
			)
		
			return loginPage;
	}
})

Login = connect()(Login);
export default Login;