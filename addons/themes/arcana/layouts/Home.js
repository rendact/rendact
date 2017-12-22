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
            <div id="header">
                <h1><Link id="logo" to={"/"}>{theConfig?theConfig.name:"Rendact"}</Link></h1>
                <nav id="nav">
                  {this.props.theMenu()}
                </nav>
            </div>

            <section id="banner">
              <header>
                <h2>{theConfig?theConfig.name:"Rendact"} : <em>{theConfig?theConfig.tagline:"Hello, you are in Rendact"}</em></h2>
                <a href="#" className="button" onClick={this.handleScrolly}>Learn More</a>
              </header>
            </section>

            <section className="wrapper style2">
              <div className="container">
                <header className="major">
                  <h2>A gigantic heading you can use for whatever</h2>
                  <p>With a much smaller subtitle hanging out just below it</p>
                </header>
              </div>
            </section>

            <section id="inti" className="wrapper style1">
              <div className="container">
                <div className="row">
                  {data && data.map((post, index) => ( 
                    <section className="6u 12u(narrower)">
                      <div className="box post">
                        <Link className="image left" to={"/post/" + post.id}>
                          <img src={post.imageFeatured ? post.imageFeatured.blobUrl: require('images/logo-128.png') } alt="" />
                        </Link>
                        <div className="inner">
                          <h3><Link to={"/post/" + post.id}>{post.title && post.title}</Link></h3>
                          <p dangerouslySetInnerHTML={{__html: post.content ? post.content.slice(0, 160):""}} />
                          <ul className="actions">
                            <li><Link className="button" to={"/post/" + post.id}>Read More</Link></li>
                          </ul>
                        </div>
                      </div>
                    </section>
                  ))}
                </div>
              </div>
              <div style={{textAlign: "center"}}>
                {this.props.thePagination}
              </div>
            </section>

            <div id="footer">
              <div className="container">
                <div className="row">
                  {this.props.footerWidgets &&
                  this.props.footerWidgets.map((fw, idx) => <div className="4u 12u(mobile)">{fw}</div>)}
                </div>
              </div>

                <ul className="icons">
                  <li><a href="#" className="icon fa-twitter"><span className="label">Twitter</span></a></li>
                  <li><a href="#" className="icon fa-facebook"><span className="label">Facebook</span></a></li>
                  <li><a href="#" className="icon fa-github"><span className="label">GitHub</span></a></li>
                  <li><a href="#" className="icon fa-linkedin"><span className="label">LinkedIn</span></a></li>
                  <li><a href="#" className="icon fa-google-plus"><span className="label">Google+</span></a></li>
                </ul>

                <div className="copyright">
                  <ul className="menu">
                    <li>&copy; Rendact. All rights reserved</li><li>Design: <a href="http://html5up.net">HTML5 UP</a></li>
                  </ul>
                </div>

            </div>

        </div>
      </div>
    )
  }
});

export default Home;