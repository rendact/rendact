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
    scrollToElement("#highlights", {
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

        <div className="wrapper style2">
          <div className="title">No Sidebar</div>
          <div id="main" className="container">
            {postData &&
              <div id="content">
                <article className="box post">
                  <header className="style1">
                    <h2>{postData.title && postData.title}</h2>
                  </header>
                  <a href="#" className="image featured">
                    <img src={postData.imageFeatured ? postData.imageFeatured.blobUrl: require('images/logo-128.png') } alt="" />
                  </a>
                  <p dangerouslySetInnerHTML={{__html: postData.content ? postData.content :""}} />
                </article>
              </div>
            }
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

export default Single;