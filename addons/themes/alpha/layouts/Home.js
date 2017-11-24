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

  componentWillMount(){
    document.body.className = "landing";
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
      theConfig,
      data,
      thePagination,
      loadDone
    } = this.props

    return (
    <div>
      <div id="page-wrapper">
        <header id="header" className="ravael">
          <h1><a href="index.html">Home</a></h1>
          <nav id="nav">
            <ul>
              <li>
                <div className="dropdown">
                  <a href="#" className="icon fa-angle-down">Menu</a>
                  <div className="dropdown-content">
                    {this.props.theMenu()}
                  </div>
                </div>
              </li>
            </ul>
          </nav>
        </header>

        <section id="banner">
          <h2>{theConfig?theConfig.name:"Rendact"}</h2>
          <p>{theConfig?theConfig.tagline:"Hello"}</p>
          <ul className="actions">
            <li><a href="#" className="button" onClick={this.handleScrolly}>Learn More</a></li>
          </ul>
        </section>

        <section id="main" className="container">
            
          <div className="row">
            {data && data.map((post, index) => (
              <div className="6u 12u(narrower)">
                <section className="box special">
                  <Link className="image featured" to={"/post/" + post.id}>
                    <img src={post.imageFeatured ? post.imageFeatured.blobUrl: require('images/logo-128.png') } alt="" />
                  </Link>
                  <h3>{post.title && post.title}</h3>
                  <p dangerouslySetInnerHTML={{__html: post.content ? post.content.slice(0, 200):""}} />
                  <ul className="actions">
                    <li>
                      <Link className="button alt" to={"/post/" + post.id}>Read More</Link>
                    </li>
                  </ul>
                </section>
              </div>
            ))}
          </div>
        </section>

        <section class="box special features">
          <div style={{textAlign: "center"}}>
            {this.props.thePagination}
          </div>
        </section>

        <section id="cta">
          <div className="container">
            <div className="row">
              {this.props.footerWidgets &&
                this.props.footerWidgets.map((fw, idx) => <div className="4u">{fw}</div>)}
            </div>
          </div>
        </section>

        <footer id="footer">
          <ul className="icons">
            <li><a href="#" className="icon fa-twitter"><span className="label">Twitter</span></a></li>
            <li><a href="#" className="icon fa-facebook"><span className="label">Facebook</span></a></li>
            <li><a href="#" className="icon fa-instagram"><span className="label">Instagram</span></a></li>
            <li><a href="#" className="icon fa-github"><span className="label">Github</span></a></li>
            <li><a href="#" className="icon fa-dribbble"><span className="label">Dribbble</span></a></li>
            <li><a href="#" className="icon fa-google-plus"><span className="label">Google+</span></a></li>
          </ul>
          <ul className="copyright">
            <li>&copy; Rendact Team. All rights reserved.</li><li>Design: <a href="http://html5up.net">HTML5 UP</a></li>
          </ul>
        </footer>
      </div>
      <NavPanel {...this.props}/>
    </div>
    )
  }
});

export default Home;