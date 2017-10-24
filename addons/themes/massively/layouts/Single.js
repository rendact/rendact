import React from 'react';
import HeaderWrapper from '../includes/HeaderWrapper';
import Footer from '../includes/Footer';
import NavPanel from '../includes/NavPanel';


class Single extends React.Component {
  componentDidMount(){
    require("../css/main.css")
    document.body.className = "";
  }
  render(){
    return(
      <div>
        <div id="wrapper" >
          <HeaderWrapper intro={false} {...this.props}/>
          <div id="main">
            <section className="post">
              <header className="major">
                <span className="date">{this.props.postData.publishDate}</span>
                <h1>{this.props.postData.title}</h1>
              </header>

              <div className="image main">
                <img src={this.props.postData.imageFeatured?this.props.postData.imageFeatured.blobUrl:require("images/logo-128.png")}/>
              </div>

              <div dangerouslySetInnerHTML={{__html: this.props.postData.content}}/>

            </section>
          </div>

          <Footer {...this.props}/>
          <div className="bg" style={{transform: [
            {matrix: [1, 0, 0, 1, 0, 3862.8]}
          ]
          }}/>
        </div>
        <NavPanel {...this.props}/>
      </div>
    )
  }
}

export default Single;
