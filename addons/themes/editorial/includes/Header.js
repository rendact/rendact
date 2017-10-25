import React from 'react';
import {Link} from 'react-router';

class Header extends React.Component {
  render(){
    return (
      <header id="header">
        <Link to="/" className="logo"><strong>{this.props.name}</strong> {this.props.tagline}</Link>
        <ul className="icons">
          <li>
            <a className="icon fa-facebook" href=""></a>
            <a className="icon fa-twitter" href=""></a>
            <a className="icon fa-medium" href=""></a>
          </li>
        </ul>
      </header>
    )
  }
}

export default Header;
