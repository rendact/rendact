import React from 'react';

class MenuItems extends React.Component {
  handleClose(e){
    e.preventDefault()
    document.body.className = ""
  }

  render(){
    return(
      <nav id="menu">
        <div className="inner">
          <h2>Menu</h2>
          <ul></ul>
        </div>
        <a className="close" onClick={this.handleClose} href="#menu">Close</a>
      </nav>
    )
  }
}

export default MenuItems;
