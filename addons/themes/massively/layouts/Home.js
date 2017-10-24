import React from 'react'
import MediaQuery from 'react-responsive';
import HeaderWrapper from '../includes/HeaderWrapper';
import Footer from '../includes/Footer';
import PostList from '../includes/PostList';
import NavPanel from '../includes/NavPanel';

class Home extends React.Component {
  constructor(props){
    super(props)

    this.handleHideIntro = this.handleHideIntro.bind(this)

    this.state = {
      intro: true,
    }
  }


  componentDidMount(){
    require("../css/main.css")
    document.body.className =  "";
    window.addEventListener("scroll", this.handleHideIntro)
  }

  componentWillUnmount(){
    window.removeEventListener("scroll", this.handleHideIntro)
    window.removeEventListener("scroll", this.handleToggleAlt)
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
    return <div>
      <div className="fade-in" id="wrapper">
      <HeaderWrapper intro={this.state.intro} isHome={true} {...this.props}/>
      <div id="main">
        <section className="posts">
          {this.props.data && this.props.data.map(post => (
            <PostList 
              key={post.id}
              imageFeatured={post.imageFeatured?post.imageFeatured.blobUrl:require('images/logo-128.png')}
              content={post.content && post.content.slice(0, 100) + "..."}
              postId={post.id}
              date={post.publishDate && post.publishDate.toString()}
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

      <NavPanel {...this.props}/>
    </div>
  }
}

export default Home;
