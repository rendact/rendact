import $ from 'jquery'
import React from 'react';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';
import moment from 'moment';
import {Link} from 'react-router';
import scrollToElement from 'scroll-to-element';

let Home = React.createClass ({
  componentDidMount(){
    require('../assets/css/main.css')
  },

  componentWillMount(){
    document.body.className = "subpage";
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
      <div>
        <div id="page-wrapper">
          <div id="header-wrapper">
            <div className="container">
              <div className="row">
                <div className="12u">
                  <header id="header">
                    <h1 id="logo"><Link to={"/"}>Home</Link></h1>
                    <nav id="nav">
                      {this.props.theMenu()}
                    </nav>
                  </header>
                </div>
              </div>
            </div>
          </div>
          <div id="banner-wrapper">
            <div className="container">
              <div id="banner">
                <h2>{theConfig?theConfig.name:"Rendact"}</h2>
                <span>{theConfig?theConfig.tagline:"Hello, you are in Rendact"}</span>
              </div>
            </div>
          </div>
          <div id="main">
            <div className="container">
              <div className="row main-row">
                <div className="12u">
                {postData &&
                  <section>
                    <a><img src={postData.imageFeatured ? postData.imageFeatured.blobUrl: require('images/logo-128.png') } alt="" /></a>
                    <h2>{postData.title && postData.title}</h2>
                    <p dangerouslySetInnerHTML={{__html: postData.content ? postData.content :""}} />
                  </section>
                }
                </div>
              </div>
            </div>
          </div>
          <div id="footer-wrapper">
            <div className="container">
              <div className="row">
                <div className="12u 12u(mobile)">
                  <section>
                    <div>
                      <div className="row">
                        {this.props.footerWidgets &&
                        this.props.footerWidgets.map((fw, idx) =><div className="4u 12u(mobile)"><ul className="link-list">{fw}</ul></div>)}
                      </div>
                    </div>
                  </section>
                </div>
              </div>
              <div className="row">
                <div className="12u">
                  <div id="copyright">
                    &copy; Rendact. All rights reserved. | Design: <a href="http://html5up.net">HTML5 UP</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
});

export default Home;