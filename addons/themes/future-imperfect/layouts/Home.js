import $ from 'jquery'
import React from 'react';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';
import moment from 'moment';
import {Link} from 'react-router';

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
    // debugger
    return (
      
        <div id="wrapper">

        
          <header id="header">
            <h1>
              <strong><Link to="/">{theConfig?theConfig.name:"Rendact"}</Link></strong> 
            </h1>
            <nav className="links">
              {this.props.theMenu()}
            </nav>
          </header>


          <div id="main">

            {data && data.map((post, index) => (
              <article className="post">
                <header>
                  <div className="title">
                    <h2><Link to={"/post/" + post.id}>{post.title && post.title}</Link></h2>
                  </div>
                  <div className="meta">
                    <time className="published">{moment(post.createdAt).format("MMMM Do YY")}</time>
                    <small><time className="published">{moment(post.createdAt).format("h:mm:ss a")}</time></small>
                  </div>
                </header>
                <div className="image featured">
                  <Link to={"/post/" + post.id}>
                    <img src={post.imageFeatured ? post.imageFeatured.blobUrl: require('images/logo-128.png') } alt="" />
                  </Link>
                </div>
                <p dangerouslySetInnerHTML={{__html: post.content ? post.content.slice(0, 200):""}} />
                <footer>
                  <ul className="actions">
                    <li><Link className="button big" to={"/post/" + post.id}>Continue Reading</Link></li>
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
