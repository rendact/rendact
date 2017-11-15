import $ from 'jquery'
import React from 'react';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';
import moment from 'moment';
import {Link} from 'react-router';

let Home = React.createClass({
  componentDidMount(){
    require('../css/demo.css');
    require('../css/style1.css');
    require('../css/style2.css');
    require('../css/style3.css');
    require('../css/style4.css');
  },

  render(){
    let {
      theConfig,
      data,
      thePagination,
      loadDone
    } = this.props
    // debugger
    return (

      <div>
        <ul className="cb-slideshow">
            <li><span>Image 01</span><div><h3>re·lax·a·tion</h3></div></li>
            <li><span>Image 02</span><div><h3>qui·e·tude</h3></div></li>
            <li><span>Image 03</span><div><h3>bal·ance</h3></div></li>
            <li><span>Image 04</span><div><h3>e·qua·nim·i·ty</h3></div></li>
            <li><span>Image 05</span><div><h3>com·po·sure</h3></div></li>
            <li><span>Image 06</span><div><h3>se·ren·i·ty</h3></div></li>
        </ul>
        <div className="container">
            
            <div className="codrops-top">
                <a href="http://tympanus.net/Development/RockingLetters/">
                    <strong>&laquo; Previous Demo: </strong>Rocking Letters with CSS3 &amp; jQuery
                </a>
                <span className="right">
                    <a href="http://www.flickr.com/photos/markjsebastian/" target="_blank">Photography by Mark Sebastian</a>
                    <a href="http://creativecommons.org/licenses/by-sa/2.0/deed.en" target="_blank">CC BY-SA 2.0</a>
                    <a href="http://tympanus.net/codrops/2012/01/02/fullscreen-background-image-slideshow-with-css3/">
                        <strong>Back to the Codrops Article</strong>
                    </a>
                </span>
                <div className="clr"></div>
            </div>
            <header>
                <h1>CSS3 <span>Fullscreen Slideshow</span></h1>
                <h2>A CSS-only slideshow for background images</h2>
        <p className="codrops-demos">
          <a href="#" className="current-demo">Demo 1</a>
          <a href="index2.html">Demo 2</a>
          <a href="index3.html">Demo 3</a>
          <a href="index4.html">Demo 4</a>
        </p>
            </header>
        </div>
      </div>

    )
  }
});

export default Home;