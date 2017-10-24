import React from 'react'
import HeaderWrapper from '../includes/HeaderWrapper';
import Footer from '../includes/Footer';
import PostList from '../includes/PostList';
import MediaQuery from 'react-responsive';

class Home extends React.Component {
  constructor(props){
    super(props)

    this.handleHideIntro = this.handleHideIntro.bind(this)
    this.handleToggleAlt = this.handleToggleAlt.bind(this)
    this.handleNavPanelToggle = this.handleNavPanelToggle.bind(this)
    this.handleNavPanelClose = this.handleNavPanelClose.bind(this)

    this.state = {
      intro: true,
      alt: false,
    }
  }


  componentDidMount(){
    require("../css/main.css")
    document.body.className =  "";
    window.addEventListener("scroll", this.handleHideIntro)
    window.addEventListener("scroll", this.handleToggleAlt)
    document.body.addEventListener("click", this.handleNavPanelClose)
  }

  componentWillUnmount(){
    window.removeEventListener("scroll", this.handleHideIntro)
    window.removeEventListener("scroll", this.handleToggleAlt)
    document.body.removeEventListener("click", this.handleNavPanelClose)
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

  handleToggleAlt(e){
    let header = document.getElementById("header")
    let headerRect = header.getBoundingClientRect()

    if (window.pageYOffset <= headerRect.height + 10){
      this.setState({alt: false})
    } else {
      this.setState({alt: true})
    }
  }

  handleNavPanelToggle(e){
    e.preventDefault()
      document.body.className = "is-navPanel-visible"
  }

  handleNavPanelClose(e){
    if(document.body.className === "is-navPanel-visible" && e.currentTarget.id !== "navPanelToggle"){
      if (e.target.id !== "navPanel") document.body.className = ""
    }
  }

  render(){
    return <div>
      <div className="fade-in" id="wrapper">
      <HeaderWrapper intro={this.state.intro} isHome={true} {...this.props}/>
      <div id="main">
        <aricle className="post featured">
        </aricle>
        <section className="posts">
          {this.props.data && this.props.data.map(post => (
            <PostList 
              key={post.id}
              imageFeatured={post.imageFeatured?post.imageFeatured.blobUrl:require('images/logo-128.png')}
              content={post.content && post.content.slice(0, 100) + "..."}
              postId={post.id}
              date={post.publishedDate}
              title={post.title}
            />
          ))}

        </section>

        <footer>
          {this.props.thePagination}
        </footer>
      </div>


      <Footer {...this.props}/>

        <div className="bg" style={{transform: [
          {matrix: [1, 0, 0, 1, 0, 3862.8]}
        ]
        }}></div>
        <a className={this.state.alt?"alt":null} href="#navPanel" id="navPanelToggle" onClick={this.handleNavPanelToggle}>Menu</a>
      </div>

      <div id="navPanel">
        <nav>
          <MediaQuery minDeviceWidth={980}>
            {this.props.theMenu}
          </MediaQuery>
        </nav>
        <a href="#navPanel" className="close"></a>
      </div>
    </div>
  }
}

export default Home;
