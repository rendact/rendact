import $ from 'jquery'
import React from 'react';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';
import moment from 'moment';
import {Link} from 'react-router';
import scrollToElement from 'scroll-to-element';

let Single = React.createClass({
  componentDidMount(){
    require('../assets/css/main.css')
  },

  componentWillMount(){
    document.body.className = "landing";
  },

  render(){
    let {
      postData,
      theConfig,
      data,
      thePagination,
      loadDone,
      isHome
    } = this.props

    return (
      
      <div id="page-wrapper">

        <header id="header" className="ravael">
          <h1><a href="index.html">Home</a></h1>
          <nav id="nav">
            <ul>
              <li>
                <div className="dropdown">
                  <a href="#" className="icon fa-angle-down">Menu</a>
                  <div className="dropdown-content">
                    {this.props.theMenu()}
                  </div>
                </div>
              </li>
            </ul>
          </nav>
        </header>

        <section id="banner">
          <h2>{postData.title && postData.title}</h2>
        </section>

        {postData &&
        <section id="main" className="container">
          <section className="box special">
            <span className="image featured">
              <img src={postData.imageFeatured ? postData.imageFeatured.blobUrl: require('images/logo-128.png') } alt="" />
            </span>
            <header className="major">
              <p dangerouslySetInnerHTML={{__html: postData.content ? postData.content :""}} />
            </header>
          </section>
        </section>
        }

        <section id="cta">
          <div className="container">
            <div className="row">
              {this.props.footerWidgets &&
                this.props.footerWidgets.map((fw, idx) => <div className="4u">{fw}</div>)}
            </div>
          </div>
        </section>

        <footer id="footer">
          <ul className="icons">
            <li><a href="#" className="icon fa-twitter"><span className="label">Twitter</span></a></li>
            <li><a href="#" className="icon fa-facebook"><span className="label">Facebook</span></a></li>
            <li><a href="#" className="icon fa-instagram"><span className="label">Instagram</span></a></li>
            <li><a href="#" className="icon fa-github"><span className="label">Github</span></a></li>
            <li><a href="#" className="icon fa-dribbble"><span className="label">Dribbble</span></a></li>
            <li><a href="#" className="icon fa-google-plus"><span className="label">Google+</span></a></li>
          </ul>
          <ul className="copyright">
            <li>&copy; Rendact Team. All rights reserved.</li><li>Design: <a href="http://html5up.net">HTML5 UP</a></li>
          </ul>
        </footer>

    </div>
    )
  }
});

export default Single;