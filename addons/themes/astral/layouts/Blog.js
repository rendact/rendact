import $ from 'jquery'
import React from 'react';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';
import moment from 'moment';
import {Link} from 'react-router';
import scrollToElement from 'scroll-to-element';

let Blog = React.createClass({
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
    let { theConfig, latestPosts: data, thePagination, loadDone } = this.props;

    return (
      <div>
        <div id="wrapper" style={{opacity: 1}}>
            <nav id="nav">
              {this.props.theMenu()}
            </nav>
            <div id="main" style={{height: "1650px"}}>
              <article id="work" className="panel" style={{display: "block"}}>
                <section>
                  <div className="row">
                    {data && data.map((post, index) => (
                      <div className="6u 12u$(mobile)">
                        <Link className="image fit" to={"/post/" + post.id}>
                          <img src={post.imageFeatured ? post.imageFeatured.blobUrl: require('images/logo-128.png') } alt="" />
                        </Link>
                        <h4><Link to={"/post/" + post.id}>{post.title && post.title}</Link></h4>
                      </div>
                    ))}
                  </div>
                </section>
                <div style={{textAlign: "center"}}>
                  {this.props.thePagination}
                </div> 
                <div className="row" id="footerWidgets">
                  {this.props.footerWidgets &&
                  this.props.footerWidgets.map((fw, idx) => <div className="4u 12u(mobile)">{fw}</div>)}
                </div>
              </article>
            </div>
            <div id="footer">
              <ul className="copyright">
                <li>&copy; Rendact</li><li>Design: <a href="http://html5up.net">HTML5 UP</a></li>
              </ul>
            </div>
        </div>
      </div> 
    )
  }
});

export default Blog;