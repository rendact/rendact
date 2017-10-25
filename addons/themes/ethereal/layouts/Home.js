import React from 'react';
import {Link} from 'react-router';


class Home extends React.Component {
  componentDidMount(){
    require("../css/main.css")
    document.body.className = ""
    document.body.addEventListener("wheel", (e) => {window.scrollBy(e.deltaY, 0)})
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

                    {this.props.thePagination}

                    <section className="panel color2" id="first" >
              {this.props.data && 
                  this.props.data.map((post, index) => (
                    <div className="panel">
                      <div key={post.id} className="intro joined span-3">
                        <h2 className="major"><Link to={"/post" + post.id}>{post.title}</Link></h2>
                      <p dangerouslySetInnerHTML={{__html: post.content && post.content.replace(" ", "").replace("\n", "").slice(0, 100) + "..."}}/>
                      <ul className="actions">
                        <li>
                          <Link className="button special icon circle color1 fa-external-link" to={"/post/" + post.id}>Read more</Link>
                        </li>
                      </ul>
                      </div>
                      <div className="image span-2-5" style={{flexWrap: "wrap", overflow: "hidden"}}><img src={post.imageFeatured?post.imageFeatured.blobUrl:require('images/logo-130.png')} style={{margin: "30% 0"}} alt=""/></div>
                    </div>
                      
                  ))
              }
                    </section>

        </div>
      </div>
    )
  }
}

export default Home
