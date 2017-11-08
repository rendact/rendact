import $ from 'jquery'
import React from 'react';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';
import moment from 'moment';
import {Link} from 'react-router';

let Single = React.createClass({
  componentDidMount(){
    require('../assets/css/main.css')
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
      
        <div id="wrapper">

        
          <header id="header">
            <h1>
              <strong><Link to="/">{theConfig?theConfig.name:"Rendact"}</Link></strong> 
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

            {postData &&
              <article className="post">
                <header>
                  <div className="title">
                    <h2><a href="#">{postData.title && postData.title}</a></h2>
                  </div>
                  <div className="meta">
                    <time className="published" datetime="2015-11-01">{moment(postData.createdAt).format("MMMM Do YY")}</time>
                    <small><time className="published" datetime="2015-11-01">{moment(postData.createdAt).format("h:mm:ss a")}</time></small>
                  </div>
                </header>
                <a href="#" className="image featured"><img src={postData.imageFeatured ? postData.imageFeatured.blobUrl: require('images/logo-128.png') } alt="" /></a>
                <p dangerouslySetInnerHTML={{__html: postData.content ? postData.content:""}} />
                <footer>
                  <ul className="actions">
                  </ul>
                  <ul className="stats">
                    <li><a href="#">{postData.status}</a></li>
                    <li><a href="#" className="icon fa-heart">11</a></li>
                    <li><a href="#" className="icon fa-comment">13</a></li>
                  </ul>
                </footer>
              </article>
            }
         
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

export default Single;
