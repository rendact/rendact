import React from "react";

class Nav extends React.Component {
  render() {
    return (
      <header id="header">
        <a className="title">Rendact</a>
        <nav>
          <ul>
            <li>
              <a>nav item 1</a>
              <a>nav item 2</a>
              <a>nav item 3</a>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}

export default Nav;
