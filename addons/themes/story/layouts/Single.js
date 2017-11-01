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
debugger
    return (
      <div id="wrapper" className="divided">
          <Header
            name={theConfig ? theConfig.name : "Rendact"} 
            tagline={theConfig ? theConfig.tagline: "hello"}
            {...this.props}
          />
          <div id="main" className="wrapper style1">
            <div className="inner">
              {postData &&
              <section id="one">
                <div className="inner">
                  <span className="image main"><img src={postData.imageFeatured && postData.imageFeatured.blobUrl} alt=""/></span>
                  {!isHome &&
                    <header className="major">
                      <h1>{postData.title}</h1>
                    </header>
                  }
                  <div dangerouslySetInnerHTML={{__html: postData.content}}/>
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
