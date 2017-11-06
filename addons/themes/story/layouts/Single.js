import React from 'react';
import Header from '../includes/Header';
import Footer from '../includes/Footer';
import FooterWidgets from '../includes/FooterWidgets';
// import Menu from '../includes/Menu';
// import Post from '../includes/Post';

class Single extends React.Component {
  componentDidMount(){
    require('../assets/css/main.css')
  }

  render(){
    let {
      postData,
      theConfig,
      title,
      image,
      content,
      isHome
    } = this.props;
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
              {postData &&
              <section id="one">
                <div className="inner">
                  <article>
                    {!isHome &&
                      <header className="major">
                        <h1>{postData.title}</h1>
                      </header>
                    }
                    <span className="image main"><img src={postData.imageFeatured ? postData.imageFeatured.blobUrl : require("images/logo-128.png") } alt=""/></span>
                    <div dangerouslySetInnerHTML={{__html: postData.content}}/>
                  </article>
                </div>
              </section>
              }
            </div>
          </div>
          <FooterWidgets {...this.props}/>
          <Footer />
      </div>
    )
  }
}

export default Single;
