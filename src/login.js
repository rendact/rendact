import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import './css/Login.css'
import AdminLTEinit from  './admin/lib/app.js'
import {setLogged} from './actions'
import {connect} from 'react-redux'
import gql from 'graphql-tag'
import {graphql} from 'react-apollo';
import {setProfile} from './utils';
import Config from './rendact.config.json';
import Auth0Lock from 'auth0-lock';
import {Redirect} from 'react-router';

class Login extends React.Component{
	constructor(props){
    super(props);
		this.state = {
			errorMsg:null,
			loadingMsg:null
		}

		this.lock = new Auth0Lock(Config.auth0ClientId, Config.auth0Domain, {
	    auth: {
	      redirectUrl: '/login/redirect',
	      responseType: 'token'
	    }
	  })

    this.disableForm = this.disableForm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.auth0LoginHandle = this.auth0LoginHandle.bind(this);
    this.handleErrorMsgClose = this.handleErrorMsgClose.bind(this);
	}

	disableForm(state){
		document.getElementById("username").attributes.disabled = state;
    document.getElementById("password").attributes.disabled = state;
    document.getElementById("loginBtn").attributes.disabled = state;
		this.setState({loadingMsg: state?"Signing in...":null});
	}

	componentDidMount(){
		require ('font-awesome/css/font-awesome.css');
		require ('./css/ionicons.css');
		require ('./css/AdminLTE.css');

		var me = this;
		var _doAuthentication = function(authResult) {
	    localStorage.setItem('token', authResult.idToken)
	    
	    me.lock.getProfile(authResult.idToken, function(error, profile) {
	      if (error) {
	        console.log("ERROR");
	        console.log(error);
	        return;
	      }
	      localStorage.setItem('token', authResult.idToken);
	      localStorage.setItem('auth0_profile', JSON.stringify(profile));
	      localStorage.setItem('loginType','auth0');
	      console.log("Auth0 authenticated");
	      //window.location = '/admin';
        me.props.dispatch(setLogged(true))
	    });
	  }
	  this.lock.on('authenticated', _doAuthentication);
		
		AdminLTEinit();
	}

	handleSubmit(event) {
		event.preventDefault();
		this.disableForm(true);

		var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

		var me = this;
		var pathname = 'admin';
		try {
			pathname = this.props.location.state.form;
		} catch(e) {}

		this.props.doLogin({"variables": {
        "input": {
          "username": username,
          "password": password
        }
      }
     }).then(({data}) => {
     	if (data) {
        if (data.loginUser) {
          var p = data.loginUser.user;
          localStorage.token = data.loginUser.token;
          localStorage.userId = p.id;
          setProfile(p);
        }
        me.disableForm(false);
        me._reactInternalInstance._context.history.push(pathname)
				me.props.dispatch(setLogged(true, pathname));
      } else {
        me.setState({errorMsg: "Login failed"});
	  		me.disableForm(false);
      }
     });
	}

	auth0LoginHandle(){
		this.lock.show()
	}

	handleErrorMsgClose(){
		this.setState({errorMsg: ""});
	}

	render(){
		if(this.props.logged)
      return <Redirect to={this.props.location.state.form}/>;
		
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
}

Login = connect(state=>state.main)(Login);

var loginMtn = gql`mutation LoginUserQuery ($input: LoginUserInput!) {
  loginUser(input: $input) {
    token
    user {
      id
      username
      fullName
      gender
      email
      image
      country
      lastLogin
      createdAt
      dateOfBirth
      meta { edges { node { id, item, value } }}
      roles { edges { node { id, name } }}
    }
  }
}`

var loginAuth0Mtn = gql`mutation LoginUserWithAuth0Lock ($input: LoginUserWithAuth0LockInput!) {
  loginUserWithAuth0Lock(input: $input) {
    user {
      id
      username
      fullName
      gender
      email
      image
      country
      lastLogin
      createdAt
      dateOfBirth
      meta { edges { node { id, item, value } }}
      roles { edges { node { id, name } }}
    }
  }
}`
Login = graphql(loginMtn, {name: "doLogin"})(Login);
Login = graphql(loginAuth0Mtn, {name: "doAuth0Login"})(Login);
export default Login;
