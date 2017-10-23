import React from 'react';
import Nav from './Nav';
import Header from './Header';
import Intro from './Intro';

class HeaderWrapper extends React.Component {
  render(){
    return <div>
      <Intro intro={this.props.intro} title="Rendact" tagline="hello"/>
      <Header title="Rendact"/>
      <Nav/>
      </div>
  }
}

export default HeaderWrapper
