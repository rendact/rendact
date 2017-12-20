import $ from 'jquery'
import React from 'react';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';
import moment from 'moment';
import {Link} from 'react-router';
import scrollToElement from 'scroll-to-element';

let Single = React.createClass({
  componentDidMount(){
    require('../assets/css/main.css')
  },

  componentWillMount(){
    document.body.className = "no-sidebar";
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
      postData,
      theConfig,
      data,
      thePagination,
      loadDone,
      isHome
    } = this.props

    return (
      <div>
        <div id="header-wrapper">
          <div id="header">
            <h1><Link to={"/"}>{theConfig?theConfig.name:"Rendact"}</Link></h1>
            <nav id="nav">
              {this.props.theMenu()}
            </nav>
          </div>
        </div>

        <div id="main-wrapper">
          <div className="container">
            {postData &&
              <article className="box post">
                <a href="#" className="image featured">
                  <img src={postData.imageFeatured ? postData.imageFeatured.blobUrl: require('images/logo-128.png') } alt="" />
                </a>
                <header>
                  <h2>{postData.title && postData.title}</h2>
                </header>
                <p dangerouslySetInnerHTML={{__html: postData.content ? postData.content :""}} />
              </article>
            }
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
    )
  }
});

export default Single;