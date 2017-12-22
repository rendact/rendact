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
             <div id="header">
                <h1><Link id="logo" to={"/"}>{theConfig?theConfig.name:"Rendact"}</Link></h1>
                <nav id="nav">
                  {this.props.theMenu()}
                </nav>
            </div>

            <section className="wrapper style1">
              <div className="container">
                <div id="content">
                  {postData &&
                    <article>
                      <header>
                        <h2>{postData.title && postData.title}</h2>
                      </header>
                      <span className="image featured">
                        <img src={postData.imageFeatured ? postData.imageFeatured.blobUrl: require('images/logo-128.png') } alt="" />
                      </span>
                      <p dangerouslySetInnerHTML={{__html: postData.content ? postData.content :""}} />
                    </article>
                  }
                </div>
              </div>
            </section>

            <div id="footer">
              <div className="container">
                <div className="row">
                  {this.props.footerWidgets &&
                  this.props.footerWidgets.map((fw, idx) => <div className="4u 12u(mobile)">{fw}</div>)}
                </div>
              </div>

                <ul className="icons">
                  <li><a href="#" className="icon fa-twitter"><span className="label">Twitter</span></a></li>
                  <li><a href="#" className="icon fa-facebook"><span className="label">Facebook</span></a></li>
                  <li><a href="#" className="icon fa-github"><span className="label">GitHub</span></a></li>
                  <li><a href="#" className="icon fa-linkedin"><span className="label">LinkedIn</span></a></li>
                  <li><a href="#" className="icon fa-google-plus"><span className="label">Google+</span></a></li>
                </ul>

                <div className="copyright">
                  <ul className="menu">
                    <li>&copy; Rendact. All rights reserved</li><li>Design: <a href="http://html5up.net">HTML5 UP</a></li>
                  </ul>
                </div>

            </div>

        </div>
      </div>
    )
  }
});

export default Home;