import React from 'react';

class Footer extends React.Component {
	render() {
		return (
			<footer className="main-footer">
			    <div className="pull-right hidden-xs">
			      <b>Version</b> 0.1.0
			    </div>
			    <strong>Copyright &copy; 2016 <a href="http://rendact.com">Rendact</a>.</strong> All rights
			    reserved.
			</footer>
		)
	}
}

export default Footer;