import React from 'react';

var Dashboard = React.createClass({
	render: function(){
		return (
			<div className="content-wrapper" style={{height: '100%'}}>
				<section className="content-header">
			      <h1>
			        Dashboard
			        <small>Control panel</small>
			      </h1>
			      <ol className="breadcrumb">
			        <li><a href="#"><i className="fa fa-dashboard"></i> Home</a></li>
			        <li className="active">Dashboard</li>
			      </ol>
			    </section>

			    <section className="content">
			    </section>
		    </div>
		)
	}
});

export default Dashboard;