import React from 'react';
import Header from '../includes/Header';
import Footer from '../includes/Footer';
import FooterWidgets from '../includes/FooterWidgets';
import Menu from '../includes/Menu';
import Post from '../includes/Post';

class Blog extends React.Component {
  componentDidMount(){
    require('../assets/css/main.css')
  }

  render(){
    let {
      postData,
      theConfig
    } = this.props;

    return (
      <div>
      <div id="wrapper">
        <Header
          name={theConfig ? theConfig.name : "Rendact"} 
          tagline={theConfig ? theConfig.tagline: "hello"}
        />
          <div id="main">
            {postData &&
            <Post 
              title={postData.title}
              image={postData.featuredImage?postData.featuredImage.blobUrl:require('images/logo-128.png')}
              content={postData.content}
            />
            }
          </div>
          <FooterWidgets {...this.props}/>
          <Footer />
      </div>
      <Menu {...this.props}/>
      </div>
    )
  }
}

export default Blog;
