import React from 'react';
import MediaQuery from 'react-responsive';
/* NOTE:
 * need a modification on menu !!
 */

class Nav extends React.Component {
  links = (
    <ul className="links">
      <li className={this.props.isHome ?"active":null}>
        <a href=""><span className="label">Home</span></a>
      </li>

      <li>
        <a href=""><span className="label">Profile</span></a>
      </li>
      <li>
        <a href=""><span className="label">Charts</span></a>
      </li>
    </ul>
  )

  icons = (
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
  )

  render(){
    return <nav id="nav">
      <MediaQuery minDeviceWidth={1280}>
        {this.props.theMenu}
      </MediaQuery>
  </nav>
  }
}

export default Nav;
