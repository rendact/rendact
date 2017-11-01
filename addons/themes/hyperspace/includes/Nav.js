import React from "react";

class Nav extends React.Component {
  render() {
    return (
      <header id="header">
        <a className="title">Rendact</a>
        <ul>
          <li>
            <a>nav item 1</a>
            <a>nav item 2</a>
            <a>nav item 3</a>
          </li>
        </ul>
      </header>
    );
  }
}

export default Nav;
