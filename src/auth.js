import React from 'react';
import request from 'request';
import Auth0Lock from 'auth0-lock'
import {browserHistory, Match, Redirect } from 'react-router'
import Config from './config';
import AdminConfig from './admin/AdminConfig';
import Query from './admin/query';
import {riques, getConfig} from './utils';
import _ from 'lodash';
import {setLogged} from './actions';

window.browserHistory = browserHistory;
window.Redirect = Redirect;


export function AuthService(){
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
    var meta = {}
    var metaList = AdminConfig.userMetaList;
    var metaIdList = {};
    _.forEach(metaList, function(item){
      meta[item] = _.find(p.meta.edges, {"node": {"item": item}});
      metaIdList[item] = meta[item]?meta[item].node.id:null;
    })
    
    var roleList = [];
    _.forEach(p.roles.edges, function(item){
      roleList.push(item.node.name)
    })
    
    var profile = {
        name: p.fullName?p.fullName:p.username,
        username: p.username,
        email: p.email,
        gender: p.gender,
        image: p.image,
        lastLogin: p.lastLogin,
        createdAt: p.createdAt,
        biography: meta["bio"]?meta["bio"].node.value:"",
        dateOfBirth: p.dateOfBirth?p.dateOfBirth:"",
        phone: meta["phone"]?meta["phone"].node.value:"",
        country: p.country?p.country:"",
        timezone: meta["timezone"]?meta["timezone"].node.value:"",
        website: meta["website"]?meta["website"].node.value:"",
        facebook: meta["facebook"]?meta["facebook"].node.value:"",
        twitter: meta["twitter"]?meta["twitter"].node.value:"",
        linkedin: meta["linkedin"]?meta["linkedin"].node.value:"",
        userPrefConfig: meta["userPrefConfig"]?meta["userPrefConfig"].node.value:"",
        roles: roleList
    }
    
    localStorage.setItem("userId", p.id);
    localStorage.setItem('profile', JSON.stringify(profile));
    localStorage.setItem('metaIdList', JSON.stringify(metaIdList));
    //console.log("set profile: "+JSON.stringify(profile));

    if (meta["userPrefConfig"]){
      _.forEach(JSON.parse(meta["userPrefConfig"].node.value), function(value, key){
        localStorage.setItem(key, value);
      });
    }
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

      getUserQry = Query.getLoginAuth0Mtn(identities, localStorage.token, getConfig('auth0ClientId'));
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
      url: Config.graphqlApiUrl,
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
    return JSON.parse(localStorage.getItem('profile'))
  }

  this.logout = function() {
		var val = ["token","userId","profile","loginType","auth0_profile","config"];
		for(var i = 0; i < val.length; i++)
      localStorage.removeItem(val[i]);
		
    request({url: 'https://rendact.auth0.com/v2/logout'});
  }

  //this.checkAuth();
}

export const MatchWhenAuthorized = ({ component: Component, logged: Logged, authService: AuthService, onlogin: OnLogin, ...rest }) => (
  <Match {...rest} render={props => (
    Logged ? (
      <Component AuthService={AuthService} onlogin={setLogged} logged={Logged} {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )
  )}/>
)
