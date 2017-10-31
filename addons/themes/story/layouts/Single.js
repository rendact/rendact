import React from 'react';
// import Header from '../includes/Header';
import Footer from '../includes/Footer';
import FooterWidgets from '../includes/FooterWidgets';
//import Menu from '../includes/Menu';
// import Post from '../includes/Post';

class Single extends React.Component {
  componentDidMount(){
    require('../assets/css/main.css')
  }

  render(){
    let {
      postData,
      theConfig
    } = this.props;
debugger
    return (
      <div>
      <div id="wrapper" className="divided">
          <div id="main">
            {postData &&
            <section id="one">
              <div className="inner">
                {!isHome &&
                <header className="major">
                  <h1>{title}</h1>
                </header>
                }
                <span className="image main"><img src={image} alt=""/></span>
                <div dangerouslySetInnerHTML={{__html: content}}/>
              </div>
            </section>
            }
          </div>
          <FooterWidgets {...this.props}/>
          <Footer />
      </div>
      </div>
    )
  }
}

export default Single;
