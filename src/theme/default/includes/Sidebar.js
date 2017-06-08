import React from 'react'

const Sidebar = React.createClass({
	render: function() {
		return (
			<div className="col-md-4 new-section">	
				<div className="sidebar-grid wow fadeInUpBig animated" data-wow-delay="0.4s">
					{
						this.props.widgets.map(function(item) { return item })
					}
				</div>
			</div>
		)
	}
});

export default Sidebar
