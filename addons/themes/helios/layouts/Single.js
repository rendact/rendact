import $ from 'jquery'
import React from 'react';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';
import moment from 'moment';
import {Link} from 'react-router';
import scrollToElement from 'scroll-to-element';
// import NavPanel from '../includes/NavPanel';

let Single = React.createClass({
  componentDidMount(){
    require('../assets/css/main.css')
  },

  componentWillMount(){
    document.body.className = "no-sidebar";
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

        <div id="header">

            <div className="inner">
              <header>
                <h1><Link to={"/"}>{theConfig?theConfig.name:"Rendact"}</Link></h1>
              </header>
            </div>

            <nav id="nav">
                {this.props.theMenu()}
            </nav>

        </div>

        <div className="wrapper style1">
        {postData &&
          <div className="container">
            <article id="main" className="special">
              <header>
                <h2>{postData.title && postData.title}</h2>
              </header>
              <a href="#" className="image featured">
                <img src={postData.imageFeatured ? postData.imageFeatured.blobUrl: require('images/logo-128.png') } alt="" />
              </a>
              <section>
                <header>
                  <h3>{postData.title && postData.title}</h3>
                </header>
                <p dangerouslySetInnerHTML={{__html: postData.content ? postData.content :""}} />
              </section>
            </article>
          </div>
          }
        </div>

        <div id="footer">
          <div className="container">
            <div className="row">
              {this.props.footerWidgets &&
                this.props.footerWidgets.map((fw, idx) => <div className="4u 12u(mobile)">{fw}</div>)}
            </div>  
            <hr />
            <div className="row">
              <div className="12u">

                  <section className="contact">
                    <header>
                      <h3>{theConfig?theConfig.name:"Rendact"}</h3>
                    </header>
                    <p>{theConfig?theConfig.tagline:"Hello"}</p>
                    <ul className="icons">
                      <li><a href="#" className="icon fa-twitter"><span className="label">Twitter</span></a></li>
                      <li><a href="#" className="icon fa-facebook"><span className="label">Facebook</span></a></li>
                      <li><a href="#" className="icon fa-instagram"><span className="label">Instagram</span></a></li>
                      <li><a href="#" className="icon fa-pinterest"><span className="label">Pinterest</span></a></li>
                      <li><a href="#" className="icon fa-dribbble"><span className="label">Dribbble</span></a></li>
                      <li><a href="#" className="icon fa-linkedin"><span className="label">Linkedin</span></a></li>
                    </ul>
                  </section>

                  <div className="copyright">
                    <ul className="menu">
                      <li>&copy; Rendact. All rights reserved.</li><li>Design: <a href="http://html5up.net">HTML5 UP</a></li>
                    </ul>
                  </div>

              </div>

            </div>
          </div>
        </div>

    </div>
      </div>
    )
  }
});

export default Single;