import React from 'react';
import Sidebar from '../includes/Sidebar';
import Header from '../includes/Header';
import Post from '../includes/Post';
import Halogen from 'halogen';

export default class Home extends React.Component {
  componentDidMount(){
    require("../assets/css/main.css")
  }

  render(){
      let {
        theConfig,
        postData,
        loadDone
      } = this.props
    return (
      <div id="wrapper">
        <div id="main">
          <div className="inner">
            <Header
              name={theConfig ? theConfig.name : "Rendact"}
              tagline={theConfig ? theConfig.tagline: "a simple blog"}
            />

          {loadDone ?
          <Post
            title={postData.title}
            content={postData.content}
            image={postData.imageFeatured?postData.imageFeatured.blobUrl:require("images/logo-128.png")}
          />
              :
              <section className="features" style={{textAlign: "center"}}>
                <article style={{display: "inline-block", textAlign: "center"}}>
                  <div className="icon" style={{display:"inline-block"}}>
                    <Halogen.ClipLoader color="#f56a6a"/>
                  </div>
                </article>
              </section>
          }


          </div>
        </div>
          <Sidebar {...this.props}/>
      </div>


    )
  }
}
