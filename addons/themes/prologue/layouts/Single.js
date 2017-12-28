import $ from 'jquery'
import React from 'react';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';
import moment from 'moment';
import {Link} from 'react-router';
import scrollToElement from 'scroll-to-element';
import NavPanel from '../includes/NavPanel';

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
      <div id="header">
        <div className="top">
            <div id="logo">
              <span className="image avatar48">
                <img src={ require('images/favicon-96x96.png') } alt="" />
              </span>
              <h1 id="title"><Link to={"/"}>{theConfig?theConfig.name:"Rendact"}</Link></h1>
              <p>{theConfig?theConfig.tagline:"Hello"}.</p>
            </div>
            <nav id="nav">
              {this.props.theMenu()}
            </nav>
        </div>

        <div className="bottom">
            <ul className="icons">
              <li><a href="#" className="icon fa-twitter"><span className="label">Twitter</span></a></li>
              <li><a href="#" className="icon fa-facebook"><span className="label">Facebook</span></a></li>
              <li><a href="#" className="icon fa-github"><span className="label">Github</span></a></li>
              <li><a href="#" className="icon fa-dribbble"><span className="label">Dribbble</span></a></li>
              <li><a href="#" className="icon fa-envelope"><span className="label">Email</span></a></li>
            </ul>
        </div>
      </div>

      <div id="main">
          <section id="top" className="one dark cover">
            <div className="container">
              <header>
                <h2 className="alt">Hi! I'm <strong>{theConfig?theConfig.name:"Rendact"}</strong></h2>
                <p>{theConfig?theConfig.tagline:"Hello"}.</p>
              </header>
              <footer>
                <a href="#" className="button scrolly" onClick={this.handleScrolly}>Start</a>
              </footer>
            </div>
          </section>
          
          <section id="about" className="three">
            {postData &&
              <div className="container">
                <header>
                  <h2>{postData.title && postData.title}</h2>
                </header>
                <a className="image featured">
                  <img src={postData.imageFeatured ? postData.imageFeatured.blobUrl: require('images/logo-128.png') } alt="" />
                </a>
                <p dangerouslySetInnerHTML={{__html: postData.content ? postData.content:""}} />
              </div>
            }
          </section>

          <section id="contact" className="four">
            <div className="container">
              <form method="post">
                <div className="row">
                  {this.props.footerWidgets &&
                  this.props.footerWidgets.map((fw, idx) => 
                  <div className="4u 12u$(mobile)">{fw}</div>)}
                </div>
              </form>
            </div>
          </section>
      </div>
    <NavPanel {...this.props}/>
    </div>
    )
  }
});

export default Home;