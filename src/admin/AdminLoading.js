import React from 'react';

var AdminLoading = React.createClass({
	componentDidMount: function(){
		require ('../css/AdminLTE.css');
		require ('../css/skins/_all-skins.css');
	},
	render: function(){
		return (
			<div className="content-wrapper-full" style={{minHeight: 1126}}>
		    <section className="content-header">
		      <h1>
            Loading
		      </h1>
		      <ol className="breadcrumb">
		        <li><a href="#"><i className="fa fa-dashboard"></i> Home</a></li>
		      </ol>
		    </section>

		    <section className="content">
          <h2 style={{marginTop:100,width:"100%",textAlign:"center"}}><i className="fa fa-spin fa-refresh"></i> Loading ...</h2>
		    </section>
		  </div>
		)
	}
});

export default AdminLoading;
