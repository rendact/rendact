import React from 'react';

export class InvalidTheme extends React.Component{
	componentDidMount(){
		require ('../../css/AdminLTE.css');
		require ('../../css/skins/_all-skins.css');	
		require ('font-awesome/css/font-awesome.css');
		require ('../../css/ionicons.min.css');
	}
	render() {
		return (
			<div className="content-wrapper" style={{minHeight: 1126}}>
			    <section className="content-header">
			      <h1>Error Page</h1>
			    </section>

			    <section className="content">
			      <div className="error-page">
			        <div className="error-content">
			          <h3><i className="fa fa-warning text-red"></i> Oops! Something went wrong.</h3>
			          <p>We will work on fixing that right away.</p>
			        </div>
			      </div>
			    </section>
			  </div>
		)
	}
}
