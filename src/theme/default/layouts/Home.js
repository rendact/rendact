import React from 'react'
import Header from '../includes/Header'
import Footer from '../includes/Footer'
import Loadable from 'react-loadable'

const HomeContent = Loadable({
  loader: () => import('../includes/HomeContent'),
  loading: () => null
})

const Home = React.createClass({
	render: function() {
		return (
			<div className="application">
				<Header {...this.props} />	   
        {this.props.loadDone ?
          <HomeContent {...this.props}/>
            :
            <div style={{height: '100vh'}}>&nbsp;</div>
        }
				<Footer {...this.props} />	
			</div>
		)
	}
});

export default Home;
