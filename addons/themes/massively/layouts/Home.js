import React from 'react'
import HeaderWrapper from '../includes/HeaderWrapper';
import Footer from '../includes/Footer';
import PostList from '../includes/PostList';

class Home extends React.Component {
  constructor(props){
    super(props)

    this.handleHideIntro = this.handleHideIntro.bind(this)
    this.state = {
      intro: true
    }
  }

  componentDidMount(){
    require("../css/main.css")
    document.body.className = ""
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
    return <div className="fade-in" id="wrapper">
      <HeaderWrapper intro={this.state.intro} {...this.props}/>
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
      </div>
  }
}

export default Home;
