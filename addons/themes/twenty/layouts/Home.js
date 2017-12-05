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
    document.body.className = "index";
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

            <header id="header" className="alt">
              <h1 id="logo">
                <Link to={"/"}>{theConfig?theConfig.name:"Rendact"}</Link>
              </h1>
              <nav id="nav">
                <ul>
                  <li className="submenu">
                    <div className="dropdown" style={{float:"right"}}>
                      <a href="#">Menu</a>
                      <div className="dropdown-content">
                        {this.props.theMenu()}
                      </div>
                    </div>
                  </li>
                </ul>
              </nav>
            </header>

            <section id="banner">

              <div className="inner">

                <header>
                  <h2>{theConfig?theConfig.name:"Rendact"}</h2>
                </header>
                <p>{theConfig?theConfig.tagline:"Hello"}</p>
                <p>We are Rendact Team</p>
                <footer>
                  <ul className="buttons vertical">
                    <li><a href="#main" className="button fit scrolly" onClick={this.handleScrolly}>Tell Me More</a></li>
                  </ul>
                </footer>

              </div>

            </section>

            <article id="main">
                <section className="wrapper style3 container special">

                  <div className="row">
                    {data && data.map((post, index) => (
                      <div className="6u 12u(narrower)">
                        <section>
                          <Link className="image featured" to={"/post/" + post.id}>
                            <img src={post.imageFeatured ? post.imageFeatured.blobUrl: require('images/logo-128.png') } alt="" />
                          </Link>
                          <header>
                            <h3><Link to={"/post/" + post.id}>{post.title && post.title}</Link></h3>
                          </header>
                          <p dangerouslySetInnerHTML={{__html: post.content ? post.content.slice(0, 150):""}} />
                        </section>
                        <ul className="buttons">
                          <li><a href="#" className="button">See More</a></li>
                        </ul>
                      </div>
                    ))}
                  </div>
                  
                  <footer className="major">
                    <div style={{textAlign: "center"}}>
                      {this.props.thePagination}
                    </div>
                  </footer>

                </section>

            </article>

            <section id="cta">
              <div className="row">
                {this.props.footerWidgets && this.props.footerWidgets.map((fw, idx) => <div className="4u">{fw}</div>)}
              </div>
            </section>

            <footer id="footer">

              <ul className="icons">
                <li><a href="#" className="icon circle fa-twitter"><span className="label">Twitter</span></a></li>
                <li><a href="#" className="icon circle fa-facebook"><span className="label">Facebook</span></a></li>
                <li><a href="#" className="icon circle fa-google-plus"><span className="label">Google+</span></a></li>
                <li><a href="#" className="icon circle fa-github"><span className="label">Github</span></a></li>
                <li><a href="#" className="icon circle fa-dribbble"><span className="label">Dribbble</span></a></li>
              </ul>

              <ul className="copyright">
                <li>&copy; Rendact Team</li><li>Design: <a href="http://html5up.net">HTML5 UP</a></li>
              </ul>

            </footer>

        </div>
    </div>
    )
  }
});

export default Single;