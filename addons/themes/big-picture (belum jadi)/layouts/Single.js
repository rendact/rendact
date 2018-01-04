import $ from 'jquery'
import React from 'react';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';
import moment from 'moment';
import {Link} from 'react-router';
import scrollToElement from 'scroll-to-element';

class Single extends React.Component {

  constructor(props){
    super(props)

    this.handleHideIntro = this.handleHideIntro.bind(this)

    this.state = {
      intro: true,
    }
  }


  componentDidMount(){
    require('../assets/css/main.css')
    window.addEventListener("scroll", this.handleHideIntro)
  }

  componentWillUnmount(){
    window.removeEventListener("scroll", this.handleHideIntro)
  }

  handleHideIntro(e){
    /* 
     * hide intro when window.pageYOffset => header.height
     */

    let header = document.getElementById("header")
    let headerRect = header.getBoundingClientRect()

    if (window.pageYOffset >= headerRect.height - 10){
      this.setState({intro: false})
    } else {
      this.setState({intro: true})
    }
  }

  handleScrolly(e){
    scrollToElement("#inti", {
      duration: 1500,
      offset: 0,
      ease: 'in-sine'
    })
  }

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
        <header id="header">
          <h1><Link to={"/"}>{theConfig?theConfig.name:"Rendact"}</Link></h1>
          <nav>
            {this.props.theMenu()}
          </nav>
        </header>

        <section id="intro" className={this.props.intro?"main style1 dark fullscreen inactive":"main style1 dark fullscreen"}>
          <div className="content">
            <header>
              <h2>{theConfig?theConfig.name:"Rendact"}</h2>
            </header>
            <p>{theConfig?theConfig.tagline:"Hello, you are in Rendact"}.</p>
            <footer>
              <a href="#" className="button style2 down" onClick={this.handleScrolly}>More</a>
            </footer>
          </div>
        </section>

        {postData &&
          <section id="inti" className="main style2 right dark fullscreen posts " 
            style={{backgroundImage: `url(${postData.imageFeatured ? postData.imageFeatured.blobUrl: require('images/logo-128.png')})`}} >
            <div className="content box style2">
              <header>
                <h2>{postData.title && postData.title}</h2>
              </header>
              <p dangerouslySetInnerHTML={{__html: postData.content ? postData.content :""}} />
            </div>
          </section>
        }
        
        <section id="contact" className="main style3 secondary">
          <div className="content">
            <div className="row">
              {this.props.footerWidgets &&
              this.props.footerWidgets.map((fw, idx) =><div className="box">{fw}</div>)}
            </div>
          </div>
        </section>

        <footer id="footer">

            <ul className="actions">
              <li><a href="#" className="icon fa-twitter"><span className="label">Twitter</span></a></li>
              <li><a href="#" className="icon fa-facebook"><span className="label">Facebook</span></a></li>
              <li><a href="#" className="icon fa-instagram"><span className="label">Instagram</span></a></li>
              <li><a href="#" className="icon fa-linkedin"><span className="label">LinkedIn</span></a></li>
              <li><a href="#" className="icon fa-dribbble"><span className="label">Dribbble</span></a></li>
              <li><a href="#" className="icon fa-pinterest"><span className="label">Pinterest</span></a></li>
            </ul>

            <ul className="menu">
              <li>&copy; Rendact</li><li>Design: <a href="https://html5up.net">HTML5 UP</a></li>
            </ul>

        </footer>
      </div>
    )
  }
}

export default Single;