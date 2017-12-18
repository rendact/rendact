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
    scrollToElement("#first", {
      duration: 1500,
      offset: 0,
      ease: 'in-sine'
    })
  },

  render(){
    let { theConfig, latestPosts: data, thePagination, loadDone } = this.props;
 
    return (
    <div>
      
      <section id="header" className="dark">
        <header>
          <h1><Link to={"/"}>{theConfig?theConfig.name:"Rendact"}</Link></h1>
          <p>{theConfig?theConfig.tagline:"Hello"}</p>
          <nav id="menu">
            {this.props.theMenu()}
          </nav>
        </header>
        <footer>
          <a href="#first" className="button scrolly" onClick={this.handleScrolly}>Proceed to second phase</a>
        </footer>
      </section>

      <section id="first" className="main">
        <header>
          <div className="container">
            <h2>Tessellate is a free responsive site template</h2>
            <p>Gravida dis placerat lectus ante vel nunc euismod eget ornare varius gravida euismod lorem ipsum dolor sit amet consequat<br />
            feugiat. Gravida dis placerat lectus ante vel nunc euismod eget ornare varius gravida euismod lorem ipsum dolor sit amet.</p>
          </div>
        </header>
        
      </section>

      <section id="second" className="main">
        {data && data.map((post, index) => (
          <div className="content dark style2">
            <div className="container">
              <div className="row">
                <div className="6u 12u(narrow)">
                  <section>
                    <h3><Link to={"/post/" + post.id}>{post.title && post.title}</Link></h3>
                    <p dangerouslySetInnerHTML={{__html: post.content ? post.content.slice(0, 150):""}} />
                    <footer>
                      <a href="#third" className="button scrolly">Accumsan nisi tempor</a>
                    </footer>
                  </section>
                </div>
                <div className="6u 12u(narrow)">
                  <div className="row">
                    <div className="12u">
                      <Link to={"/post/" + post.id}>
                        <img src={post.imageFeatured ? post.imageFeatured.blobUrl: require('images/logo-128.png') } alt="" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      <section id="third" className="main">
        <header>
          <div className="container">
            <div style={{textAlign: "center"}}>
              {this.props.thePagination}
            </div>
          </div>
        </header>
      </section>

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

export default Blog;