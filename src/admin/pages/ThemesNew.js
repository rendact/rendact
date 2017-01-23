import React from 'react';

var NewTheme = React.createClass({
	render: function(){
		return (
			<div className="content-wrapper">
				<div className="container-fluid">
				<section className="content-header">
			      <h1>
			        New Theme
			        <small>Control panel</small>
			      </h1>
			      <ol className="breadcrumb">
			        <li><a href="#"><i className="fa fa-dashboard"></i> Home</a></li>
			        <li className="active">New Theme</li>
			      </ol>
			    </section>

			    <section className="content">
			    </section>
			    </div>
		    </div>
		)
	}
});

export default NewTheme;