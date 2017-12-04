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

  render(){
    let { theConfig, latestPosts: data, thePagination, loadDone } = this.props;

    return (
    <div>
      <div id="header">
        <span className="logo icon">
          <Link to={"/"}>
            <img src={ require('images/logo-circle.svg') } alt="" />
          </Link>
        </span>
        <h1>{theConfig?theConfig.name:"Rendact"}</h1>
        <p>{theConfig?theConfig.tagline:"Hello, you are in Rendact"}</p>
        <nav id="menu">
          {this.props.theMenu()}
        </nav>
      </div>

      <div id="main">

        <header className="major container 90%">
        </header>

        <div className="box alt container">
          {data && data.map((post, index) => (
            <section className={index%2===0 ?"feature left" : "feature right"}>
              <Link className="image icon" to={"/post/" + post.id}>
                <img src={post.imageFeatured ? post.imageFeatured.blobUrl: require('images/logo-128.png') } alt="" />
              </Link>
              <div className="content">
                <h3>
                  <Link to={"/post/" + post.id}>{post.title && post.title}</Link>
                </h3>
                <p dangerouslySetInnerHTML={{__html: post.content ? post.content.slice(0, 160):""}} />
                <ul className="actions">
                  <li>
                    <Link className="button" to={"/post/" + post.id}>Read More</Link>
                  </li>
                </ul>
              </div>
            </section>
          ))}
        </div>

        <footer className="major container 90%">
          <div style={{textAlign: "center"}}>
            {this.props.thePagination}
          </div>
        </footer>

      </div>

      <div id="footer">
        <div className="container 100%">

          <div className="row">
            {this.props.footerWidgets && this.props.footerWidgets.map((fw, idx) => <div className="4u">{fw}</div>)}
          </div>

          <ul className="icons">
            <li><a href="#" className="icon fa-twitter"><span className="label">Twitter</span></a></li>
            <li><a href="#" className="icon fa-facebook"><span className="label">Facebook</span></a></li>
            <li><a href="#" className="icon fa-instagram"><span className="label">Instagram</span></a></li>
            <li><a href="#" className="icon fa-github"><span className="label">Github</span></a></li>
            <li><a href="#" className="icon fa-dribbble"><span className="label">Dribbble</span></a></li>
          </ul>

          <ul className="copyright">
            <li>&copy; Rendact Team. All rights reserved.</li><li>Design: <a href="http://html5up.net">HTML5 UP</a></li>
          </ul>

        </div>
      </div>

    </div>
    )
  }
});

export default Blog;