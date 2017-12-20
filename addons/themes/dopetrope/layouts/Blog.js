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
    scrollToElement("#inti", {
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
              <div id="header">
                  <h1><Link to={"/"}>{theConfig?theConfig.name:"Rendact"}</Link></h1>
                  <nav id="nav">
                    {this.props.theMenu()}
                  </nav>
                  <section id="banner">
                    <header>
                      <h2>{theConfig?theConfig.name:"Rendact"}</h2>
                      <p>{theConfig?theConfig.tagline:"Hello, you are in Rendact"}</p>
                    </header>
                  </section>
              </div>
            </div>

            <div id="main-wrapper">
              <div className="container">
                <div className="row">
                  <div className="12u">
                      <section>
                        <header className="major">
                          <h2>The Blog</h2>
                        </header>
                        <div className="row">
                          {data && data.map((post, index) => (
                            <div className="6u 12u(mobile)">
                              <section className="box">
                                <Link className="image featured" to={"/post/" + post.id}>
                                  <img src={post.imageFeatured ? post.imageFeatured.blobUrl: require('images/logo-128.png') } alt="" />
                                </Link>
                                <header>
                                  <h3><Link to={"/post/" + post.id}>{post.title && post.title}</Link></h3>
                                  <p>Posted 45 minutes ago</p>
                                </header>
                                <p dangerouslySetInnerHTML={{__html: post.content ? post.content.slice(0, 160):""}} />
                                <footer>
                                  <ul className="actions">
                                    <li><Link className="button icon fa-file-text" to={"/post/" + post.id}>Continue Reading</Link></li>
                                    <li><a href="#" className="button alt icon fa-comment">33 comments</a></li>
                                  </ul>
                                </footer>
                              </section>
                            </div>
                          ))}
                        </div>
                      </section>
                  </div>
                </div>
              </div>
              <div style={{textAlign: "center"}}>
                {this.props.thePagination}
              </div>
            </div>

            <div id="footer-wrapper">
              <section id="footer" className="container">
                <div className="row">
                  {this.props.footerWidgets &&
                    this.props.footerWidgets.map((fw, idx) => <div className="4u 12u(mobile)">{fw}</div>)}
                </div>
                <div className="row">
                  <div className="12u">
                      <div id="copyright">
                        <ul className="links">
                          <li>&copy; Rendact. All rights reserved.</li><li>Design: <a href="http://html5up.net">HTML5 UP</a></li>
                        </ul>
                      </div>
                      <div id="copyright">
                        <ul className="social">
                          <li><a className="icon fa-facebook" href="#"><span className="label">Facebook</span></a></li>
                          <li><a className="icon fa-twitter" href="#"><span className="label">Twitter</span></a></li>
                          <li><a className="icon fa-dribbble" href="#"><span className="label">Dribbble</span></a></li>
                          <li><a className="icon fa-linkedin" href="#"><span className="label">LinkedIn</span></a></li>
                          <li><a className="icon fa-google-plus" href="#"><span className="label">Google+</span></a></li>
                        </ul>
                      </div>
                  </div>
                </div>
              </section>
            </div>
        </div>
      </div>
    )
  }
});

export default Blog;