import $ from 'jquery'
import React from 'react';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';
import scrollToElement from 'scroll-to-element';
import {Link} from 'react-router';

let Home = React.createClass({
  componentDidMount(){
    require('../assets/css/main.css')
  },

  handleScrolly(e){
    scrollToElement("#scroll", {
      duration: 1500,
      offset: 0,
      ease: 'in-sine'
    })
  },

  handleShowMenu(){
    document.body.className = "landing is-menu-visible";
  },

  handleCloseMenu(){
    document.body.className = "landing";
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

      <div>
        <div id="page-wrapper">

          {/*<header id="header" className={id!=="banner"?"alt":""}>*/}
          <header id="header" className="">
            <strong>
              <Link to="/">
                <h1>{theConfig ? theConfig.name : "Rendact"}</h1>
              </Link>
            </strong>
            <nav id="nav">
              <ul>
                <li className="special">
                  <a href="#" onClick={this.handleShowMenu} className="menuToggle"><span>Menu</span></a>
                  
                </li>
              </ul>
            </nav>
          </header>

          <section id="banner">
            <div className="inner">
              <h2>{theConfig?theConfig.name:"Rendact"}</h2>
              <p>{theConfig?theConfig.tagline:"Hello"}<br />
              Just a simple, single page responsive</p>
            </div>
            <a href="#scroll" className="more scrolly" onClick={this.handleScrolly}>Learn More</a>
          </section>

          <section id="scroll" className="wrapper style1 special">
            <div className="inner">
              <ul className="icons major">
                <li><span className="icon fa-diamond major style1"><span className="label">Lorem</span></span></li>
                <li><span className="icon fa-heart-o major style2"><span className="label">Ipsum</span></span></li>
                <li><span className="icon fa-code major style3"><span className="label">Dolor</span></span></li>
              </ul>
            </div>
          </section>

          <section id="two" className="wrapper alt style2">

            {data && data.map((post, index) => (
              <section className="spotlight">
                <div className="image">
                  <Link to={"/post/" + post.id}>
                    <img src={post.imageFeatured ? post.imageFeatured.blobUrl: require('images/logo-128.png') } alt="" />
                  </Link></div>
                <div className="content">
                  <h2>
                    <Link to={"/post/" + post.id}>{post.title && post.title}</Link>
                  </h2>
                  <p>Aliquam ut ex ut augue consectetur interdum. Donec hendrerit imperdiet. Mauris eleifend fringilla nullam aenean mi ligula.</p>
                  <Link className="button" to={"/post/" + post.id}>Read More</Link>
                </div>
              </section>
            ))}

          </section>

          <section id="three" className="wrapper style3 special">
            <div className="inner">
              <div style={{textAlign: "center"}}>
                {thePagination}
              </div>
            </div>
          </section>

          <section id="cta" className="wrapper style4">
            <div className="inner">
              <div className="row">
                {this.props.footerWidgets &&
                  this.props.footerWidgets.map((fw, idx) => <div className="4u">{fw}</div>)}
              </div>
            </div>
          </section>

          <footer id="footer">
            <ul className="icons">
              <li><a href="#" className="icon fa-twitter"><span className="label">Twitter</span></a></li>
              <li><a href="#" className="icon fa-facebook"><span className="label">Facebook</span></a></li>
              <li><a href="#" className="icon fa-instagram"><span className="label">Instagram</span></a></li>
              <li><a href="#" className="icon fa-dribbble"><span className="label">Dribbble</span></a></li>
              <li><a href="#" className="icon fa-envelope-o"><span className="label">Email</span></a></li>
            </ul>
            <ul className="copyright">
              <li>&copy; Rendact</li><li>Design: Rendact Team & <a href="http://html5up.net">HTML5 UP</a></li>
            </ul>
          </footer>
        </div>
        <div id="menu">
          <ul className="links">
            <li>{this.props.theMenu("links")}</li>
          </ul>
          <a href="#" className="close" onClick={this.handleCloseMenu}></a>
        </div>
      </div> 

    )
  }
});

export default Home;