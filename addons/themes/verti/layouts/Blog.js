import $ from 'jquery'
import React from 'react';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';
import moment from 'moment';
import {Link} from 'react-router';
import scrollToElement from 'scroll-to-element';

let Blog = React.createClass({
  componentDidMount(){
    require('../assets/css/main.css')
  },

  componentWillMount(){
    document.body.className = "homepage";
  },

  handleScrolly(e){
    scrollToElement("#features-wrapper", {
      duration: 1500,
      offset: 0,
      ease: 'in-sine'
    })
  },

  handleInfo(e){
    scrollToElement("#footer", {
      duration: 1500,
      offset: 0,
      ease: 'in-sine'
    })
  },

  render(){
    let { theConfig, latestPosts: data, thePagination, loadDone } = this.props;

    return (
      <div>
        <div id="page-wrapper">
          <div id="header-wrapper">
            <header id="header" className="container">

                <div id="logo">
                  <h1><Link to={"/"}>{theConfig?theConfig.name:"Rendact"}</Link></h1>
                  <span>TEAM</span>
                </div>

                <nav id="nav">
                  {this.props.theMenu()}
                </nav>

            </header>
          </div>

          <div id="banner-wrapper">
            <div id="banner" className="box container">
              <div className="row">
                <div className="7u 12u(medium)">
                  <h2>{theConfig?theConfig.name:"Rendact"}</h2>
                  <p>{theConfig?theConfig.tagline:"Hello, you are in Rendact"}</p>
                </div>
                <div className="5u 12u(medium)">
                  <ul>
                    <li><a href="#" className="button big icon fa-arrow-circle-right" onClick={this.handleScrolly}>Ok let's go</a></li>
                    <li><a href="#" className="button alt big icon fa-question-circle" onClick={this.handleInfo}>More info</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div id="features-wrapper">
            <div className="container">
              <div className="row">
                {data && data.map((post, index) => (
                  <div className="4u 12u(medium)">
                      <section className="box feature">
                        <Link className="image featured" to={"/post/" + post.id}>
                          <img src={post.imageFeatured ? post.imageFeatured.blobUrl: require('images/logo-128.png') } alt="" />
                        </Link>
                        <div className="inner">
                          <header>
                            <h2><Link to={"/post/" + post.id}>{post.title && post.title}</Link></h2>
                          </header>
                          <p dangerouslySetInnerHTML={{__html: post.content ? post.content.slice(0, 110):""}} />
                          <Link className="button icon fa-file-text-o" to={"/post/" + post.id}>More</Link>
                        </div>
                      </section>
                  </div>
                ))}
                
              </div>
            </div>
          </div>

          <div id="main-wrapper">
          <div style={{textAlign: "center"}}>
              {this.props.thePagination}
            </div>
          </div>

          <div id="footer-wrapper">
            <footer id="footer" className="container">
              <div className="row">
                {this.props.footerWidgets &&
                  this.props.footerWidgets.map((fw, idx) => <div className="4u">{fw}</div>)}
              </div>
              
              <div className="row">
                <div className="12u">
                  <div id="copyright">
                    <ul className="menu">
                      <li>&copy; Rendact. All rights reserved</li><li>Design: <a href="http://html5up.net">HTML5 UP</a></li>
                      <br />
                      <li>
                        <section className="widget contact last">
                          <h3>Contact Us</h3>
                          <ul>
                            <li><a href="#" className="icon fa-twitter"><span className="label">Twitter</span></a></li>
                            <li><a href="#" className="icon fa-facebook"><span className="label">Facebook</span></a></li>
                            <li><a href="#" className="icon fa-instagram"><span className="label">Instagram</span></a></li>
                            <li><a href="#" className="icon fa-dribbble"><span className="label">Dribbble</span></a></li>
                            <li><a href="#" className="icon fa-pinterest"><span className="label">Pinterest</span></a></li>
                          </ul>
                        </section>
                      </li>
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

export default Blog;