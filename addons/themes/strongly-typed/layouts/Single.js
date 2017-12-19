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
    scrollToElement("#main", {
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
        <div id="page-wrapper">

            <div id="header-wrapper">
            <div id="header" className="container">

                <h1 id="logo"><Link to={"/"}>{theConfig?theConfig.name:"Rendact"}</Link></h1>
                <p>{theConfig?theConfig.tagline:"Hello"}</p>

                <nav id="nav">
                  {this.props.theMenu()}
                </nav>

            </div>
          </div>

            <div id="main-wrapper">
              <div id="main" className="container">
                <div id="content">
                  {postData &&
                    <article className="box post">
                      <header>
                        <h2>{postData.title && postData.title}</h2>
                      </header>
                      <span className="image featured">
                        <img src={postData.imageFeatured ? postData.imageFeatured.blobUrl: require('images/logo-128.png') } alt="" />
                      </span>
                      <h3>{postData.title && postData.title}</h3>
                      <p dangerouslySetInnerHTML={{__html: postData.content ? postData.content :""}} />
                    </article>
                  }
                </div>
              </div>
            </div>

            <div id="footer-wrapper">
            <div id="footer" className="container">
              <div className="row">
                {this.props.footerWidgets &&
                  this.props.footerWidgets.map((fw, idx) => <div className="4u 12u(mobile)">{fw}</div>)}
              </div>
            </div>
            <div id="copyright" className="container">
              <ul className="links">
                <li>&copy; Rendact. All rights reserved.</li><li>Design: <a href="http://html5up.net">HTML5 UP</a></li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    )
  }
});

export default Single;