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
    // debugger
    return (
    <div>

      <section id="header">
        <header className="major">
          <h1>Highlights</h1>
          <p>A fun little RESPONSIVE single pager by <a href="http://html5up.net">HTML5 UP</a></p>
        </header>
        <div className="container">
          <ul className="actions">
            <li><a href="#one" className="button special scrolly">Begin</a></li>
          </ul>
        </div>
      </section>

      <section id="one" className="main special">
        <div className="container">
          <span className="image fit primary"><img src="images/pic01.jpg" alt="" /></span>
          <div className="content">
            <header className="major">
              <h2>Who I am</h2>
            </header>
            <p>Aliquam ante ac id. Adipiscing interdum lorem praesent fusce pellentesque arcu feugiat. Consequat sed ultricies rutrum. Sed adipiscing eu amet interdum lorem blandit vis ac commodo aliquet integer vulputate phasellus lorem ipsum dolor lorem magna consequat sed etiam adipiscing interdum.</p>
          </div>
          <a href="#two" className="goto-next scrolly">Next</a>
        </div>
      </section>

      <section id="two" className="main special">
        <div className="container">
          <span className="image fit primary"><img src="images/pic02.jpg" alt="" /></span>
          <div className="content">
            <header className="major">
              <h2>Stuff I do</h2>
            </header>
            <p>Consequat sed ultricies rutrum. Sed adipiscing eu amet interdum lorem blandit vis ac commodo aliquet vulputate.</p>
            <ul className="icons-grid">
              <li>
                <span className="icon major fa-camera-retro"></span>
                <h3>Magna Etiam</h3>
              </li>
              <li>
                <span className="icon major fa-pencil"></span>
                <h3>Lorem Ipsum</h3>
              </li>
              <li>
                <span className="icon major fa-code"></span>
                <h3>Nulla Tempus</h3>
              </li>
              <li>
                <span className="icon major fa-coffee"></span>
                <h3>Sed Feugiat</h3>
              </li>
            </ul>
          </div>
          <a href="#three" className="goto-next scrolly">Next</a>
        </div>
      </section>

      <section id="three" className="main special">
        <div className="container">
          <span className="image fit primary"><img src="images/pic03.jpg" alt="" /></span>
          <div className="content">
            <header className="major">
              <h2>One more thing</h2>
            </header>
            <p>Aliquam ante ac id. Adipiscing interdum lorem praesent fusce pellentesque arcu feugiat. Consequat sed ultricies rutrum. Sed adipiscing eu amet interdum lorem blandit vis ac commodo aliquet integer vulputate phasellus lorem ipsum dolor lorem magna consequat sed etiam adipiscing interdum.</p>
          </div>
          <a href="#footer" className="goto-next scrolly">Next</a>
        </div>
      </section>
    
      
      <section id="footer">
        <div className="container">
          <header className="major">
            <h2>Get in touch</h2>
          </header>
          <form method="post" action="#">
            <div className="row uniform">
              <div className="6u 12u$(xsmall)"><input type="text" name="name" id="name" placeholder="Name" /></div>
              <div className="6u$ 12u$(xsmall)"><input type="email" name="email" id="email" placeholder="Email" /></div>
              <div className="12u$"><textarea name="message" id="message" placeholder="Message" rows="4"></textarea></div>
              <div className="12u$">
                <ul className="actions">
                  <li><input type="submit" value="Send Message" className="special" /></li>
                </ul>
              </div>
            </div>
          </form>
        </div>
        <footer>
          <ul className="icons">
            <li><a href="#" className="icon alt fa-twitter"><span className="label">Twitter</span></a></li>
            <li><a href="#" className="icon alt fa-facebook"><span className="label">Facebook</span></a></li>
            <li><a href="#" className="icon alt fa-instagram"><span className="label">Instagram</span></a></li>
            <li><a href="#" className="icon alt fa-dribbble"><span className="label">Dribbble</span></a></li>
            <li><a href="#" className="icon alt fa-envelope"><span className="label">Email</span></a></li>
          </ul>
          <ul className="copyright">
            <li>&copy; Untitled</li><li>Design: <a href="http://html5up.net">HTML5 UP</a></li><li>Demo Images: <a href="http://unsplash.com">Unsplash</a></li>
          </ul>
        </footer>
      </section>

    </div>  
    )
  }
});

export default Home;