import $ from 'jquery'
import React from 'react';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';
import moment from 'moment';
import {Link} from 'react-router';
import scrollToElement from 'scroll-to-element';
// import NavPanel from '../includes/NavPanel';

let Blog = React.createClass({
  componentDidMount(){
    require('../assets/css/main.css')
  },

  componentWillMount(){
    document.body.className = "homepage";
  },

  handleScrolly(e){
    scrollToElement("#main", {
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
            <div id="header">
                <div className="inner">
                  <header>
                    <h1><Link to={"/"}>{theConfig?theConfig.name:"Rendact"}</Link></h1>
                    <hr />
                    <p>{theConfig?theConfig.tagline:"Hello"}</p>
                  </header>
                  <footer>
                    <a href="#" className="button circled scrolly" onClick={this.handleScrolly}>Start</a>
                  </footer>
                </div>
                <nav id="nav">
                    {this.props.theMenu()}
                </nav>
            </div>

            <div id="main" className="wrapper style1">
              <section id="features" className="container special">
                <div className="row">
                  {data && data.map((post, index) => (
                    <article className="6u 12u(mobile) special">
                      <Link className="image featured" to={"/post/" + post.id}>
                        <img src={post.imageFeatured ? post.imageFeatured.blobUrl: require('images/logo-128.png') } alt="" />
                      </Link>
                      <header>
                        <h3> <Link to={"/post/" + post.id}>{post.title && post.title}</Link></h3>
                      </header>
                      <p dangerouslySetInnerHTML={{__html: post.content ? post.content.slice(0, 160):""}} />
                      <footer>
                        <Link className="button" to={"/post/" + post.id}>Read More</Link>
                      </footer>
                    </article>
                  ))}
                </div>
              </section>

            </div>

            <div>
              <div style={{textAlign: "center"}}>
                {this.props.thePagination}
              </div>
            </div>

            <div id="footer">
              <div className="container">
                <div className="row">
                  <div className="row">
                    {this.props.footerWidgets &&
                      this.props.footerWidgets.map((fw, idx) => <div className="4u 12u(mobile)">{fw}</div>)}
                  </div>  
                </div>
                <hr />
                <div className="row">
                  <div className="12u">

                      <section className="contact">
                        <header>
                          <h3>{theConfig?theConfig.name:"Rendact"}</h3>
                        </header>
                        <p>{theConfig?theConfig.tagline:"Hello"}</p>
                        <ul className="icons">
                          <li><a href="#" className="icon fa-twitter"><span className="label">Twitter</span></a></li>
                          <li><a href="#" className="icon fa-facebook"><span className="label">Facebook</span></a></li>
                          <li><a href="#" className="icon fa-instagram"><span className="label">Instagram</span></a></li>
                          <li><a href="#" className="icon fa-pinterest"><span className="label">Pinterest</span></a></li>
                          <li><a href="#" className="icon fa-dribbble"><span className="label">Dribbble</span></a></li>
                          <li><a href="#" className="icon fa-linkedin"><span className="label">Linkedin</span></a></li>
                        </ul>
                      </section>

                      <div className="copyright">
                        <ul className="menu">
                          <li>&copy; Rendact. All rights reserved.</li><li>Design: <a href="http://html5up.net">HTML5 UP</a></li>
                        </ul>
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

export default Blog;