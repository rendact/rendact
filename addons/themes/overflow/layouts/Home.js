import $ from 'jquery'
import React from 'react';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';
import moment from 'moment';
import {Link} from 'react-router';
import scrollToElement from 'scroll-to-element';

let Home = React.createClass({
  componentDidMount(){
    require('../assets/css/main.css')
  },

  handleScrolly(e){
    scrollToElement("#banner", {
      duration: 1500,
      offset: 0,
      ease: 'in-sine'
    })
  },
  
  handleScrollyFirst(e){
    scrollToElement("#first", {
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
        <section id="header" >
          <header>
            <h1><Link to={"/"}>{theConfig?theConfig.name:"Rendact"}</Link></h1>
            <p>{theConfig?theConfig.tagline:"Hello"}</p>
            <nav id="menu">
              {this.props.theMenu()}
            </nav>
          </header>
          <footer>
            <a href="#banner" className="button style2 scrolly-middle" onClick={this.handleScrolly}>Proceed as anticipated</a>
          </footer>
        </section>

        <section id="banner">
          <header>
            <h2>This is Overflow</h2>
          </header>
          <p>A brand new site template designed by <a href="http://twitter.com/ajlkn">AJ</a> for <a href="http://html5up.net">HTML5 UP</a>.<br />
          It’s fully responsive, built on <strong>skel</strong>, and of course entirely free<br />
          under the <a href="http://html5up.net/license">Creative Commons license</a>.</p>
          <footer>
            <a href="#first" className="button style2 scrolly" onClick={this.handleScrollyFirst}>Act on this message</a>
          </footer>
        </section>  

        {data && data.map((post, index) => (
          <article id="first" className={index%2===0 ? "container box style1 right" : "container box style1 left"}>
            <Link className="image fit" to={"/post/" + post.id}>
              <img src={post.imageFeatured ? post.imageFeatured.blobUrl: require('images/logo-128.png') } alt="" />
            </Link>
            <div className="inner">
              <header>
                <h2><Link to={"/post/" + post.id}>{post.title && post.title}</Link></h2>
              </header>
              <p dangerouslySetInnerHTML={{__html: post.content ? post.content.slice(0, 100):""}} />
              <Link className="button" to={"/post/" + post.id}>See More</Link>
            </div>
          </article>
        ))}

        <article className="container box style2">
          <header>
            <h2>
              {this.props.thePagination}
            </h2>
          </header>
        </article>

        <article className="container box style3">
          <div style={{textAlign: "center"}}>
            {this.props.footerWidgets.map((fw, i) => (
              <section key={i}>{fw}</section>
            ))}
          </div>
        </article>

        <section id="footer">
          <ul className="icons">
            <li><a href="#" className="icon fa-twitter"><span className="label">Twitter</span></a></li>
            <li><a href="#" className="icon fa-facebook"><span className="label">Facebook</span></a></li>
            <li><a href="#" className="icon fa-google-plus"><span className="label">Google+</span></a></li>
            <li><a href="#" className="icon fa-pinterest"><span className="label">Pinterest</span></a></li>
            <li><a href="#" className="icon fa-dribbble"><span className="label">Dribbble</span></a></li>
            <li><a href="#" className="icon fa-linkedin"><span className="label">LinkedIn</span></a></li>
          </ul>
          <div className="copyright">
            <ul className="menu">
              <li>&copy; Rendact Team. All rights reserved.</li><li>Design: <a href="http://html5up.net">HTML5 UP</a></li>
            </ul>
          </div>
        </section>
      </div>
    )
  }
});

export default Home;