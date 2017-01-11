import React from 'react';

var NotFound = React.createClass({
	render: function(){
		return (
			<div className="content-wrapper" style={{height: '100%'}}>
				<section className="content-header">
			      <h1>
			        Content not found
			      </h1>
			    </section>

			    <section className="content">
			    	<p>Content your are trying to access is not found</p>
			    </section>
		    </div>
		)
	}
});

export default NotFound;