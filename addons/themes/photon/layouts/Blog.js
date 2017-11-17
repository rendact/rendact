import $ from 'jquery'
import React from 'react';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';
import scrollToElement from 'scroll-to-element';
import {Link} from 'react-router';

let Blog = React.createClass({
  componentDidMount(){
    require('../assets/css/main.css')
  },

  handleScrolly(e){
    scrollToElement("#one", {
      duration: 1500,
      offset: 0,
      ease: 'in-sine'
    })
  },

  render(){
    let { theConfig, latestPosts: data, thePagination, loadDone } = this.props;
  
    return (
      <div>
        <header id="head">
          <h1 id="logo"><Link to="/"><strong>{theConfig ? theConfig.name : "Rendact"}</strong></Link></h1>
          <nav id="nav">
                {this.props.theMenu()}
          </nav>
        </header>

        <section id="header">
          <div className="inner">
            <span className="icon major fa-cloud"></span>
            <div>
              <Link to="/">
                <span className="image nofit"><img src={require('images/logo-128.png') } alt="" /></span>
              </Link>
            </div>
            <p>{theConfig ? theConfig.tagline : "Accumsan feugiat mi commodo erat lorem ipsum"}</p>
            <ul className="actions">
              <li><a href="#" className="button scrolly"  onClick={this.handleScrolly}>Discover</a></li>
            </ul>
          </div>
        </section>

        {data && data.map((post, index) => (
          <section id="one" className={index%2===0 ? "main style12" : "main style11"}>
            <div className="container">
              <div className="row 150%">
                <div className="6u 12u$(medium)">
                  <header className="major">
                    <h2><strong><Link to={"/post/" + post.id}>{post.title && post.title}</Link></strong></h2>
                  </header>
                  <p dangerouslySetInnerHTML={{__html: post.content ? post.content.slice(0, 200):""}} />
                </div>
                <div className="6u 12u$(medium) important(medium)">
                  <span className="image fit">
                    <Link to={"/post/" + post.id}>
                      <img src={post.imageFeatured ? post.imageFeatured.blobUrl: require('images/logo-128.png') } alt="" />
                    </Link>
                  </span>
                </div>
              </div>
            </div>
          </section>
        ))}

        <section id="three" className="main style1 special">
          <div className="container">
            <header className="major">
              <div style={{textAlign: "center"}}>
                {thePagination}
              </div>
            </header>
          </div>
        </section>

        <section id="two" className="main style2">
          <div className="container">
            <div className="row 150%">
              <div className="6u 12u$(medium)">
                <ul className="major-icons">
                  <li><span className="icon style1 major fa-code"></span></li>
                  <li><span className="icon style2 major fa-bolt"></span></li>
                  <li><span className="icon style3 major fa-camera-retro"></span></li>
                  <li><span className="icon style4 major fa-cog"></span></li>
                  <li><span className="icon style5 major fa-desktop"></span></li>
                  <li><span className="icon style6 major fa-calendar"></span></li>
                </ul>
              </div>
              <div className="6u 12u$(medium)">
                {this.props.footerWidgets.map((fw, i) => (
                      <section key={i}>{fw}</section>
                    ))}
              </div>
            </div>
          </div>
        </section>

        <section id="footer">
          <ul className="icons">
            <li><a href="#" className="icon alt fa-twitter"><span className="label">Twitter</span></a></li>
            <li><a href="#" className="icon alt fa-facebook"><span className="label">Facebook</span></a></li>
            <li><a href="#" className="icon alt fa-instagram"><span className="label">Instagram</span></a></li>
            <li><a href="#" className="icon alt fa-github"><span className="label">GitHub</span></a></li>
            <li><a href="#" className="icon alt fa-envelope"><span className="label">Email</span></a></li>
          </ul>
          <ul className="copyright">
            <li>&copy; Rendact</li><li>Design: Rendact Team & <a href="http://html5up.net">HTML5 UP</a></li>
          </ul>
        </section>

      </div>
    )
  }
});

export default Blog;