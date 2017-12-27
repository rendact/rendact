import $ from 'jquery'
import React from 'react';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';
import moment from 'moment';
import {Link} from 'react-router';
import scrollToElement from 'scroll-to-element';

let Home = React.createClass({
  componentDidMount(){
    require('../assets/css/main.css')
  },

  handleScrolly(e){
    scrollToElement("#inti", {
      duration: 1500,
      offset: 0,
      ease: 'in-sine'
    })
  },

  render(){
    let {
      theConfig,
      data,
      thePagination,
      loadDone
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
                <div className="12u 12u(mobile)">
                  <section>
                    <h2>Just another blog post</h2>
                    <ul className="big-image-list">
                      {data && data.map((post, index) => (
                        <li>
                          <Link to={"/post/" + post.id}>
                            <img src={post.imageFeatured ? post.imageFeatured.blobUrl: require('images/logo-128.png') } alt="" className="left" />
                          </Link>
                          <h3><Link to={"/post/" + post.id}>{post.title && post.title}</Link></h3>
                          <p dangerouslySetInnerHTML={{__html: post.content ? post.content.slice(0, 300):""}} />
                          <footer className="controls">
                            <Link className="button" to={"/post/" + post.id}>Continue Reading</Link>
                          </footer>
                        </li>
                      ))}
                    </ul>
                  </section>
                </div>
              </div>
            </div>
            <div style={{textAlign: "center"}}>
                {this.props.thePagination}
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