import React from 'react'
import HeaderWrapper from '../includes/HeaderWrapper';
import Footer from '../includes/Footer';
import PostList from '../includes/PostList';

class Home extends React.Component {
  componentDidMount(){
    require("../css/main.css")
    document.body.className = ""
  }
  render(){
    return <div className="fade-in" id="wrapper">
      <HeaderWrapper {...this.props}/>
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
