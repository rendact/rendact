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
            <header id="header">
              <div className="logo container">
                <div>
                  <h1><Link to={"/"}>{theConfig?theConfig.name:"Rendact"} </Link></h1>
                <p>{theConfig?theConfig.tagline:"Hello, you are in Rendact"}</p>
                </div>
              </div>
            </header>

            <nav id="nav">
              <ul>
                <li><a href="index.html">Home</a></li>
                <li>
                  <a href="#">Dropdown</a>
                  <ul>
                    <li><a href="#">Lorem ipsum dolor</a></li>
                    <li><a href="#">Magna phasellus</a></li>
                    <li>
                      <a href="#">Phasellus consequat</a>
                      <ul>
                        <li><a href="#">Lorem ipsum dolor</a></li>
                        <li><a href="#">Phasellus consequat</a></li>
                        <li><a href="#">Magna phasellus</a></li>
                        <li><a href="#">Etiam dolore nisl</a></li>
                      </ul>
                    </li>
                    <li><a href="#">Veroeros feugiat</a></li>
                  </ul>
                </li>
                <li><a href="left-sidebar.html">Left Sidebar</a></li>
                <li><a href="right-sidebar.html">Right Sidebar</a></li>
                <li className="current"><a href="no-sidebar.html">No Sidebar</a></li>
              </ul>
            </nav>

            <div id="main-wrapper">
              <div id="main" className="container">
                <div className="row">
                  <div className="12u">
                    <div className="content">
                      {postData &&
                        <article className="box page-content">

                          <header>
                            <h2>{postData.title && postData.title}</h2>
                            <p>{postData.title && postData.title}</p>
                            <ul className="meta">
                              <li className="icon fa-clock-o">5 days ago</li>
                              <li className="icon fa-comments"><a href="#">1,024</a></li>
                            </ul>
                          </header>

                          <section>
                            <span className="image featured">
                              <img src={postData.imageFeatured ? postData.imageFeatured.blobUrl: require('images/logo-128.png') } alt="" />
                            </span>
                            <p dangerouslySetInnerHTML={{__html: postData.content ? postData.content :""}} />
                          </section>

                        </article>
                      }
                    </div>
                  </div>
                </div>
                
              </div>
            </div>

            <footer id="footer" className="container">
            {this.props.footerWidgets &&
              this.props.footerWidgets.map((fw, idx) => <div className="row 200%"><div className="12u"><section>{fw}</section></div></div>)}
            <div className="row 200%">
              <div className="12u">

                  <section>
                    <h2 className="major"><span>Get in touch</span></h2>
                    <ul className="contact">
                      <li><a className="icon fa-facebook" href="#"><span className="label">Facebook</span></a></li>
                      <li><a className="icon fa-twitter" href="#"><span className="label">Twitter</span></a></li>
                      <li><a className="icon fa-instagram" href="#"><span className="label">Instagram</span></a></li>
                      <li><a className="icon fa-dribbble" href="#"><span className="label">Dribbble</span></a></li>
                      <li><a className="icon fa-google-plus" href="#"><span className="label">Google+</span></a></li>
                    </ul>
                  </section>

              </div>
            </div>

              <div id="copyright">
                <ul className="menu">
                  <li>&copy; Rendact. All rights reserved</li><li>Design: <a href="http://html5up.net">HTML5 UP</a></li>
                </ul>
              </div>

          </footer>
        </div>
      </div>
    )
  }
});

export default Home;