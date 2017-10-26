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
      data,
      thePagination
    } = this.props;

    return (
      <div id="wrapper">
        <Header name="Rendact" tagline="hello"/>
        <div id="main" style={{padding: 25}}>
        <section className="spotlights">
              {data && data.map(post => (
                    <PostList 
                      title={post.title}
                      content={post.content ?  post.content.trim().slice(0, 100) : "&nbsp;"}
                      image={post.imageFeatured ? post.imageFeatured.blobUrl: require('images/logo-128.png')}
                      id={post.id}
                    />
                  ))
              }
              <div style={{textAlign: "center"}}>
                {thePagination}
              </div>
        </section>
        </div>
        <FooterWidgets {...this.props}/>
        <Footer />
      </div>
    )
  }
}

export default Home;
