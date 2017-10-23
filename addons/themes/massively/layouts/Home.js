import React from 'react'
import HeaderWrapper from '../includes/HeaderWrapper';

class Home extends React.Component {
  componentDidMount(){
    require("../css/main.css")
    document.body.className = ""
  }
  render(){
    return <div className="fade-in" id="wrapper">
      <HeaderWrapper {...this.props}/>
      </div>
  }
}

export default Home;
