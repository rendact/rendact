import React from 'react';

class Intro extends React.Component {
  render(){
    return <div id="intro" className={this.props.intro?null:"hidden"}>
      <h1>{this.props.title}</h1>
      <p>{this.props.tagline}</p>
      <ul className="actions">
        <li><a className="button icon fa-arrow-down solo scrolly" href="#header">Continue</a></li>
      </ul>
    </div>
  }
}

export default Intro;
