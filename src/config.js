
const ContentTypeList = {
	'posts': 	{id: 'posts', label: "Posts"},
	'news': 	{id: 'news', label: "News"},
	'articles': {id: 'articles', label: "Articles"}
};

const ActiveContentType = 'news';

const MenuJson = [
	{id: 'dashboard', label: 'Dashboard', icon: 'fa-dashboard', open: true, 
		elements: [
			{id: 'dashboard', label: 'Dashboard', icon: 'fa-dashboard', open: true, url: '/admin/dashboard'},
			{id: 'settings', label: 'Settings', icon: 'fa-gears', open: true, url: '/admin/settings'},
			{id: 'content', label: 'Content', icon: 'fa-book', open: false, url: '/admin/content'}
		]
	},
	{id: 'themes', label: 'Themes', icon: 'fa-image', open: false,
		elements: [
			{id: 'themes', label: 'Themes', icon: 'fa-image', open: true, url: '/admin/themes'},
			{id: 'customize-theme', label: 'Customize', icon: 'fa-gears', open: false, url: '/admin/themes/customize'}
		]
	},
	{id: 'plugins', label: 'Plugins', icon: 'fa-laptop', open: false,
		elements: [
			{id: 'plugins', label: 'Plugins', icon: 'fa-laptop', open: true, url: '/admin/plugins'}
		]
	},
	{id: 'separator', label: 'CONTENT'},
	{id: 'pages', label: 'Pages', icon: 'fa-sticky-note-o', open: false, 
		elements: [
			{id: 'pages', label: 'Pages', icon: 'fa-sticky-note-o', open: true, url: '/admin/pages'},
			{id: 'new-page', label: 'Add New', icon: 'fa-edit', open: false, url: '/admin/pages/new'}
		]
	},
	{id: ActiveContentType, label: ContentTypeList[ActiveContentType].label, icon: 'fa-sticky-note-o', open: false,
		elements: [
			{id: 'posts', label: 'Posts', icon: 'fa-sticky-note-o', open: true, url: '/admin/posts'},
			{id: 'new-post', label: 'Add New', icon: 'fa-edit', open: false, url: '/admin/posts/new'}
		]
	},
];

const config = {
	scapholdUrl: 'https://us-west-2.api.scaphold.io/graphql/rendact',
	activeContentType: ActiveContentType,
	contentTypeList: ContentTypeList,
	menuList: MenuJson
}

module.exports = config;
