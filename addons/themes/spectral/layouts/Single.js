import $ from 'jquery'
import React from 'react';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';
import scrollToElement from 'scroll-to-element';
import {Link} from 'react-router';

let Single = React.createClass({
  componentDidMount(){
    require('../assets/css/main.css')
  },

  handleShowMenu(){
    document.body.className = "is-menu-visible";
  },

  render(){
    let {
    	postData,
      theConfig,
      data,
      thePagination,
      loadDone
    } = this.props
    // debugger
    return (
    	<div>

        <div id="page-wrapper">

            <header id="header" className="">
            <strong>
              <Link to="/">
                <h1>{theConfig ? theConfig.name : "Rendact"}</h1>
              </Link>
            </strong>
            <nav id="nav">
              <ul>
                <li className="special">
                  <a href="#" onClick={this.handleShowMenu} className="menuToggle"><span>Menu</span></a>
                  
                </li>
              </ul>
            </nav>
          </header>
          {postData &&
            <article id="main">
              <header>
                <h2>Generic Page</h2>
                <p>Aliquam ut ex ut interdum donec amet imperdiet eleifend</p>
              </header>
              <section className="wrapper style5">
                <div className="inner">
                  <div style={{textAlign: "center"}}>
                    <img src={postData.imageFeatured ? postData.imageFeatured.blobUrl: require('images/logo-128.png') } alt="" />
                  </div>
                  <hr />
                  <h3>{postData.title && postData.title}</h3>
                  <p dangerouslySetInnerHTML={{__html: postData.content ? postData.content:""}} />
                </div>
              </section>
            </article>
          }
            <footer id="footer">
              <ul className="icons">
                <li><a href="#" className="icon fa-twitter"><span className="label">Twitter</span></a></li>
                <li><a href="#" className="icon fa-facebook"><span className="label">Facebook</span></a></li>
                <li><a href="#" className="icon fa-instagram"><span className="label">Instagram</span></a></li>
                <li><a href="#" className="icon fa-dribbble"><span className="label">Dribbble</span></a></li>
                <li><a href="#" className="icon fa-envelope-o"><span className="label">Email</span></a></li>
              </ul>
              <ul className="copyright">
                <li>&copy; Untitled</li><li>Design: <a href="http://html5up.net">HTML5 UP</a></li>
              </ul>
            </footer>

        </div>

      </div>
    )
  }
});

export default Single;