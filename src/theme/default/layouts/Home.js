import React from 'react'
import Header from '../includes/Header'
import Sidebar from '../includes/Sidebar'
import Footer from '../includes/Footer'
import _ from 'lodash'
import Loadable from 'react-loadable'

const HomeContentWithLatestPost = Loadable({
  loader: () => new Promise((resolve) =>
    require.ensure(['../includes/HomeContentWithLastestsPost'], () => resolve(require('../includes/HomeContentWithLastestsPost')),
	 'themehomewithlastestpost')),
  loading: () => null
})


const HomeContentWithPage = Loadable({
  loader: () => new Promise((resolve) =>
    require.ensure(['../includes/HomeContentWithPage'], () => resolve(require('../includes/HomeContentWithPage')),
	 'themehomewithpage')),
  loading: () => null
})



const Home = React.createClass({
	render: function() {
		return (
			<div className="application">
				<Header {...this.props} />	   
				<div className="container">
					<div className={this.props.theConfig.frontPage === "latestPost"? "col-md-8 new-section": "col-md-8"}>
						     {
                   this.props.theConfig.frontPage === 'latestPost' ? 
                     <HomeContentWithLatestPost {...this.props}/>
                     :
                     <HomeContentWithPage {...this.props}/>
						     }
					</div>	
					<Sidebar {...this.props} />
				  <div className="clearfix"></div>
				</div>
				<Footer {...this.props} />	
			</div>
		)
	}
});

export default Home;
