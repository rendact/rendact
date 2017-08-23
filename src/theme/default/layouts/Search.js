import React from 'react'
import Header from '../includes/Header'
import Footer from '../includes/Footer'
import Sidebar from '../includes/Sidebar';
import moment from 'moment';
import {Link} from 'react-router';

class Search extends React.Component {
  render(){
    return (
      <div className="application">
        <Header {...this.props}/>
        <div className="container">
          <div className="col-md-8 new-section" style={{opacity: this.props.opacity}}>
            <h3>Result of <b>{this.props.searchQuery}</b></h3>
            {
              this.props.searchResults.length ?
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
                :
                <p style={{color:'red'}}>No Result Found</p>
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
