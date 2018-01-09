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
    
    return (
    <div>
      <div id="wrapper" style={{opacity: 1}}>

          <nav id="nav">
            {this.props.theMenu()}
          </nav>

          <div id="main" style={{height: "1700px"}}>
            {postData &&
              <article id="work" className="panel" style={{display: "block"}}>
                <header>
                  <h2>{postData.title && postData.title}</h2>
                </header>
                <p dangerouslySetInnerHTML={{__html: postData.content ? postData.content :""}} />
                <section>
                  <div className="row">
                    <div className="12u 12u$(mobile)">
                      <a class="image fit"><img src={postData.imageFeatured ? postData.imageFeatured.blobUrl: require('images/logo-128.png') } alt="" /></a>
                    </div>
                  </div>
                </section>
                <div className="row" id="footerWidgets">
                  {this.props.footerWidgets &&
                  this.props.footerWidgets.map((fw, idx) => <div className="4u 12u(mobile)">{fw}</div>)}
                </div>
              </article>
            }
          </div>

          <div id="footer">
            <ul className="copyright">
              <li>&copy; Untitled.</li><li>Design: <a href="http://html5up.net">HTML5 UP</a></li>
            </ul>
          </div>

      </div>
    </div>    
    )
  }
});

export default Single;