import React from 'react'
import Header from '../includes/Header'
import Sidebar from '../includes/Sidebar'
import Footer from '../includes/Footer'
import HeaderMobile from '../includes/HeaderMobile'
import Notification from 'react-notification-system';
import moment from 'moment'

let Single = React.createClass({
	componentDidMount: function() {
  	this.notification = this.refs.notificationSystem;
	},
	render: function() {
		return (
			<div className="application">
				<Header {...this.props} />	   
            <div id="main" className="wrapper style1">
              <div className="container">
                <header className="major">
                  <h2>{this.props.postData.title}</h2>
                  <p></p>
                </header>
                  <div dangerouslySetInnerHTML={{__html: this.props.postData.content}} />
              </div>
            </div>
				<Footer {...this.props} />	
        <HeaderMobile {...this.props}/>
      </div>
		      
			)
	}
});

export default Single
