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
    document.body.className = "no-sidebar";
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
                  <header id="header">
                    <div className="inner">
                        <h1><Link to={"/"}>{theConfig?theConfig.name:"Rendact"}</Link></h1>
                        <nav id="nav">
                          {this.props.theMenu()}
                        </nav>
                    </div>
                  </header>
              </div>
            </div>

            <div id="main-wrapper">
              <div className="wrapper style2">
                <div className="inner">
                  <div className="container">
                    <div id="content">
                      {postData &&
                        <article>
                          <header className="major">
                            <h2>{postData.title && postData.title}</h2>
                            <p>{postData.title && postData.title}</p>
                          </header>
                          <span className="image featured">
                            <img src={postData.imageFeatured ? postData.imageFeatured.blobUrl: require('images/logo-128.png') } alt="" />
                          </span>
                          <p dangerouslySetInnerHTML={{__html: postData.content ? postData.content :""}} />
                        </article>
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
                <div className="row">
                  <div className="12u">
                    <div id="copyright">
                      <ul className="menu">
                        <li>&copy; Rendact. All rights reserved</li><li>Design: <a href="http://html5up.net">HTML5 UP</a></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </footer>
            </div>

        </div>
      </div>
    )
  }
});

export default Home;