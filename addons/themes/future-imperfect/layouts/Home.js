import $ from 'jquery'
import React from 'react';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';
import moment from 'moment';

let Home = React.createClass({
  componentDidMount(){
    require('../assets/css/main.css')
  },

  render(){
    let {
      theConfig,
      data,
      thePagination,
      loadDone
    } = this.props
    debugger
    return (
      
        <div id="wrapper">

        
          <header id="header">
            <h1>
              <strong>{theConfig?theConfig.name:"Rendact"}</strong> 
            </h1>
            <nav className="links">
              {this.props.theMenu()}
            </nav>
            <nav className="main">
              <ul>
                <li className="search">
                  <a className="fa-search" href="#search">Search</a>
                  <form id="search" className="visible" method="get" action="#">
                    <input type="text" name="query" placeholder="Search" />
                  </form>
                </li>
              </ul>
            </nav>
          </header>


          <div id="main">

            {data && data.map((post, index) => (
              <article className="post">
                <header>
                  <div className="title">
                    <h2><a href="#">{post.title && post.title}</a></h2>
                    <p dangerouslySetInnerHTML={{__html: post.content ? post.content.slice(0, 50):""}} />
                  </div>
                  <div className="meta">
                    <time className="published" datetime="2015-11-01">{moment(post.createdAt).format("MMMM Do YY")}</time>
                    <a href="#" className="author"><span className="name">Jane Doe</span><img src={require('images/logo-128.png')} alt="" /></a>
                  </div>
                </header>
                <a href="#" className="image featured"><img src={post.imageFeatured ? post.imageFeatured.blobUrl: require('images/logo-128.png') } alt="" /></a>
                <p dangerouslySetInnerHTML={{__html: post.content ? post.content.slice(0, 200):""}} />
                <footer>
                  <ul className="actions">
                    <li><a href="#" className="button big">Continue Reading</a></li>
                  </ul>
                  <ul className="stats">
                    <li><a href="#">{post.status}</a></li>
                    <li><a href="#" className="icon fa-heart">{post.comments.length}</a></li>
                    <li><a href="#" className="icon fa-comment">{post.comments.length?post.comments.length:0}</a></li>
                  </ul>
                </footer>
              </article>
            ))}
         
            <section className="wrapper style1 align-center">
              <div style={{textAlign: "center"}}>
                  {this.props.thePagination}
              </div>
            </section>

            
              

          </div>

       
          <section id="sidebar">

            
              <section id="intro">
                <a href="#" className="logo"><img src={require('images/logo-128.png')} alt="" /></a>
                <header>
                  <h2><strong>{theConfig?theConfig.name:"RENDACT"}</strong></h2>
                  <h3><strong>{theConfig ? theConfig.tagline: "a simple blog"}</strong></h3>
                </header>
              </section>


              <section className="blurb">
                <div id="side" >
                  <div className="inner">
                    {this.props.footerWidgets.map((fw, i) => (
                      <section key={i}>{fw}</section>
                    ))}
                  </div>
                </div>
              </section>

           
              <section id="footer">
                <p className="copyright">&copy; FUTURE-IMPERFECT <a href="http://html5up.net">HTML5 UP</a> OF RENDACT .</p>
              </section>

          </section>

        </div>

    )
  }
});

export default Home;
