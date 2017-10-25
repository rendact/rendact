import React from 'react';


class Home extends React.Component {
  componentDidMount(){
    require("../css/main.css")
    document.body.className = ""
  }
  render(){
    return (
      <div id="page-wrapper">
        <div id="wrapper">
          <section className="panel banner right">
            <div className="content color0 span-3-75">
              <h1 className="major">{this.props.theConfig && this.props.theConfig.name}</h1>
              <p dangerouslySetInnerHTML={{__html: this.props.theConfig && this.props.theConfig.tagline}}/>
              <ul className="actions">
                <li><a className="button special color1 circle icon fa-angle-right" href="#first">Next</a></li>
              </ul>
            </div>
            <div className="image filtered span-1-75">
              <img src={require('images/logo-130.png')} alt=""/>
            </div>
          </section>

              {this.props.data && 
                  this.props.data.map((post, index) => (
                    <section className={"panel color" + (index > 4 ? index - 3 : index + 1)} key={index}>
                      <div key={post.id} className="intro joined">
                      <h2 className="major">{post.title}</h2>
                      <p dangerouslySetInnerHTML={{__html: post.content}}/>
                      </div>
                      <div className="image inner"><img src={this.props.data.imageFeatured?this.props.data.imageFeatured.blobUrl:require('images/logo-130.png')} alt=""/></div>
                      
                    </section>
                  ))
              }
        </div>
      </div>
    )
  }
}

export default Home
