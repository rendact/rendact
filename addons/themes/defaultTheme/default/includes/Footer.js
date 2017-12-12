import React from 'react'

const Footer = React.createClass({
	render: function() {
		return (
		<div className="footer">
			<div className="container">
				<div className="f-grids">
					{
						this.props.footerWidgets.map(function(item) { return item })
					}
					<div className="clearfix"></div>
				</div>
				
				<div className="copy">
					<p>Place sticky footer content here.<a></a></p>
		        </div>
			</div>
		</div>
		)
	}
});

export default Footer
