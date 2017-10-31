import React from "react";
import { Link } from "react-router";

class Nav extends React.Component {
  render() {
    let theMenu = this.props.theMenu();
    return (
      <nav id="nav">
        {theMenu.props.menuItems.length ? (
          <ul className="icons" style={{ position: "absolute" }}>
            <li>
              <Link to="/" className="icon fa-home">
                {" "}
                Home
              </Link>
            </li>
          </ul>
        ) : null}
        {theMenu}
      </nav>
    );
  }
}

export default Nav;
