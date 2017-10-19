import React from 'react'
import Header from '../includes/Header'
import Footer from '../includes/Footer'
import Sidebar from '../includes/Sidebar';
import moment from 'moment';
import {Link} from 'react-router';
import Halogen from 'halogen';

class Search extends React.Component {
  componentDidMount(){
    require('../css/style.css')
    require('bootstrap/dist/css/bootstrap.css')
  }
  renderSearchResult(){
    if (this.props.isProcessing){
      return <div><Halogen.PulseLoader color='green'/></div>
    }else if (this.props.searchResults.length) {
      return (
        this.props.searchResults.map((post, index) => (
                <div key={post.id} className="new">
                  <div style={{width: '100%'}} className="col-md-12 new-text wow fadeIn animated">
                    <h4><Link to={'/post/'+post.id}>{post.title}</Link></h4>
                    <small>{moment(post.createdAt).format("MMM Do YY, h:mm:ss a")}</small>
                    <section className="content-body" >
                      {this.props.theExcerpt(post.content)}
                    </section>
                  </div>
                  <div className="clearfix"></div>
                </div>
              ))
      )
    } else {
      return <p style={{color:'red'}}>No Result Found</p>
    }
  }
  render(){
    let resultStyle = {
      background: '#698a9a',
      color: 'white',
      padding: '0.5rem',
      borderRadius: '10px 0',
    }

    return (
      <div className="application">
        <Header {...this.props}/>
        <div className="container">
          <div className="col-md-8 new-section" style={{opacity: this.props.opacity}}>
            <h3>Result of <span style={resultStyle}>{this.props.searchQuery}</span></h3>
            {
              this.renderSearchResult()
            }
          </div>
          <Sidebar {...this.props}/>
          <div className="clearfix"></div>
        </div>
        <Footer {...this.props}/>
      </div>
    )
  }
}

export default Search;
