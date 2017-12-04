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
      {postData &&
        <div id="main">
          <header className="major container 90%">
            <div>
              <img src={postData.imageFeatured ? postData.imageFeatured.blobUrl: require('images/logo-128.png') } alt="" />
            </div>
          </header>
          <footer className="major container 75%">
            <h3>{postData.title && postData.title}</h3>
            <p dangerouslySetInnerHTML={{__html: postData.content ? postData.content:""}} />
          </footer>
        </div>
      }

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

export default Single;