import React from 'react'
import {Link} from 'react-router';
import Sidebar from 'react-sidebar';


class HeaderMobile extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      sidebarOpen: true
    }
  }

  render(){
    let component = <div id="navPanel"><nav>{this.props.theMenu}</nav></div>
    return (
      <div>
        <Sidebar
          sidebar={component}
          open={this.state.sidebarOpen}
          onSetOpen={(open) => {this.setState({sidebarOpen: open})}}
        >

            <div id="titleBar"><a href="#navPanel" className="toggle"></a><span className="title"> <Link to="/"><span>R</span>endact</Link> </span></div>
          </Sidebar>
          </div>
    )
  }
}

export default HeaderMobile
