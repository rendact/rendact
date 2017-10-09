import React from 'react';
import { Match, Redirect } from 'react-router';
import {connect} from 'react-redux';

let MatchWhenAuthorized = React.createClass({
  propTypes: {
    logged: React.PropTypes.bool.isRequired,
  },
  getDefaultProps: function() {
    return {
      logged: false,
    }
  },
  render(){
    let Component = this.props.component;
     return  <Match {...this.props} render={props => (
      this.props.logged ? (
        <Component logged={this.props.logged} {...props}/>
      ) : (
        <Redirect push to={{
          pathname:"/login",
          state : {
            form: window.location.pathname
          }

        }}/>
      )
    )}/>
  }
});

const mapStateToProps = function(state){
    return state.main || {};
}

export default connect(mapStateToProps)(MatchWhenAuthorized)

