import React from 'react';
import Header from '../includes/Header';
import Footer from '../includes/Footer';
import FooterWidgets from '../includes/FooterWidgets';
import Menu from '../includes/Menu';
import Post from '../includes/Post';

class Home extends React.Component {
  componentDidMount(){
    require('../assets/css/main.css')
  }

  render(){
    let {
      postData,
    } = this.props;

    return (
      <div id="wrapper">
        <Header name="Rendact" tagline="hello"/>
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
    )
  }
}

export default Home;
