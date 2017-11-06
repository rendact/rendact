import React from 'react';
import Header from '../includes/Header';
import Footer from '../includes/Footer';
import FooterWidgets from '../includes/FooterWidgets';
// import Menu from '../includes/Menu';
// import Post from '../includes/Post';
import { Link } from "react-router";

class Blog extends React.Component {
  componentDidMount(){
    require('../assets/css/main.css')
  }

  render(){
    
      let { theConfig, latestPosts: data, thePagination, loadDone } = this.props;

// debugger
    return (
      <div id="wrapper" className="divided">
          <Header
            name={theConfig ? theConfig.name : "Rendact"} 
            tagline={theConfig ? theConfig.tagline: "hello"}
            {...this.props}
          />
          <div id="main" className="wrapper style1" style={{backgroundColor: "#D3D3D3"}}>
            <div className="inner">
              
              <section id="one">
                <div className="inner">
                                <section>
                                  <div className="posts">
                                    {data &&
                                      data.map(post => (
                                        <article>
                                          <Link className="image" to={"/post/"+ post.id}><img src={post.imageFeatured ? post.imageFeatured.blobUrl : require("images/logo-128.png") } alt=""/></Link>
                                          <h3>{post.title}</h3>
                                          <p dangerouslySetInnerHTML={{__html: post.content}}/>
                                          <ul className="actions">
                                            <li><Link className="button" to={"/post/" + post.id}>More</Link></li>
                                          </ul>
                                        </article>


                                        
                                      ))}
                                  </div>
                                  {thePagination}
                                </section>
                </div>
              </section>
             
            </div>
          </div>
          <FooterWidgets {...this.props}/>
          <Footer />
      </div>
    )
  }
}

export default Blog;
