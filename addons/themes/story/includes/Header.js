import React from 'react';
import {Link} from 'react-router';

class Header extends React.Component {
  render(){
    debugger
    return (
      <header id="header" className="reveal">
        <Link to="/" className="logo">
          <strong>{this.props.name}</strong> 
          <span>{this.props.tagline}</span>
        </Link>
        <nav>
          <div className="top-menu">
            <nav className="navigation">
              {this.props.theMenu()}
            </nav>    
          </div>
        </nav>
      </header>
    )
  }
}

export default Header;
