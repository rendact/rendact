const ContentTypeList = {
	'posts': 	{id: 'posts', label: "Posts", icon: "fa-pencil-square-o"},
	'news': 	{id: 'news', label: "News", icon: "fa-newspaper-o"},
	'articles': {id: 'articles', label: "Articles", icon: "fa-sticky-note-o"}
};

const ActiveContentType = 'news';

const MenuJson = [
	{id: 'dashboard', label: 'Dashboard', icon: 'fa-dashboard', open: false, 
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
	{id: 'plugins', label: 'Plugins', icon: 'fa-plug', open: false,
		elements: [
			{id: 'plugins', label: 'Plugins', icon: 'fa-laptop', open: true, url: '/admin/plugins'}
		]
	},
	{id: 'users', label: 'Users', icon: 'fa-users', open: false, 
		elements: [
			{id: 'users', label: 'Users', icon: 'fa-users', open: false, url: '/admin/users'},
			{id: 'users-new', label: 'Add New', icon: 'fa-user-plus', open: false ,url: '/admin/users/new'}
		]
	},
	{id: 'separator', label: 'CONTENT'},
	{id: 'pages', label: 'Pages', icon: 'fa-drivers-license-o', open: false, 
		elements: [
			{id: 'pages', label: 'Pages', icon: 'fa-drivers-license-o', open: true, url: '/admin/pages'},
			{id: 'pages-new', label: 'Add New', icon: 'fa-edit', open: false, url: '/admin/pages/new'}
		]
	},
	{id: ActiveContentType, label: ContentTypeList[ActiveContentType].label, icon: ContentTypeList[ActiveContentType].icon, open: false,
		elements: [
			{id: 'posts', label: 'Posts', icon: ContentTypeList[ActiveContentType].icon, open: true, url: '/admin/posts'},
			{id: 'posts-new', label: 'Add New', icon: 'fa-edit', open: false, url: '/admin/posts/new'}
		]
	},
];

const ActiveThemeConfig = {
	id: 'default',
	name: 'Default Theme',
	path: 'default',
	version: '1.0'
}

const PermalinkTypeList = {
	'post-id': {
		id: 'post-id',
		name: 'Post ID',
		description: '...'
	},
	'slug': {
		id: 'slug',
		name: 'Slug',
		description: '...'
	}
};

const ActivePermalinkType = 'post-id';

const defaultSwalStyling = {
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonClass: 'btn swal-btn-success',
  cancelButtonClass: 'btn swal-btn-danger',
  buttonsStyling: true
}

const config = {
	rootUrl: 'http://localhost:3000',
	scapholdUrl: 'https://us-west-2.api.scaphold.io/graphql/rendact',
	auth0ClientId: 'ppT7SigAoZtxsMkivihT2O1PLS7TYBFf',
	auth0Domain: 'rendact.auth0.com',
	activeContentType: ActiveContentType,
	contentTypeList: ContentTypeList,
	menuList: MenuJson,
	theme: ActiveThemeConfig,
	permalinkTypeList: PermalinkTypeList,
	activePermalinkType: ActivePermalinkType,
	defaultSwalStyling: defaultSwalStyling,
	guestRoleId: "Um9sZTo1",
	adminToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJraW5kIjoic2NhcGhvbGQuc3VwZXJ1c2VyIiwiZXhwIjo4NjQwMDAwMDAwMDAwMDAwLCJpYXQiOjE0ODg4NzMyODUsImF1ZCI6Ikp0Z2Z5WklRMnBKajlySThFOWU2MTdoUWNrMFJueEFuIiwiaXNzIjoiaHR0cHM6Ly9zY2FwaG9sZC5hdXRoMC5jb20vIiwic3ViIjoiMWY1ZDY3ZGYtZDQ2My00ZTliLWI0NDctOWUyMGEyNjhjYjUxIn0.GgTXH8Vie2PoZToBiMhz2CqQyB-dHqgi9VQeMJJThlM"
}

module.exports = config;
