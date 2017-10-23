import React from 'react';

const Nav = (props) => (
  <nav id="nav">
    <ul className="links">
      <li>
        <a href=""><span className="label">Home</span></a>
      </li>
      <li>
        <a href=""><span className="label">Profile</span></a>
      </li>
      <li>
        <a href=""><span className="label">Charts</span></a>
      </li>
    </ul>

    <ul className="icons">
      <li>
        <a href=""><span className="label">1</span></a>
      </li>
      <li>
        <a href=""><span className="label">2</span></a>
      </li>
      <li>
        <a href=""><span className="label">3</span></a>
      </li>
    </ul>
  </nav>
);

export default Nav;
