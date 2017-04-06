import React from 'react';

var Plugins = React.createClass({
	render: function(){
		return (
			<div className="content-wrapper" style={{height: '100%'}}>
			<div className="container-fluid">
				<section className="content-header">
			      <h1>
			        Plugin List
			      </h1>
			      <ol className="breadcrumb">
			        <li><a href="#"><i className="fa fa-dashboard"></i> Home</a></li>
			        <li className="active">Plugins List</li>
			      </ol>
			      <div style={{borderBottom:"#000000" , borderBottomStyle:"groove", borderWidth:2, marginTop: 10}}></div>
			    </section>

			    <section className="content">
			    </section>
			</div>
		    </div>
		)
	}
});

export default Plugins;