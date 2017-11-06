import $ from 'jquery'
import React from 'react';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';
import FooterWidgets from '../includes/FooterWidgets';
import Footer from '../includes/Footer';
import Header from '../includes/Header';
import {Link} from 'react-router';

// export default class Home extends React.Component {
let Home = React.createClass({
  componentDidMount(){
    require('../assets/css/main.css')
  },


  render(){
    let {
      theConfig,
      data,
      thePagination,
      loadDone
    } = this.props
// debugger
    return (

      <div id="wrapper" className="divided">

          <Header
            name={theConfig ? theConfig.name : "Rendact"} 
            tagline={theConfig ? theConfig.tagline: "hello"}
            {...this.props}
          />

          {data && data.map((post, index) => (
            <section className={index%2===0 ? "spotlight style1 orient-right content-align-left image-position-center onscroll-image-fade-in color7":"spotlight style1 orient-left content-align-left image-position-center onscroll-image-fade-in color8" }>
          
              <div className="content">
                <h2>{post.title && post.title}</h2>
                <p dangerouslySetInnerHTML={{__html: post.content ? post.content.slice(0, 100):""}} />
                <ul className="actions vertical">
                  <li><Link className="button special" to={"/post/" + post.id}>Learn More</Link></li>
                </ul>
              </div>
              <div className="image">
                <Link to={"/post/" + post.id}>
                  <img src={post.imageFeatured ? post.imageFeatured.blobUrl: require('images/logo-128.png') } alt="" />
                </Link>
              </div>  
            </section>
            )
          )}

          <section className="wrapper style1 align-center">
            <div style={{textAlign: "center"}}>
                {this.props.thePagination}
            </div>
          </section>
        
          
          <FooterWidgets {...this.props}/>
          <Footer />

      </div>
    )
  }
});

export default Home;
