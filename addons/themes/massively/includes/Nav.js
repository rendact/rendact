import React from 'react';
import MediaQuery from 'react-responsive';

class Nav extends React.Component {

  render(){
    return <nav id="nav">
      <MediaQuery minDeviceWidth={1280}>
        {this.props.theMenu("links")}
      </MediaQuery>
  </nav>
  }
}

export default Nav;
