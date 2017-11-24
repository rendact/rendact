import React from 'react';
import MediaQuery from 'react-responsive';

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
      document.body.className = "landing navPanel-visible"
  }

  handleNavPanelClose(e){
    if(document.body.className === "landing navPanel-visible" && e.currentTarget.id !== "navPanelToggle"){
      if (e.target.id !== "navPanel") document.body.className = "landing"
    }
  }
  render(){
    return (
      <div>
        <div id="navButton">
          <a className="toggle" href="#navPanel" onClick={this.handleNavPanelToggle}></a>
        </div>
        <div id="navPanel">
          <nav>
            <MediaQuery minDeviceWidth={980}>
              {this.props.theMenu()}
            </MediaQuery>
          </nav>
          <a href="#navPanel" className="close"></a>
        </div>
      </div>
    )
  }
}

export default NavPanel;
