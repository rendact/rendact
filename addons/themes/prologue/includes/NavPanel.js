import React from 'react';
import MediaQuery from 'react-responsive';
import {Link} from 'react-router';

class NavPanel extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      toggle: false,
    }

    this.handleNavPanelToggle = this.handleNavPanelToggle.bind(this)
    this.handleNavPanelClose = this.handleNavPanelClose.bind(this)
    this.handleToggletoggle = this.handleToggletoggle.bind(this)
  }

  componentDidMount(){
    document.body.addEventListener("click", this.handleNavPanelClose)
    window.addEventListener("scroll", this.handleToggletoggle)
  }

  componentWillUnmount(){
    document.body.removeEventListener("click", this.handleNavPanelClose)
  }

  handleToggletoggle(e){
    let header = document.getElementById("header")
    if (header){
      let headerRect = header.getBoundingClientRect()

      if (window.pageYOffset <= headerRect.height + (5 * 0.68)){
        this.setState({toggle: false})
      } else {
        this.setState({toggle: true})
      }
    }
  }


  handleNavPanelToggle(e){
    e.preventDefault()
      document.body.className = "header-visible"
  }

  handleNavPanelClose(e){
    if(document.body.className === "header-visible" && e.currentTarget.id !== "headerToggle"){
      if (e.target.id !== "header") document.body.className = ""
    }
  }
  render(){
    return (
      <div id="headerToggle">
        <a className="toggle" href="#header" onClick={this.handleNavPanelToggle}></a>
        
        <a href="#header" className="close"></a>
      </div>
    )
  }
}

export default NavPanel;
