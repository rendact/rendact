import React from 'react';

var LostConnection = React.createClass({
	componentDidMount: function(){
		require ('../css/AdminLTE.css');
		require ('../css/skins/_all-skins.css');
	},
	render: function(){
		return (
			<div className="lockscreen-wrapper">
			  
			  <h3 className="text-yellow text-center">Lost connection</h3>

			  <div className="help-block text-center">
			    It seems you have lost your internet connection, please check it out or ask your network administrator
			  </div>
			  <div className="text-center">
			    <a href="/">Try again</a>
			  </div>
			</div>
		)
	}
});

export default LostConnection;
