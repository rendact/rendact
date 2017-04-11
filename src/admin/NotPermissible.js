import React from 'react';

var NotPermissible = React.createClass({
	componentDidMount: function(){
		
	},
	render: function(){
		return (
			<div className="content-wrapper">
				<div className="content-fluid">
					<section className="content">
						<div className="row">
						  <h3 className="text-center">
						    You don't have permissions to access this page
						  </h3>
						</div>
					</section>
				</div>
			</div>
		)
	}
});

export default NotPermissible;