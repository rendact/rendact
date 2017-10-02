import React from 'react'

const Footer = React.createClass({
	render: function() {
		return (
	<footer id="footer">
		<ul className="icons">
			<li><a href="https://www.facebook.com/rendact" className="icon alt fa-facebook"><span className="label">Facebook</span></a></li>
			<li><a href="https://github.com/rendact/rendact" className="icon alt fa-github"><span className="label">GitHub</span></a></li>
			<li><a href="https://t.me/rendactcom" className="icon alt fa-telegram"><span className="label">Telegram</span></a></li>
			<li><a href="mailto:info@rendact.com" className="icon alt fa-envelope"><span className="label">Email</span></a></li>
		</ul>
		<ul className="copyright">
			<li>&copy; Rendact. All rights reserved.</li><li>Design: <a href="http://html5up.net">Landing</a></li>
		</ul>
	</footer>
		)
	}
});

export default Footer
