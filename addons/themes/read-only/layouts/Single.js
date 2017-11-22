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
      <section id="header">
        <header>
          <span className="image avatar">
            <Link to="/">
              <img src={ require('images/logo-128.png') } alt="" />
            </Link>
          </span>
          <h1 id="logo">MENU</h1>
        </header>
        <nav id="nav">
          {this.props.theMenu()}
        </nav>
        <footer>
          <ul className="icons">
            <li><a href="#" className="icon fa-twitter"><span className="label">Twitter</span></a></li>
            <li><a href="#" className="icon fa-facebook"><span className="label">Facebook</span></a></li>
            <li><a href="#" className="icon fa-instagram"><span className="label">Instagram</span></a></li>
            <li><a href="#" className="icon fa-github"><span className="label">Github</span></a></li>
            <li><a href="#" className="icon fa-envelope"><span className="label">Email</span></a></li>
          </ul>
        </footer>
      </section>

      <div id="wrapper">

          <div id="main">
            {postData &&
              <section id="one">
                <div className="container">
                  <header className="major">
                    <h2>{postData.title && postData.title}</h2>
                  </header>
                  <div className="features">
                      <article className="image">
                        <img src={postData.imageFeatured ? postData.imageFeatured.blobUrl: require('images/logo-128.png') } alt="" />
                      </article>
                      <article>
                        <p dangerouslySetInnerHTML={{__html: postData.content ? postData.content:""}} />
                      </article>
                  </div>
                </div>
              </section>
            }

                {this.props.footerWidgets &&
                this.props.footerWidgets.map((fw, idx) => 
                  <section><div className="container">{fw}</div></section>)}
              
          </div>

          <section id="footer">
            <div className="container">
              <ul className="copyright">
                <li>&copy; Rendact Team. All rights reserved.</li><li>Design: <a href="http://html5up.net">HTML5 UP</a></li>
              </ul>
            </div>
          </section>

      </div>
    </div>
    )
  }
});

export default Home;