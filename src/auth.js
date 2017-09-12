import React from 'react';
import request from 'request';
import Auth0Lock from 'auth0-lock'
import { Match, Redirect } from 'react-router'
import Config from './config';
import AdminConfig from './admin/AdminConfig';
import Query from './admin/query';
import {riques, getConfig, setProfile} from './utils';
import _ from 'lodash';
import {setLogged, setCheckAuthDone} from './actions';
import gql from 'graphql-tag'
import {graphql} from 'react-apollo';
import Loading from './admin/Loading';
import {connect} from 'react-redux'

let MatchWhenAuthorized = React.createClass({
  propTypes: {
    checkAuthDone: React.PropTypes.bool,
    logged: React.PropTypes.bool.isRequired,
    pathname: React.PropTypes.string.isRequired,
  },
  getDefaultProps: function() {
    return {
      checkAuthDone: false, 
      logged: false,
      pathname: 'admin'
    }
  },
  render(){
    let Component = this.props.component;
    return <Match {...this.props} render={props => (
      this.props.logged ? (
        <Component onlogin={setLogged} logged={this.props.logged} {...props}/>
      ) : (
        <Redirect to={{
          pathname: '/login',
          state: { from: this.props.location }
        }}/>
      )
    )}/>
  }
});

const mapStateToProps = function(state){
  if (!_.isEmpty(state.main)) {
    var out = _.head(state.main);
    return out;
  } else return {}
}

MatchWhenAuthorized = connect(mapStateToProps)(MatchWhenAuthorized);

export { MatchWhenAuthorized };