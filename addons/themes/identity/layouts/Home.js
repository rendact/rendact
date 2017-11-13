import $ from 'jquery'
import React from 'react';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';
import moment from 'moment';
import {Link} from 'react-router';

let Home = React.createClass({
  componentDidMount(){
    require('../assets/css/main.css');
    require('../assets/css/noscript.css')
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

        
          <section id="main">
            <header>
              <span className="avatar">
                <img src={ require('images/logo-128.png') } alt="" />
              </span>
              <h1>Rendact Team</h1>
              <p>Testing by Rendact Team</p>
            </header>
            
            <footer>
              <ul className="icons">
                <li><a href="#" className="fa-twitter">Twitter</a></li>
                <li><a href="#" className="fa-instagram">Instagram</a></li>
                <li><a href="#" className="fa-facebook">Facebook</a></li>
              </ul>
            </footer>
          </section>

       
          <footer id="footer">
            <ul className="copyright">
              <li>&copy; FUTURE-IMPERFECT</li><li><a href="http://html5up.net">HTML5 UP</a></li><li>OF RENDACT</li>
            </ul>
          </footer>

      </div>

    )
  }
});

export default Home;
