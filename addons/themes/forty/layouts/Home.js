import React from 'react';
import Header from '../includes/Header';
import Footer from '../includes/Footer';
import FooterWidgets from '../includes/FooterWidgets';
import Menu from '../includes/Menu';
import PostList from '../includes/PostList';
import Post from '../includes/Post';

class Home extends React.Component {
  componentDidMount(){
    require('../assets/css/main.css')
  }
  render(){
    let {
      loadDone,
      data
    } = this.props;

    return (
      <div id="wrapper">
        <Header name="Rendact" tagline="hello"/>
        <section>
          <div className="inner">
            <div className="row">
              {data && data.map(post => (
                    <PostList 
                      title={post.title}
                      content={post.content ?  post.content.trim().slice(0, 100) : "&nbsp;"}
                      image={post.imageFeatured ? post.imageFeatured.blobUrl: require('images/logo-128.png')}
                      id={post.id}
                    />
                  ))
              }
            </div>
          </div>
        </section>
        <FooterWidgets {...this.props}/>
        <Footer />
      </div>
    )
  }
}

export default Home;
