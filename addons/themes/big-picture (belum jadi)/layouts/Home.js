import $ from 'jquery'
import React from 'react';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';
import moment from 'moment';
import {Link} from 'react-router';
import scrollToElement from 'scroll-to-element';

class Home extends React.Component {

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

  render(){
    let {
      theConfig,
      data,
      thePagination,
      loadDone
    } = this.props
debugger
    return (
      <div>
        <header id="header">
          <h1>Big Picture</h1>
          <nav>
            <ul>
              <li><a href="#intro">Intro</a></li>
              <li><a href="#one">What I Do</a></li>
              <li><a href="#two">Who I Am</a></li>
              <li><a href="#work">My Work</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </nav>
        </header>

        <section id="intro" className={this.props.intro?"main style1 dark fullscreen inactive":"main style1 dark fullscreen"}>
          <div className="content">
            <header>
              <h2>Hey.</h2>
            </header>
            <p>Welcome to <strong>Big Picture</strong> a responsive site template designed
            by <a href="https://html5up.net">HTML5 UP</a>, built on <a href="http://skel.io">Skel</a>,
            and released for free under the <a href="https://html5up.net/license">Creative Commons Attribution license</a>.</p>
            <footer>
              <a href="#one" className="button style2 down">More</a>
            </footer>
          </div>
        </section>

        {data && data.map((post, index) => (
          <section className={index%2===0 ? "main style2 right dark fullscreen posts " : "main style2 left dark fullscreen posts"} 
            style={{backgroundImage : 'url('+  require('images/logo-128.png')   +')'}} >
            <div className="content box style2">
              <header>
                <h2><Link to={"/post/" + post.id}>{post.title && post.title}</Link></h2>
              </header>
              <p dangerouslySetInnerHTML={{__html: post.content ? post.content.slice(0, 150):""}} />
              <Link className="button" to={"/post/" + post.id}>See More</Link>
            </div>
            <a href="#two" className="button style2 down anchored">Next</a>
          </section>
        ))}

        
        <section id="work" className="main style3 primary">
          <div className="content">
            <header>
              <h2>My Work</h2>
              <p>Lorem ipsum dolor sit amet et sapien sed elementum egestas dolore condimentum.
              Fusce blandit ultrices sapien, in accumsan orci rhoncus eu. Sed sodales venenatis
              arcu, id varius justo euismod in. Curabitur egestas consectetur magna vitae.</p>
            </header>

              <div className="gallery">
                <article className="from-left">
                  <a href="images/fulls/01.jpg" className="image fit"><img src="images/thumbs/01.jpg" title="The Anonymous Red" alt="" /></a>
                </article>
                <article className="from-right">
                  <a href="images/fulls/02.jpg" className="image fit"><img src="images/thumbs/02.jpg" title="Airchitecture II" alt="" /></a>
                </article>
                <article className="from-left">
                  <a href="images/fulls/03.jpg" className="image fit"><img src="images/thumbs/03.jpg" title="Air Lounge" alt="" /></a>
                </article>
                <article className="from-right">
                  <a href="images/fulls/04.jpg" className="image fit"><img src="images/thumbs/04.jpg" title="Carry on" alt="" /></a>
                </article>
                <article className="from-left">
                  <a href="images/fulls/05.jpg" className="image fit"><img src="images/thumbs/05.jpg" title="The sparkling shell" alt="" /></a>
                </article>
                <article className="from-right">
                  <a href="images/fulls/06.jpg" className="image fit"><img src="images/thumbs/06.jpg" title="Bent IX" alt="" /></a>
                </article>
              </div>

          </div>
        </section>

        <section id="contact" className="main style3 secondary">
          <div className="content">
            <header>
              <h2>Say Hello.</h2>
              <p>Lorem ipsum dolor sit amet et sapien sed elementum egestas dolore condimentum.</p>
            </header>
            <div className="box">
              <form method="post" action="#">
                <div className="field half first"><input type="text" name="name" placeholder="Name" /></div>
                <div className="field half"><input type="email" name="email" placeholder="Email" /></div>
                <div className="field"><textarea name="message" placeholder="Message" rows="6"></textarea></div>
                <ul className="actions">
                  <li><input type="submit" value="Send Message" /></li>
                </ul>
              </form>
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
              <li>&copy; Untitled</li><li>Design: <a href="https://html5up.net">HTML5 UP</a></li>
            </ul>

        </footer>
      </div>
    )
  }
}

export default Home;