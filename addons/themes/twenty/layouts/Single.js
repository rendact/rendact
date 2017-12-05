import $ from 'jquery'
import React from 'react';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';
import moment from 'moment';
import {Link} from 'react-router';
import scrollToElement from 'scroll-to-element';

let Single = React.createClass({
  componentDidMount(){
    require('../assets/css/main.css')
  },

  componentWillMount(){
    document.body.className = "no-sidebar";
  },

  handleScrolly(e){
    scrollToElement("#main", {
      duration: 1500,
      offset: 0,
      ease: 'in-sine'
    })
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

    return (
      <div>
        <div id="page-wrapper">
          <header id="header">
            <h1 id="logo">
              <Link to={"/"}>{theConfig?theConfig.name:"Rendact"}</Link>
            </h1>
            <nav id="nav">
              <ul>
                <li className="submenu">
                  <div className="dropdown" style={{float:"right"}}>
                    <a href="#">Menu</a>
                    <div className="dropdown-content">
                      {this.props.theMenu()}
                    </div>
                  </div>
                </li>
              </ul>
            </nav>
          </header>

          <article id="main">

            <header className="special container">
              <img src={ require('images/logo-circle.svg') } alt="" />
              <h2><strong>{theConfig?theConfig.name:"Rendact"}</strong></h2>
              <p>{theConfig?theConfig.tagline:"Hello, you are in Rendact"}</p>
            </header>

            {postData &&
              <section className="wrapper style4 container">
                  <div className="content">
                    <section>
                      <a href="#" className="image featured"><img src="images/pic04.jpg" alt="" /></a>
                      <header>
                        <h3>{postData.title && postData.title}</h3>
                      </header>
                      <p dangerouslySetInnerHTML={{__html: postData.content ? postData.content:""}} />
                     </section>
                  </div>
              </section>
            }

              <section className="wrapper style1 container special">
                <div className="row">

                    {this.props.footerWidgets && this.props.footerWidgets.map((fw, idx) => <div className="4u">{fw}</div>)}


                </div>
              </section>

          </article>

          <footer id="footer">

            <ul className="icons">
              <li><a href="#" className="icon circle fa-twitter"><span className="label">Twitter</span></a></li>
              <li><a href="#" className="icon circle fa-facebook"><span className="label">Facebook</span></a></li>
              <li><a href="#" className="icon circle fa-google-plus"><span className="label">Google+</span></a></li>
              <li><a href="#" className="icon circle fa-github"><span className="label">Github</span></a></li>
              <li><a href="#" className="icon circle fa-dribbble"><span className="label">Dribbble</span></a></li>
            </ul>

            <ul className="copyright">
              <li>&copy; Rendact Team</li><li>Design: <a href="http://html5up.net">HTML5 UP</a></li>
            </ul>

          </footer>

      </div>
    </div>
    )
  }
});

export default Single;