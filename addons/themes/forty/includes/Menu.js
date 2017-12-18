import React from 'react';

class Menu extends React.Component {
  handleCloseMenu(){
    document.body.className = "";
  }
  render(){
    return(
      <nav id="menu" onClick={this.handleCloseMenu}>
        <div className="inner">{this.props.theMenu("links")}</div>
        <a className="close" onClick={this.handleCloseMenu} href="#">Close</a>
      </nav>
    )
  }
}

export default Menu;
