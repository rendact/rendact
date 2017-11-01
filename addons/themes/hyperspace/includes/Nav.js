import React from "react";
import { Link } from "react-router";

class Nav extends React.Component {
  render() {
    let { theMenu, title } = this.props;
    return (
      <header id="header">
        <Link to="/" className="title">
          {title}
        </Link>
        <nav>{theMenu()}</nav>
      </header>
    );
  }
}

export default Nav;
