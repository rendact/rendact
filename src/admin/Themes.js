import React from 'react';

var Themes = React.createClass({
	render: function(){
		return (
			<div className="content-wrapper" style={{height: '100%'}}>
				<section className="content-header">
			      <h1>
			        Theme List
			        <small>Control panel</small>
			      </h1>
			      <ol className="breadcrumb">
			        <li><a href="#"><i className="fa fa-dashboard"></i> Home</a></li>
			        <li className="active">Theme List</li>
			      </ol>
			    </section>

			    <section className="content">
			    </section>
		    </div>
		)
	}
});

export default Themes;