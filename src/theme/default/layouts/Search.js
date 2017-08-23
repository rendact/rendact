import React from 'react'
import Header from '../includes/Header'
import Footer from '../includes/Footer'
import Sidebar from '../includes/Sidebar';

class Search extends React.Component {
  render(){
    return (
      <div className="application">
        <Header {...this.props}/>
        <div className="container">
          <div className="col-md-8 new-section">
            <h1>Hello, this will be a search page soon</h1>
            <p>Please wait.....</p>
            <p>Your search query is: <b>{this.props.searchQuery}</b></p>
            <h3>Result of <b>{this.props.searchQuery}</b></h3>
            {
              this.props.searchResults.map((post, index) => (
                <p key={index}>{post.title}</p>
              ))
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
