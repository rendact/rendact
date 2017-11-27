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

  handleScrollyBegin(e){
    debugger
    scrollToElement("#0id", {
      duration: 1500,
      offset: 0,
      ease: 'in-sine'
    })
  },

  handleScrolly(e){
    var value = e.value;
    var next = document.getElementsByid.value;
    debugger
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
          <h1>{theConfig?theConfig.name:"Rendact"}</h1>
          <p>{theConfig?theConfig.tagline:"Hello, you are in Rendact"}</p>
          <nav id="menu">
            {this.props.theMenu()}
          </nav>
        </header>
        <div className="container">
          <ul className="actions">
            <li><a href="#" className="button special scrolly" onClick={this.handleScrollyBegin}>Begin</a></li>
          </ul>
        </div>
      </section>

      {data && data.map((post, index) => (
        <section id={index+"id"} className="main special">
          <div className="container">
            <span className="image fit primary"><img src={post.imageFeatured ? post.imageFeatured.blobUrl: require('images/logo-128.png') } alt="" /></span>
            <div className="content">
              <header className="major">
                 <Link to={"/post/" + post.id}><h2>{post.title && post.title}</h2></Link>
              </header>
              <p dangerouslySetInnerHTML={{__html: post.content ? post.content.slice(0, 100):""}} />
              <Link className="button" to={"/post/" + post.id}>Learn More</Link>
            </div>
            {index%4!==0 || index===0 && 
              <a href="#" value={index+1+"id"} onClick={this.handleScrolly} className="goto-next scrolly">Next</a>
            }
          </div>
        </section>
      ))}

      <section>
        <div className="container">
          <header className="major">
            <div style={{textAlign: "center"}}>
              {this.props.thePagination}
            </div>
          </header>
        </div>
      </section>
      
      <section id="footer">
        <div className="container">
              {this.props.footerWidgets &&
              this.props.footerWidgets.map((fw, idx) => 
              <header id="footerWidgets" className="major">{fw}</header>)}
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
            <li>&copy; Rendact Team</li><li>Design: <a href="http://html5up.net">HTML5 UP</a></li><li>Demo Images: <a href="http://unsplash.com">Unsplash</a></li>
          </ul>
        </footer>
      </section>

    </div>  
    )
  }
});

export default Home;