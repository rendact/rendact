import React from 'react';
import {Link} from 'react-router';

class Header extends React.Component {
  handleMenuClick(e){
    e.preventDefault()
    document.body.className = "is-menu-visible"
  }
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
                <li><a onClick={this.handleMenuClick} href="#menu">Menu</a></li>
              </ul>
            </nav>
          </div>
        </header>
    )
  }
}

export default Header;
