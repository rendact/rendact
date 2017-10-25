import React from 'react';
import Header from '../includes/Header';
import Sidebar from '../includes/Sidebar';

export default class Home extends React.Component {
  componentDidMount(){
    require('../assets/css/main.css')
  }

  render(){
    let {
      theConfig
    } = this.props

    return (
      <div id="wrapper">
        <div id="main">
          <div className="inner">
            <Header name={theConfig ? theConfig.name : "Rendact"} tagline={theConfig ? theConfig.tagline: "a simple blog"}/>

          </div>
        </div>
            <Sidebar {...this.props}/>
      </div>

    )
  }
}
