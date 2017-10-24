import React from 'react';
import MediaQuery from 'react-responsive';

class NavPanel extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      alt: false,
    }

    this.handleNavPanelToggle = this.handleNavPanelToggle.bind(this)
    this.handleNavPanelClose = this.handleNavPanelClose.bind(this)
    this.handleToggleAlt = this.handleToggleAlt.bind(this)
  }

  componentDidMount(){
    document.body.addEventListener("click", this.handleNavPanelClose)
    window.addEventListener("scroll", this.handleToggleAlt)
  }

  componentWillUnmount(){
    document.body.removeEventListener("click", this.handleNavPanelClose)
  }

  handleToggleAlt(e){
    let header = document.getElementById("header")
    if (header){
      let headerRect = header.getBoundingClientRect()

      if (window.pageYOffset <= headerRect.height + (5 * 0.68)){
        this.setState({alt: false})
      } else {
        this.setState({alt: true})
      }
    }
  }


  handleNavPanelToggle(e){
    e.preventDefault()
      document.body.className = "is-navPanel-visible"
  }

  handleNavPanelClose(e){
    if(document.body.className === "is-navPanel-visible" && e.currentTarget.id !== "navPanelToggle"){
      if (e.target.id !== "navPanel") document.body.className = ""
    }
  }
  render(){
    return (
      <div>
        <a className={this.state.alt?"alt":null} href="#navPanel" id="navPanelToggle" onClick={this.handleNavPanelToggle}>Menu</a>
        <div id="navPanel">
          <nav>
            <MediaQuery minDeviceWidth={980}>
              {this.props.theMenu("links")}
            </MediaQuery>
          </nav>
          <a href="#navPanel" className="close"></a>
        </div>
      </div>
    )
  }
}

export default NavPanel;
