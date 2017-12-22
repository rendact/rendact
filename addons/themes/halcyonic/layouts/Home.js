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
              <div id="banner">
                <div className="container">
                  <div className="row">
                    <div className="6u 12u(mobile)">
                        <p>{theConfig?theConfig.tagline:"Hello, you are in Rendact"}</p>
                        <a href="#" className="button-big">Go on, click me!</a>
                    </div>
                    <div className="6u 12u(mobile)">
                        <a href="#" className="bordered-feature-image"><img src={require('images/logo-128.png') } alt="" /></a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div id="content-wrapper">
              <div id="content">
                <div className="container">
                  <div className="row">
                    {data && data.map((post, index) => (
                      <div className="4u 12u(mobile)">
                          <section>
                            <header>
                              <h2><Link to={"/post/" + post.id}>{post.title && post.title}</Link></h2>
                            </header>
                            <Link className="feature-image bordered-feature-image" to={"/post/" + post.id}>
                              <img src={post.imageFeatured ? post.imageFeatured.blobUrl: require('images/logo-128.png') } alt="" />
                            </Link>
                            <p dangerouslySetInnerHTML={{__html: post.content ? post.content.slice(0, 160):""}} />
                            <Link className="button" to={"/post/" + post.id}>Read More</Link>
                          </section>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div style={{textAlign: "center"}}>
                {this.props.thePagination}
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