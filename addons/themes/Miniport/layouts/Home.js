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
        <nav id="nav">
          {this.props.theMenu()}
        </nav>

        <div className="wrapper style1 first">
          <article className="container" id="top">
            <div className="row">
              <div className="4u 12u(mobile)">
                <span className="image fit"><img src={require('images/lamp.jpg')} alt="" /></span>
              </div>
              <div id="logo" className="8u 12u(mobile)">
                <header>
                  <h1>
                    <strong>
                      <Link to={"/"}>{theConfig?theConfig.name:"Rendact"}</Link>
                    </strong>
                  </h1>
                </header>
                <p>{theConfig?theConfig.tagline:"Hello, you are in Rendact"}</p>
                <a href="#" className="button big scrolly" onClick={this.handleScrolly}>Learn more</a>
              </div>
            </div>
          </article>
        </div>

        <div id="inti" className="wrapper style3">
          <article id="portfolio">
            <div className="container">
              <div className="row">
                {data && data.map((post, index) => (
                  <div className="6u 12u(mobile)">
                    <article className="box style2">
                      <Link className="image featured" to={"/post/" + post.id}>
                        <img src={post.imageFeatured ? post.imageFeatured.blobUrl: require('images/logo-128.png') } alt="" />
                      </Link>
                      <h3><Link to={"/post/" + post.id}>{post.title && post.title}</Link></h3>
                      <p dangerouslySetInnerHTML={{__html: post.content ? post.content.slice(0, 120):""}} />
                      <Link className="button big scrolly" to={"/post/" + post.id}>Read More</Link>
                    </article>
                  </div>
                ))}
              </div>
            </div>
            <footer>
              <div style={{textAlign: "center"}}>
                {this.props.thePagination}
              </div>
            </footer>
          </article>
        </div>

        <div className="wrapper style4">
          <article id="contact" className="container 75%">
            <div>
              <div className="row">
                <div className="12u">
                  <form method="post" action="#">
                    <div>
                      {this.props.footerWidgets &&
                        this.props.footerWidgets.map((fw, idx) => <div className="12u">{fw}</div>)}
                    </div>
                  </form>
                </div>
              </div>
              <div className="row">
                <div className="12u">
                  <hr />
                  <h3>Find me on ...</h3>
                  <ul className="social">
                    <li><a href="#" className="icon fa-twitter"><span className="label">Twitter</span></a></li>
                    <li><a href="#" className="icon fa-facebook"><span className="label">Facebook</span></a></li>
                    <li><a href="#" className="icon fa-dribbble"><span className="label">Dribbble</span></a></li>
                    <li><a href="#" className="icon fa-linkedin"><span className="label">LinkedIn</span></a></li>
                    <li><a href="#" className="icon fa-tumblr"><span className="label">Tumblr</span></a></li>
                    <li><a href="#" className="icon fa-google-plus"><span className="label">Google+</span></a></li>
                    <li><a href="#" className="icon fa-github"><span className="label">Github</span></a></li>
                  </ul>
                  <hr />
                </div>
              </div>
            </div>
            <footer>
              <ul id="copyright">
                <li>&copy; Rendact. All rights reserved.</li><li>Design: <a href="http://html5up.net">HTML5 UP</a></li>
              </ul>
            </footer>
          </article>
        </div>
      </div>
    )
  }
});

export default Home;