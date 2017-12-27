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
              <header id="header" className="container">
                <div className="row">
                  <div className="12u">
                      <h1 id="logo"><Link to={"/"}>{theConfig?theConfig.name:"Rendact"}</Link></h1>
                      <nav id="nav">
                        {this.props.theMenu()}
                      </nav>
                  </div>
                </div>
              </header>
            </div>
            <div id="content-wrapper">
              <div id="content">
                <div className="container">
                  <div className="row">
                    <div className="12u">
                      {postData &&
                        <section>
                          <a className="bordered-feature-image">
                            <img src={postData.imageFeatured ? postData.imageFeatured.blobUrl: require('images/logo-128.png') } alt="" />
                          </a>
                          <header>
                            <h2>{postData.title && postData.title}</h2>
                          </header>
                          <p dangerouslySetInnerHTML={{__html: postData.content ? postData.content :""}} />
                        </section>
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div id="footer-wrapper">
              <footer id="footer" className="container">
                <div className="row">
                  {this.props.footerWidgets &&
                  this.props.footerWidgets.map((fw, idx) => <div className="4u 12u(mobile)">{fw}</div>)}
                </div>
              </footer>
            </div>
            <div id="copyright">
              &copy; Rendact. All rights reserved. | Design: <a href="http://html5up.net">HTML5 UP</a>
            </div>
        </div>
      </div>
    )
  }
});

export default Home;