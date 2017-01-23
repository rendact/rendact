import $ from 'jquery';
window.jQuery = $;
import React from 'react';
import Config from '../config';
window.config = Config;

const ThemeHome = React.createClass({
	render: function() {
		let Theme = require('../theme/'+window.config.theme.path+'/index.js').default;
		//return <div>OK</div>;
		return <Theme />
	}
});

const ThemeSingle = React.createClass({
	render: function() {
		let Post = require('../theme/'+window.config.theme.path+'/layouts/Post.js').default;
		return <Post/>;
	}
});

const ThemePage = React.createClass({
	render: function() {
		let Page = require('../theme/'+window.config.theme.path+'/layouts/Page.js').default;
		return <Page/>;
	}
});

module.exports = {
	ThemeHome: ThemeHome,
	ThemeSingle: ThemeSingle,
	ThemePage: ThemePage
}
