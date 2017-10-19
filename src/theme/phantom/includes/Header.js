import React from 'react';
import {Link} from 'react-router';

class Header extends React.Component {
  render(){
    return (
        <header id="header" style={{background: "#fff"}}>
          <div className="inner">

            <Link to="/" className="logo">
              <span className="symbol">
                <img src="images/logo.svg" alt=""/>
              </span>
              <span className="title">Rendact</span>
            </Link>

            <nav>
              <ul>
                <li><a href="#menu">Menu</a></li>
              </ul>
            </nav>
          </div>
        </header>
    )
  }
}

export default Header;
