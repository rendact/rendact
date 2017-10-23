import React from 'react';
import request from 'request';
import Config from './rendact.config.json';
import Query from './admin/query';
import AdminLTEinit from './admin/lib/app.js';
import { sendMail } from './utils'
import {preload} from './Routes'

class Register extends React.Component{
	constructor(props){
    super(props);
		this.state = {
			errorMsg:null,
			loadingMsg:null
		}

    this.disableForm = this.disableForm.bind(this);
    this.setProfile = this.setProfile.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.auth0LoginHandle = this.auth0LoginHandle.bind(this);

	}

	disableForm(state){
		document.getElementById("username").attributes.disabled = state;
		document.getElementById("fullname").attributes.disabled = state;
		document.getElementById("email").attributes.disabled = state;
		document.getElementById("password").attributes.disabled = state;
		document.getElementById("repassword").attributes.disabled = state;
		document.getElementById("registerBtn").attributes.disabled = state;
		this.setState({loadingMsg: state?"Sending...":null});
	}

	componentDidMount(){
		require ('font-awesome/css/font-awesome.css');
		require ('./css/ionicons.min.css');
		require ('./css/AdminLTE.css');
require( 'bootstrap/dist/css/bootstrap.css')
require( './css/Login.css')
    preload()

		AdminLTEinit();
	}

	setProfile(p) {
    var profile = {
      name: p.fullName?p.fullName:p.username,
      username: p.username,
      email: p.email,
      gender: p.gender,
      lastLogin: p.lastLogin,
      createdAt: p.createdAt
    }
    localStorage.setItem("userId", p.id);
    localStorage.setItem('profile', JSON.stringify(profile));
    console.log("set profile: "+JSON.stringify(profile));
  }

	handleSubmit(event) {
		event.preventDefault();
		
		var fullname = document.getElementById("fullname").value;
		var username = document.getElementById("username").value
		var email = document.getElementById("email").value
		var gender = document.getElementById("gender").value
    var password = document.getElementById("password").value
    var repassword = document.getElementById("repassword").value

    if (password!==repassword) {
    	this.setState({errorMsg: "Password is not match"});
    	return;
    }

    if (gender==="") {
    	this.setState({errorMsg: "Select a gender"});
    	return;
    }

    this.disableForm(true);
		var me = this;
		console.log("register user");
    
    request({
      url: Config.graphqlApiUrl,
      method: "POST",
      json: true,
      headers: {
        "content-type": "application/json"
      },
      body: Query.createUserMtn(username, password, email, fullname, gender)
    }, (error, response, body) => {
      if (!error && !body.errors && response.statusCode === 200) {
        if (body.data.createUser) {
          var p = body.data.createUser.changedUser;
          localStorage.token = body.data.createUser.token;
          me.setProfile(p);
        }
        console.log("register OK");
        sendMail(email, "Welcome to Rendact", fullname+"! Welcome to Rendact");
        me.disableForm(false);
        window.location = '/admin';
      } else {
      	me.disableForm(false);
      	if (error) {
      		me.setState({errorMsg: error.message})
      	} else if (body.errors){
      		me.setState({errorMsg: body.errors[0].message})
      	} else {
      		me.setState({errorMsg: "Unknown error"})
      	}
        console.log("doLogin FAILED");
      }
    });
	}

	auth0LoginHandle(){
		
	}

	render(){
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
			    { this.state.errorMsg &&
			    	<div className="alert alert-danger alert-dismissible">
	            <button type="button" className="close" data-dismiss="alert" aria-hidden="true">×</button>
	            {this.state.errorMsg}
	          </div>
			    }
			    <form id="register" onSubmit={this.handleSubmit} method="post">
			      <div className="form-group has-feedback">
			        <input type="text" className="form-control" id="fullname" placeholder="Full name" required="true"/>
			        <span className="glyphicon glyphicon-user form-control-feedback"></span>
			      </div>
			      <div className="form-group has-feedback">
			        <select id="gender" placeholder="Gender" className="form-control select">
			        	<option key="" value="" default>Select your gender...</option>
			        	<option key="male" value="malez">Male</option>
			        	<option key="female" value="female">Female</option>
			        </select>
			      </div>
			      <div className="form-group has-feedback">
			        <input type="text" className="form-control" id="username" placeholder="User name" required="true"/>
			        <span className="glyphicon glyphicon-user form-control-feedback"></span>
			      </div>
			      <div className="form-group has-feedback">
			        <input type="email" className="form-control" id="email" placeholder="Email" required="true"/>
			        <span className="glyphicon glyphicon-envelope form-control-feedback"></span>
			      </div>
			      <div className="form-group has-feedback">
			        <input type="password" className="form-control" id="password" placeholder="Password" required="true"/>
			        <span className="glyphicon glyphicon-lock form-control-feedback"></span>
			      </div>
			      <div className="form-group has-feedback">
			        <input type="password" className="form-control" id="repassword" placeholder="Retype password" required="true"/>
			        <span className="glyphicon glyphicon-log-in form-control-feedback"></span>
			      </div>
			      <div className="row">
			        <div className="col-xs-8">
			          <div className="checkbox">
			            <label>
			              <input type="checkbox"/> I agree to the <a href="#">terms</a>
			            </label>
			          </div>
			        </div>
			        <div className="col-xs-4">
			          <button type="submit" id="registerBtn" className="btn btn-primary btn-block btn-flat">Register</button>
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
}

export default Register;
