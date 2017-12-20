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

          <header id="header">
            <div className="logo container">
              <div>
                <h1><Link to={"/"}>{theConfig?theConfig.name:"Rendact"} </Link></h1>
                <p>{theConfig?theConfig.tagline:"Hello, you are in Rendact"}</p>
              </div>
            </div>
          </header>

          <nav id="nav">
            {this.props.theMenu()}
          </nav>

          <div id="banner-wrapper">
            <section id="banner">
              <h2><Link to={"/"}>{theConfig?theConfig.name:"Rendact"}</Link></h2>
              <p>{theConfig?theConfig.tagline:"Hello, you are in Rendact"}</p>
              <a href="#" className="button" onClick={this.handleScrolly}>Alright let's go</a>
            </section>
          </div>

          <div id="main-wrapper">
            <div id="main" className="container">
              <div className="row 200%">
                <div className="12u">

                    <section id="inti" className="box features">
                      <h2 className="major"><span>Posts</span></h2>
                      <div>
                        <div className="row">
                          {data && data.map((post, index) => (
                            <div className="6u 12u(mobile)">
                                <section className="box feature">
                                  <Link className="image featured" to={"/post/" + post.id}>
                                    <img src={post.imageFeatured ? post.imageFeatured.blobUrl: require('images/logo-128.png') } alt="" />
                                  </Link>
                                  <h3><Link to={"/post/" + post.id}>{post.title && post.title}</Link></h3>
                                  <p dangerouslySetInnerHTML={{__html: post.content ? post.content.slice(0, 160):""}} />
                                  <Link className="button" to={"/post/" + post.id}>Read More</Link>
                                </section>
                            </div>
                          ))}
                        </div>
                      </div>
                    </section>

                </div>
              </div>
            </div>
          </div>

          <footer id="footer" className="container">
            {this.props.footerWidgets &&
              this.props.footerWidgets.map((fw, idx) => <div className="row 200%"><div className="12u"><section>{fw}</section></div></div>)}
            <div className="row 200%">
              <div className="12u">

                  <section>
                    <h2 className="major"><span>Get in touch</span></h2>
                    <ul className="contact">
                      <li><a className="icon fa-facebook" href="#"><span className="label">Facebook</span></a></li>
                      <li><a className="icon fa-twitter" href="#"><span className="label">Twitter</span></a></li>
                      <li><a className="icon fa-instagram" href="#"><span className="label">Instagram</span></a></li>
                      <li><a className="icon fa-dribbble" href="#"><span className="label">Dribbble</span></a></li>
                      <li><a className="icon fa-google-plus" href="#"><span className="label">Google+</span></a></li>
                    </ul>
                  </section>

              </div>
            </div>

              <div id="copyright">
                <ul className="menu">
                  <li>&copy; Rendact. All rights reserved</li><li>Design: <a href="http://html5up.net">HTML5 UP</a></li>
                </ul>
              </div>

          </footer>

        </div>
      </div>
    )
  }
});

export default Home;