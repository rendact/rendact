import React from 'react';
import request from 'request';
import Auth0Lock from 'auth0-lock'
import {browserHistory, Match, Redirect } from 'react-router'
window.browserHistory = browserHistory;
window.Redirect = Redirect;
import Config from './config';
import Query from './admin/query';
import {riques} from './utils';
import _ from 'lodash';

function AuthService(){
  var me = this;
  this.lock = new Auth0Lock(Config.auth0ClientId, Config.auth0Domain, {
    auth: {
      redirectUrl: 'http://localhost:3000/login/redirect',
      responseType: 'token'
    }
  })

  var _setToken = function(idToken) {    
    //console.log("set token: "+idToken);
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
    var metaBio = _.find(p.meta.edges, {"node": {"item": "bio"}});
    var profile = {
      name: p.fullName?p.fullName:p.username,
      username: p.username,
      email: p.email,
      gender: p.gender,
      image: p.image,
      lastLogin: p.lastLogin,
      createdAt: p.createdAt,
      biography: metaBio?metaBio.node.value:"",
      birth: p.dateOfBirth?p.dateOfBirth:"",
      phone: p.phone?p.phone:"",
      country: p.country?p.country:"",
      timezone: p.timezone?p.timezone:"",
      website: p.website?p.website:"",
      facebook: p.facebook?p.facebook:"",
      twitter: p.twitter?p.twitter:"",
      linkedin: p.linkedin?p.linkedin:""
    }
    localStorage.setItem("userId", p.id);
    localStorage.setItem('profile', JSON.stringify(profile));
    //console.log("set profile: "+JSON.stringify(profile));
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
    
    var me = this;
    riques(getUserQry, 
      function(error, response, body) {
        if (!error && !body.errors && body.data != null && response.statusCode === 200) {
          if (isAuth0) {
            if (body.data.loginUserWithAuth0Lock.user) {
              _setProfile(body.data.loginUserWithAuth0Lock.user);
            } else {
              console.log("checkAuth FAILED - no user data");
              me.logout();  
            }
          } else {
            if (body.data.getUser) {
              _setProfile(body.data.getUser);
            } else {
              console.log("checkAuth FAILED - no user data");
              me.logout();  
            }
          }
          console.log("checkAuth OK");
          if (cb) cb(true);
        } else {
          console.log("checkAuth FAILED");
          me.logout();
        }
      }
    );
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
    request({url: 'https://rendact.auth0.com/v2/logout'});
  }

  //this.checkAuth();
}

const MatchWhenAuthorized = ({ component: Component, logged: Logged, authService: AuthService, onlogin: OnLogin, ...rest }) => (
  <Match {...rest} render={props => (
    Logged ? (
      <Component AuthService={AuthService} onlogin={OnLogin} logged={Logged} {...props}/>
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