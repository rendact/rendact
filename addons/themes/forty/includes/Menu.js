import React from 'react';

class Menu extends React.Component {
  render(){
    return(
      <nav id="menu">
        <div className="inner">{this.props.theMenu}</div>
        <a className="close" href="#">Close</a>
      </nav>
    )
  }
}

export default Menu;
