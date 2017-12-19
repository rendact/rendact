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
    scrollToElement("#highlights", {
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
            <div id="header-wrapper" className="wrapper">
              <div id="header">
                  <div id="logo">
                    <h1><Link to={"/"}>{theConfig?theConfig.name:"Rendact"}</Link></h1>
                    <p>{theConfig?theConfig.tagline:"Hello"} </p>
                  </div>
                  <nav id="nav">
                    {this.props.theMenu()}
                  </nav>
              </div>
            </div>

            <div className="wrapper style3">
              <div className="title">
                <a href="#" className="" onClick={this.handleScrolly}>Posts</a>
              </div>
              <div id="highlights" className="container">
                <div className="row 150%">
                  {data && data.map((post, index) => (
                    <div className="6u 12u(mobile)">
                      <section className="highlight">
                        <Link className="image featured" to={"/post/" + post.id}>
                          <img src={post.imageFeatured ? post.imageFeatured.blobUrl: require('images/logo-128.png') } alt="" />
                        </Link>
                        <h3><Link to={"/post/" + post.id}>{post.title && post.title}</Link></h3>
                        <p dangerouslySetInnerHTML={{__html: post.content ? post.content.slice(0, 160):""}} />
                        <ul className="actions">
                          <li><Link className="button style1" to={"/post/" + post.id}>Read More</Link></li>
                        </ul>
                      </section>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{textAlign: "center"}}>
                {this.props.thePagination}
              </div>
            </div>

            <div id="footer-wrapper" className="wrapper">
              <div className="title">Footer</div>
              <div id="footer" className="container">
                <hr />
                <div className="row">
                    {this.props.footerWidgets &&
                      this.props.footerWidgets.map((fw, idx) => <div className="4u 12u(mobile)">{fw}</div>)}
                </div>
                <hr />
              </div>
              <div id="copyright">
                <ul>
                  <li>&copy; Untitled</li><li>Design: <a href="http://html5up.net">HTML5 UP</a></li>
                </ul>
              </div>
            </div>
        </div>
      </div>
    )
  }
});

export default Blog;