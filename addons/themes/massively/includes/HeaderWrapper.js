import React from 'react';
import Nav from './Nav';
import Header from './Header';
import Intro from './Intro';

class HeaderWrapper extends React.Component {
  render(){
    return <div>
      {this.props.isHome &&
        <Intro intro={this.props.intro} title="Rendact" tagline="hello"/>
      }
      <Header title="Rendact"/>
      <Nav theMenu={this.props.theMenu} isHome={this.props.isHome}/>
      </div>
  }
}

export default HeaderWrapper
