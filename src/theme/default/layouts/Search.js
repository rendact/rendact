import React from 'react'
import Header from '../includes/Header'
import Footer from '../includes/Footer'

class Search extends React.Component {
  render(){
    return (
      <div className="application">
        <Header {...this.props}/>
        <div className="container">
          <div className="col-md-12 new-section">
            <h1>Hello, this will be a search page soon</h1>
            <p>Please wait...........</p>
          </div>
          <div className="clearfix"></div>
        </div>
        <Footer {...this.props}/>
      </div>
    )
  }
}

export default Search;
