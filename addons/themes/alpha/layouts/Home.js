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
    scrollToElement("#two", {
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

      <div id="page-wrapper">

        <header id="header" className="alt">
          <h1><a href="index.html">Alpha</a> by HTML5 UP</h1>
          <nav id="nav">
            <ul>
              <li><a href="index.html">Home</a></li>
              <li>
                <a href="#" className="icon fa-angle-down">Layouts</a>
                <ul>
                  <li><a href="generic.html">Generic</a></li>
                  <li><a href="contact.html">Contact</a></li>
                  <li><a href="elements.html">Elements</a></li>
                  <li>
                    <a href="#">Submenu</a>
                    <ul>
                      <li><a href="#">Option One</a></li>
                      <li><a href="#">Option Two</a></li>
                      <li><a href="#">Option Three</a></li>
                      <li><a href="#">Option Four</a></li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li><a href="#" className="button">Sign Up</a></li>
            </ul>
          </nav>
        </header>

        <section id="banner">
          <h2>Alpha</h2>
          <p>Another fine responsive site template freebie by HTML5 UP.</p>
          <ul className="actions">
            <li><a href="#" className="button special">Sign Up</a></li>
            <li><a href="#" className="button">Learn More</a></li>
          </ul>
        </section>

        <section id="main" className="container">

          <section className="box special">
            <header className="major">
              <h2>Introducing the ultimate mobile app
              <br />
              for doing stuff with your phone</h2>
              <p>Blandit varius ut praesent nascetur eu penatibus nisi risus faucibus nunc ornare<br />
              adipiscing nunc adipiscing. Condimentum turpis massa.</p>
            </header>
            <span className="image featured"><img src="images/pic01.jpg" alt="" /></span>
          </section>

          <section className="box special features">
            <div className="features-row">
              <section>
                <span className="icon major fa-bolt accent2"></span>
                <h3>Magna etiam</h3>
                <p>Integer volutpat ante et accumsan commophasellus sed aliquam feugiat lorem aliquet ut enim rutrum phasellus iaculis accumsan dolore magna aliquam veroeros.</p>
              </section>
              <section>
                <span className="icon major fa-area-chart accent3"></span>
                <h3>Ipsum dolor</h3>
                <p>Integer volutpat ante et accumsan commophasellus sed aliquam feugiat lorem aliquet ut enim rutrum phasellus iaculis accumsan dolore magna aliquam veroeros.</p>
              </section>
            </div>
            <div className="features-row">
              <section>
                <span className="icon major fa-cloud accent4"></span>
                <h3>Sed feugiat</h3>
                <p>Integer volutpat ante et accumsan commophasellus sed aliquam feugiat lorem aliquet ut enim rutrum phasellus iaculis accumsan dolore magna aliquam veroeros.</p>
              </section>
              <section>
                <span className="icon major fa-lock accent5"></span>
                <h3>Enim phasellus</h3>
                <p>Integer volutpat ante et accumsan commophasellus sed aliquam feugiat lorem aliquet ut enim rutrum phasellus iaculis accumsan dolore magna aliquam veroeros.</p>
              </section>
            </div>
          </section>

          <div className="row">
            <div className="6u 12u(narrower)">

              <section className="box special">
                <span className="image featured"><img src="images/pic02.jpg" alt="" /></span>
                <h3>Sed lorem adipiscing</h3>
                <p>Integer volutpat ante et accumsan commophasellus sed aliquam feugiat lorem aliquet ut enim rutrum phasellus iaculis accumsan dolore magna aliquam veroeros.</p>
                <ul className="actions">
                  <li><a href="#" className="button alt">Learn More</a></li>
                </ul>
              </section>

            </div>
            <div className="6u 12u(narrower)">

              <section className="box special">
                <span className="image featured"><img src="images/pic03.jpg" alt="" /></span>
                <h3>Accumsan integer</h3>
                <p>Integer volutpat ante et accumsan commophasellus sed aliquam feugiat lorem aliquet ut enim rutrum phasellus iaculis accumsan dolore magna aliquam veroeros.</p>
                <ul className="actions">
                  <li><a href="#" className="button alt">Learn More</a></li>
                </ul>
              </section>

            </div>
          </div>

        </section>

        <section id="cta">

          <h2>Sign up for beta access</h2>
          <p>Blandit varius ut praesent nascetur eu penatibus nisi risus faucibus nunc.</p>

          <form>
            <div className="row uniform 50%">
              <div className="8u 12u(mobilep)">
                <input type="email" name="email" id="email" placeholder="Email Address" />
              </div>
              <div className="4u 12u(mobilep)">
                <input type="submit" value="Sign Up" className="fit" />
              </div>
            </div>
          </form>

        </section>

        <footer id="footer">
          <ul className="icons">
            <li><a href="#" className="icon fa-twitter"><span className="label">Twitter</span></a></li>
            <li><a href="#" className="icon fa-facebook"><span className="label">Facebook</span></a></li>
            <li><a href="#" className="icon fa-instagram"><span className="label">Instagram</span></a></li>
            <li><a href="#" className="icon fa-github"><span className="label">Github</span></a></li>
            <li><a href="#" className="icon fa-dribbble"><span className="label">Dribbble</span></a></li>
            <li><a href="#" className="icon fa-google-plus"><span className="label">Google+</span></a></li>
          </ul>
          <ul className="copyright">
            <li>&copy; Untitled. All rights reserved.</li><li>Design: <a href="http://html5up.net">HTML5 UP</a></li>
          </ul>
        </footer>

    </div>

    )
  }
});

export default Home;