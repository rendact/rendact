import React from 'react';
import { Match, Redirect } from 'react-router'
//import Query from './admin/query';
import _ from 'lodash'
import {setLogged} from './actions'
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
  componentWillMount: function(){
    if(!this.props.logged){
      this.props.dispatch({
        type: 'SET_REFERRER',
        referrer: window.location.pathname
      })
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
