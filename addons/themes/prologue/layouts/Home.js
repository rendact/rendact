import $ from 'jquery'
import React from 'react';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';
import moment from 'moment';
import {Link} from 'react-router';
import scrollToElement from 'scroll-to-element';
import NavPanel from '../includes/NavPanel';

let Home = React.createClass({
  componentDidMount(){
    require('../assets/css/main.css')
  },

  handleScrolly(e){
    scrollToElement("#portfolio", {
      duration: 1500,
      offset: 0,
      ease: 'in-sine'
    })
  },

  render(){
    let {
      theConfig,
      data,
      thePagination,
      loadDone
    } = this.props

    return (
    <div>
      <div id="header">
        <div className="top">
            <div id="logo">
              <span className="image avatar48">
                <img src={ require('images/favicon-96x96.png') } alt="" />
              </span>
              <h1 id="title"><Link to={"/"}>{theConfig?theConfig.name:"Rendact"}</Link></h1>
              <p>{theConfig?theConfig.tagline:"Hello"}.</p>
            </div>
            <nav id="nav">
              {this.props.theMenu()}
            </nav>
        </div>

        <div className="bottom">
            <ul className="icons">
              <li><a href="#" className="icon fa-twitter"><span className="label">Twitter</span></a></li>
              <li><a href="#" className="icon fa-facebook"><span className="label">Facebook</span></a></li>
              <li><a href="#" className="icon fa-github"><span className="label">Github</span></a></li>
              <li><a href="#" className="icon fa-dribbble"><span className="label">Dribbble</span></a></li>
              <li><a href="#" className="icon fa-envelope"><span className="label">Email</span></a></li>
            </ul>
        </div>
      </div>

      <div id="main">
          <section id="top" className="one dark cover">
            <div className="container">
              <header>
                <h2 className="alt">Hi! I'm <strong>{theConfig?theConfig.name:"Rendact"}</strong></h2>
                <p>{theConfig?theConfig.tagline:"Hello"}.</p>
              </header>
              <footer>
                <a href="#" className="button scrolly" onClick={this.handleScrolly}>Start</a>
              </footer>
            </div>
          </section>
          <section id="portfolio" className="two">
            <div className="container">
              <header>
                <h2>Post List</h2>
              </header>
              <div className="row">
                {data && data.map((post, index) => (
                  <div className="4u 12u$(mobile)">
                    <article className="item">
                      <Link className="image fit" to={"/post/" + post.id}>
                        <img src={post.imageFeatured ? post.imageFeatured.blobUrl: require('images/logo-128.png') } alt=""/>
                      </Link>
                      <header>
                        <h3><Link to={"/post/" + post.id}>{post.title && post.title}</Link></h3>  
                        <p dangerouslySetInnerHTML={{__html: post.content ? post.content.slice(0, 60):""}} />
                        <Link className="button" to={"/post/" + post.id}>Read More</Link>
                      </header>
                      
                    </article>
                  </div>
                ))}
              </div>

            </div>
          </section>
          <section id="about" className="three">
            <div className="container">
              <header>
                <h2>About Me</h2>
              </header>
              <a href="#" className="image featured"><img src="images/pic08.jpg" alt="" /></a>
              <p>Tincidunt eu elit diam magnis pretium accumsan etiam id urna. Ridiculus
              ultricies curae quis et rhoncus velit. Lobortis elementum aliquet nec vitae
              laoreet eget cubilia quam non etiam odio tincidunt montes. Elementum sem
              parturient nulla quam placerat viverra mauris non cum elit tempus ullamcorper
              dolor. Libero rutrum ut lacinia donec curae mus vel quisque sociis nec
              ornare iaculis.</p>
            </div>
          </section>
          <section id="contact" className="four">
            <div className="container">
              <form method="post">
                <div className="row">
                  {this.props.footerWidgets &&
                  this.props.footerWidgets.map((fw, idx) => 
                  <div className="4u 12u$(mobile)">{fw}</div>)}
                </div>
              </form>
            </div>
          </section>
      </div>
    <NavPanel {...this.props}/>
    </div>
    )
  }
});

export default Home;