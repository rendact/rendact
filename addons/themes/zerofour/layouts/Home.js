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

  componentWillMount(){
    document.body.className = "homepage";
  },

  handleScrolly(e){
    scrollToElement("#main-wrapper", {
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
                  <header id="header">
                    <div className="inner">
                        <h1><Link to={"/"}>{theConfig?theConfig.name:"Rendact"}</Link></h1>
                        <nav id="nav">
                          {this.props.theMenu()}
                        </nav>
                    </div>
                  </header>
                  <div id="banner">
                    <h2><strong>{theConfig?theConfig.name:"Rendact"}</strong>
                    <br />
                    {theConfig?theConfig.tagline:"Hello, you are in Rendact"}</h2>
                    <p>Does this statement make you want to click the big shiny button?</p>
                    <a href="#" className="button big icon fa-check-circle" onClick={this.handleScrolly}>Yes it does</a>
                  </div>
              </div>
            </div>
            <div id="main-wrapper">
              <div className="wrapper style1">
                <div className="inner">
                    <section className="container box feature1">
                      <div className="row">
                        <div className="12u">
                          <header className="first major">
                            <h2 className="icon fa-file-text-o">Recent Posts</h2>
                          </header>
                        </div>
                      </div>
                      <div className="row">
                        {data && data.map((post, index) => (
                          <div className="6u 12u(mobile)">
                            <section>
                              <Link className="image featured first" to={"/post/" + post.id}>
                                <img src={post.imageFeatured ? post.imageFeatured.blobUrl: require('images/logo-128.png') } alt="" />
                              </Link>
                              <header className="second icon fa-user">
                                <h3><Link to={"/post/" + post.id}>{post.title && post.title}</Link></h3>
                              </header>
                              <p dangerouslySetInnerHTML={{__html: post.content ? post.content.slice(0, 160):""}} />
                              <ul className="actions">
                                <li><Link className="button alt icon fa-file-o" to={"/post/" + post.id}>Read More</Link></li>
                              </ul>
                            </section>
                          </div>
                        ))}
                        
                      </div>
                      <div className="row">
                        <div className="12u">
                          {this.props.thePagination}
                        </div>
                      </div>
                    </section>
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