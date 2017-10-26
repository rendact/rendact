import React from 'react';
import {Link} from 'react-router';


class Header extends React.Component {
  render(){

    let {
      name,
      tagline
    } = this.props;

    return (
      <header id="header" className="reveal">
        <Link className="logo" to="/">
          <strong>{name}</strong>
          <span>{tagline}</span>
        </Link>
        <nav><a href="#menu">Menu</a></nav>
      </header>
    )
  }
}

export default Header;
