import React from 'react';

const Loading = React.createClass({
	componentDidMount: function(){
		require ('../css/AdminLTE.css');
		require ('../css/skins/_all-skins.css');	
		require ('font-awesome/css/font-awesome.css');
    require ('../css/ionicons.min.css');
	},
	render: function() {
		return (
			<div>
			<h2 style={{marginTop:100,width:"100%",textAlign:"center"}}><i className="fa fa-spin fa-refresh"></i> Loading ...</h2>
			</div>
		)
	}
});

export default Loading;
