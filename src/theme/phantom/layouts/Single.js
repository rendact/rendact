import React from 'react'
import Header from '../includes/Header';
import Footer from '../includes/Footer';
import MenuItems from '../includes/MenuItems';

class Single extends React.Component {
  componentDidMount(){
    require("../css/style.css")
    document.body.className = ""
  }
  render(){
    let {postData} = this.props
    return (
      <div>
      <div id="wrapper" style={{background: "#fff"}}>
        <Header {...this.props}/>
        <div id="main">
          <div className="inner">
            <h1>{postData.title}</h1>
            <span className="image main">
              {postData.imageFeatured &&
                  <img src={postData.imageFeatured.blobUrl} alt={postData.title}/>}
                </span>
                <div dangerouslySetInnerHTML={{__html: postData.content}}/>
          </div>
        </div>
        <Footer {...this.props}/>
      </div>
      <MenuItems {...this.props}/>
      </div>
    )
  }
}

export default Single;
