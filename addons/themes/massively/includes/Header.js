import React from 'react';
import {Link} from 'react-router';

const Header = (props) => (
  <header id="header"><Link className="logo" to="/">{props.title}</Link></header>
)

export default Header;
