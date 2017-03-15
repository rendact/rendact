import React from 'react';

var NotPermissible = React.createClass({
	componentDidMount: function(){
		require ('../../public/css/AdminLTE.css');
		require ('../../public/css/skins/_all-skins.css');
	},
	render: function(){
		return (
			<div className="content-wrapper-full" style={{minHeight: 1126}}>
		    <section className="content-header">
		      <h1>
		        No Priveledges
		      </h1>
		      <ol className="breadcrumb">
		        <li><a href="#"><i className="fa fa-dashboard"></i> Home</a></li>
		        <li className="active">No priveledges</li>
		      </ol>
		    </section>

		    <section className="content">
		      <div className="error-page">
		        <div className="error-content">
		          <p>
		            You don't have priveledges to access this page
		          </p>
		        </div>
		      </div>
		    </section>
		  </div>
		)
	}
});

export default NotPermissible;