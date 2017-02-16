import React from 'react';
import request from 'request';
import Auth0Lock from 'auth0-lock'
import {browserHistory, Match, Redirect } from 'react-router'
window.browserHistory = browserHistory;
window.Redirect = Redirect;
import Config from './config';
import Query from './admin/query';
import $ from 'jquery';
window.jQuery = $;

function AuthService(){
  var me = this;
  this.lock = new Auth0Lock(Config.auth0ClientId, Config.auth0Domain, {
    auth: {
      redirectUrl: 'http://localhost:3000/login/redirect',
      responseType: 'token'
    }
  })

  var _setToken = function(idToken) {    
    console.log("set token: "+idToken);
    localStorage.setItem('token', idToken)
  }

  var _doAuthentication = function(authResult) {
    _setToken(authResult.idToken)
    
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
      window.location = '/admin';
    });
  }
  this.lock.on('authenticated', _doAuthentication);

  var _setProfile = function(p) {
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

  this.checkAuth = function(cb){
    console.log("AuthService checkAuth");
    var isAuth0 = false;
    if (!localStorage.token) return;

    let getUserQry = Query.getUserQry(localStorage.userId);
    try {
      var identities = JSON.parse(localStorage.auth0_profile).identities[0];
      identities.userId = identities.user_id;
      delete identities.user_id;

      getUserQry = Query.getLoginAuth0Mtn(identities, localStorage.token, Config.auth0ClientId);
      isAuth0 = true;
    } catch(e) {}
    
    request({
      url: Config.scapholdUrl,
      method: "POST",
      json: true,
      headers: {
        "content-type": "application/json",
        "Authorization": "Bearer " + localStorage.token
      },
      body: getUserQry
    }, (error, response, body) => {
      if (!error && !body.errors && body.data != null && response.statusCode === 200) {
        if (isAuth0) {
          if (body.data.loginUserWithAuth0Lock.user) {
            _setProfile(body.data.loginUserWithAuth0Lock.user);
          } else {
            console.log("checkAuth FAILED - no user data");
            this.logout();  
          }
        } else {
          if (body.data.getUser) {
            _setProfile(body.data.getUser);
          } else {
            console.log("checkAuth FAILED - no user data");
            this.logout();  
          }
        }
        console.log("checkAuth OK");
        cb(true);
      } else {
        console.log("checkAuth FAILED");
        this.logout();
      }
    });
  }

  this.doLogin = function(username, password, successFn, failedFn){
    console.log("AuthService doLogin");
    let loginUserQry = Query.loginUserQry(username, password);

    request({
      url: Config.scapholdUrl,
      method: "POST",
      json: true,
      headers: {
        "content-type": "application/json"
      },
      body: loginUserQry
    }, (error, response, body) => {
      if (!error && !body.errors && response.statusCode === 200) {
        if (body.data.loginUser) {
          var p = body.data.loginUser.user;
          localStorage.token = body.data.loginUser.token;
          localStorage.userId = p.id;
          _setProfile(p);
        }
        console.log("doLogin OK");
        if (successFn) successFn();
      } else {
        if (failedFn) {
          if (body && body.errors) {
            failedFn(body.errors[0].message);
          } else {
            failedFn(error.toString());
          }
        }
        console.log("doLogin FAILED");
      }
    });
  }

  this.showPopup = function() {
    this.lock.show()
  }

  this.loggedIn = function() {
    return !!this.getToken()
  }

  this.getToken = function() {
    return localStorage.getItem('token')
  }

  this.getProfile = function() {
    console.log("getProfile");
    return JSON.parse(localStorage.getItem('profile'))
  }

  this.logout = function() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('profile');
    localStorage.removeItem('loginType');
    localStorage.removeItem('auth0_profile');
    $.ajax('https://rendact.auth0.com/v2/logout');
  }

  //this.checkAuth();
}

const MatchWhenAuthorized = ({ component: Component, logged: Logged, authService: AuthService, ...rest }) => (
  <Match {...rest} render={props => (
    Logged ? (
      <Component AuthService={AuthService} logged={Logged} {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )
  )}/>
)

module.exports = {
  "AuthService": AuthService,
  "MatchWhenAuthorized": MatchWhenAuthorized
};