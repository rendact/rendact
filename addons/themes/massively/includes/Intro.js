import React from 'react';
import scrollToElement from 'scroll-to-element';

class Intro extends React.Component {
  handleScrolly(e){
    scrollToElement("#header", {
      duration: 1500,
      offset: 0,
      ease: 'in-sine'
    })
  }
  render(){
    return <div id="intro" className={this.props.intro?null:"hidden"}>
      <h1>{this.props.title}</h1>
      <p>{this.props.tagline}</p>
      <ul className="actions">
        <li><a className="button icon fa-arrow-down solo scrolly" href="#header" onClick={this.handleScrolly}>Continue</a></li>
      </ul>
    </div>
  }
}

export default Intro;
