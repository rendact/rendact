import React from 'react'
import Header from '../includes/Header'
import Footer from '../includes/Footer'
import Loadable from 'react-loadable'

const HomeContent = Loadable({
  loader: () => new Promise((resolve) =>
    require.ensure([], () => resolve(require('../includes/HomeContent')),
	 'homecontent')),
  loading: () => null
})

const Home = React.createClass({
  componentDidMount(){
    require('../css/style.css')
    require('bootstrap/dist/css/bootstrap.css')
  },
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
