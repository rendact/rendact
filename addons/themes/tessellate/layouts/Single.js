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

  handleScrolly(e){
    scrollToElement("#third", {
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
      
      <section id="header" className="dark">
        <header>
          <h1>Welcome to {theConfig?theConfig.name:"Rendact"}</h1>
          <h1><Link to={"/"}>{theConfig?theConfig.name:"Rendact"}</Link></h1>
          <nav id="menu">
            {this.props.theMenu()}
          </nav>
        </header>
        <footer>
          <a href="#first" className="button scrolly" onClick={this.handleScrolly}>Proceed to second phase</a>
        </footer>
      </section>

      {postData &&
        <section id="third" className="main">
            <header>
              <div className="container">
                <h2>{postData.title && postData.title}</h2>
              </div>
            </header>
            <div className="content dark style3">
              <div className="container">
                <span className="image featured">
                  <img src={postData.imageFeatured ? postData.imageFeatured.blobUrl: require('images/logo-128.png') } alt="" />
                </span>
                <div className="row">
                  <div className="12u 12u(narrow)">
                    <p dangerouslySetInnerHTML={{__html: postData.content ? postData.content :""}} />
                  </div>
                </div>
              </div>
            </div>
        </section>
      }

      <section id="fourth" className="main">
        
        <div className="content dark style1 featured">
          <div className="container">
            <div className="row">
              {this.props.footerWidgets &&
                this.props.footerWidgets.map((fw, idx) => <div className="4u 12u(narrow)">{fw}</div>)}
            </div>
          </div>
        </div>

      </section>

      <section id="footer">
        <ul className="icons">
          <li><a href="#" className="icon fa-twitter"><span className="label">Twitter</span></a></li>
          <li><a href="#" className="icon fa-facebook"><span className="label">Facebook</span></a></li>
          <li><a href="#" className="icon fa-instagram"><span className="label">Instagram</span></a></li>
          <li><a href="#" className="icon fa-dribbble"><span className="label">Dribbble</span></a></li>
          <li><a href="#" className="icon fa-github"><span className="label">GitHub</span></a></li>
        </ul>
        <div className="copyright">
          <ul className="menu">
            <li>&copy; Rendact. All rights reserved.</li><li>Design: <a href="http://html5up.net">HTML5 UP</a></li>
          </ul>
        </div>
      </section>
    </div>  
    )
  }
});

export default Single;