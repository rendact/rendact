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
    var value = e.value;
    debugger
    scrollToElement("#two", {
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
    // debugger
    return (
    <div>

      <section id="header">
        <header className="major">
          <h1>{theConfig?theConfig.name:"Rendact"}</h1>
          <p>{theConfig?theConfig.tagline:"Hello, you are in Rendact"}</p>
          <nav id="menu">
            {this.props.theMenu()}
          </nav>
        </header>
        <div className="container">
          <ul className="actions">
            <li><a href="#one" className="button special scrolly">Begin</a></li>
          </ul>
        </div>
      </section>

      {postData &&
        <section id="one" className="main special">
          <div className="container">
            <span className="image fit primary"><img src={postData.imageFeatured ? post.imageFeatured.blobUrl: require('images/logo-128.png') } alt="" /></span>
            <div className="content">
              <header className="major">
                <h2>{postData.title && postData.title}</h2>
              </header>
              <p dangerouslySetInnerHTML={{__html: postData.content ? postData.content.slice(0, 100):""}} />
            </div>
          </div>
        </section>
      }

      <section>
        <div className="container">
          <header className="major">
          </header>
        </div>
      </section>
      
      <section id="footer">
        <div className="container">
              {this.props.footerWidgets &&
              this.props.footerWidgets.map((fw, idx) => 
              <header id="footerWidgets" className="major">{fw}</header>)}
        </div>
        <footer>
          <ul className="icons">
            <li><a href="#" className="icon alt fa-twitter"><span className="label">Twitter</span></a></li>
            <li><a href="#" className="icon alt fa-facebook"><span className="label">Facebook</span></a></li>
            <li><a href="#" className="icon alt fa-instagram"><span className="label">Instagram</span></a></li>
            <li><a href="#" className="icon alt fa-dribbble"><span className="label">Dribbble</span></a></li>
            <li><a href="#" className="icon alt fa-envelope"><span className="label">Email</span></a></li>
          </ul>
          <ul className="copyright">
            <li>&copy; Rendact Team</li><li>Design: <a href="http://html5up.net">HTML5 UP</a></li><li>Demo Images: <a href="http://unsplash.com">Unsplash</a></li>
          </ul>
        </footer>
      </section>

    </div>  
    )
  }
});

export default Single;