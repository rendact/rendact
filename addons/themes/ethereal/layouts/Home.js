import React from 'react';
import {Link} from 'react-router';
import PanelBanner from '../includes/PanelBanner';
import PanelFooter from '../includes/PanelFooter';


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

          <PanelBanner
            title={this.props.theConfig && this.props.theConfig.name}
            content={this.props.theConfig && this.props.theConfig.tagline}
            image={require('images/logo-130.png')}
          />


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

              <PanelFooter {...this.props}/>
                    </section>
                    <div className="copyright">Converted from ethereal theme; Rendact Team</div>

        </div>
      </div>
    )
  }
}

export default Home
