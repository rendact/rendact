import React from 'react';

class Menu extends React.Component {
  handleCloseMenu(){
    document.body.className = "";
  }
  render(){
    return(
      <nav id="menu" onClick={this.handleCloseMenu}>
        <div className="inner">
          <h2>Menu</h2>
          <ul className="links">
            <li>{this.props.theMenu("links")}</li>
          </ul>
          <a href="#" className="close" onClick={this.handleCloseMenu}>Close</a>
        </div>
      </nav>
    )
  }
}

export default Menu;