import './Home.css'
import React from 'react'

import Header from '../includes/Header'
import Footer from '../includes/Footer'

const Home = () => {
	return (
		<div className="layout-home">
			<Header/>
			<div className="container">
				<div className="mt-1">
					<h1>Default theme. Home Layout.</h1>
				</div>
				<p className="lead">This content will be dynamic..</p>
			</div>
			<Footer/>
		</div>
	)
}

export default Home
