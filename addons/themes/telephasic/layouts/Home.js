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

          <div id="header-wrapper">
            <div id="header" className="container">
                <h1 id="logo"><Link to={"/"}>{theConfig?theConfig.name:"Rendact"}</Link></h1>
                <nav id="nav">
                  {this.props.theMenu()}
                </nav>
            </div>

              <section id="hero" className="container">
                <header>
                  <h2>Telephasic is a responsive
                  <br />
                  site template by <a href="http://html5up.net">HTML5 UP</a></h2>
                </header>
                <p>Designed and built on <strong>skel</strong> by <a href="http://twitter.com/ajlkn">AJ</a>. Released for free under
                <br />
                the <a href="http://html5up.net/license">Creative Commons Attribution 3.0 license</a>.</p>
                <ul className="actions">
                  <li>
                    <a href="#" className="button" onClick={this.handleScrolly}>Get this party started</a>
                  </li>
                </ul>
              </section>

          </div>

          <div id="inti" className="wrapper">
            <div className="container">
              <div className="row">
                {data && data.map((post, index) => (
                  <section className="6u 12u(narrower) feature">
                    <div className="image-wrapper first">
                      <Link className="image featured first" to={"/post/" + post.id}>
                        <img src={post.imageFeatured ? post.imageFeatured.blobUrl: require('images/logo-128.png') } alt="" />
                      </Link>
                    </div>
                    <header>
                      <h2><Link to={"/post/" + post.id}>{post.title && post.title}</Link></h2>
                    </header>
                    <p dangerouslySetInnerHTML={{__html: post.content ? post.content.slice(0, 160):""}} />
                    <ul className="actions">
                      <li><Link className="button" to={"/post/" + post.id}>Read More</Link></li>
                    </ul>
                  </section>
                ))}
              </div>
            </div>
          </div>
          <div style={{textAlign: "center"}}>
            {this.props.thePagination}
          </div>

          <div id="promo-wrapper">
            <div className="row">
                {this.props.footerWidgets &&
                  this.props.footerWidgets.map((fw, idx) => <div className="4u 12u(mobile)">{fw}</div>)}
            </div>
            <div id="copyright" className="container">
              <ul className="menu">
                <li>&copy; Rendact. All rights reserved.</li><li>Design: <a href="http://html5up.net">HTML5 UP</a></li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    )
  }
});

export default Home;