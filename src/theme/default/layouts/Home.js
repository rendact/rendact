import React from 'react'
import Header from '../includes/Header'
import Footer from '../includes/Footer'
import Loadable from 'react-loadable'

const HomeContent = Loadable({
  loader: () => new Promise((resolve) =>
    require.ensure(['../includes/HomeContent'], () => resolve(require('../includes/HomeContent')),
	 'themehomecontent')),
  loading: () => null
})

const Home = React.createClass({
	render: function() {
		return (
			<div className="application">
				<Header {...this.props} />	   
          <HomeContent {...this.props}/>
				<Footer {...this.props} />	
			</div>
		)
	}
});

export default Home;
