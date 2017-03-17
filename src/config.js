const ContentTypeList = {
	'posts': 	{id: 'posts', label: "Posts", icon: "fa-pencil-square-o"},
	'news': 	{id: 'news', label: "News", icon: "fa-newspaper-o"},
	'articles': {id: 'articles', label: "Articles", icon: "fa-sticky-note-o"}
};

const ActiveContentType = 'posts';

const MenuJson = [
	{id: 'dashboard', label: 'Dashboard', icon: 'fa-dashboard', open: false, role: 1,
		elements: [
			{id: 'dashboard', label: 'Dashboard', icon: 'fa-dashboard', open: true, url: '/admin/dashboard', role: 1},
			{id: 'settings', label: 'Settings', icon: 'fa-gears', open: true, url: '/admin/settings', role: 10},
			{id: 'content', label: 'Content', icon: 'fa-book', open: false, url: '/admin/content', role: 10}
		]
	},
	{id: 'themes', label: 'Themes', icon: 'fa-image', open: false, role: 10,
		elements: [
			{id: 'themes', label: 'Themes', icon: 'fa-image', open: true, url: '/admin/themes', role: 10},
			{id: 'customize-theme', label: 'Customize', icon: 'fa-gears', open: false, url: '/admin/themes/customize', role: 10}
		]
	},
	{id: 'plugins', label: 'Plugins', icon: 'fa-plug', open: false, role: 10,
		elements: [
			{id: 'plugins', label: 'Plugins', icon: 'fa-laptop', open: true, url: '/admin/plugins', role: 10}
		]
	},
	{id: 'users', label: 'Users', icon: 'fa-users', open: false, role: 1,
		elements: [
			{id: 'users', label: 'Users', icon: 'fa-users', open: false, url: '/admin/users', role: 1},
			{id: 'permission', label: 'Permission', icon: 'fa-users', open: false, url: '/admin/users/permission', role: 10},
			{id: 'users-new', label: 'Add New', icon: 'fa-user-plus', open: false ,url: '/admin/users/new', role: 10}
		]
	},
	{id: 'separator', label: 'CONTENT'},
	{id: 'pages', label: 'Pages', icon: 'fa-drivers-license-o', open: false, role: 5,
		elements: [
			{id: 'pages', label: 'Pages', icon: 'fa-drivers-license-o', open: true, url: '/admin/pages', role: 5},
			{id: 'pages-new', label: 'Add New', icon: 'fa-edit', open: false, url: '/admin/pages/new', role: 5}
		]
	},
	{id: ActiveContentType, label: ContentTypeList[ActiveContentType].label, icon: ContentTypeList[ActiveContentType].icon, open: false, role: 5,
		elements: [
			{id: 'posts', label: 'Posts', icon: ContentTypeList[ActiveContentType].icon, open: true, url: '/admin/posts', role: 5},
			{id: 'posts-new', label: 'Add New', icon: 'fa-edit', open: false, url: '/admin/posts/new', role: 5}
		]
	},
];

const menuRoleValue = {
	'dashboard' : 1,
	'settings' : 1,
	'profile' : 1,
	'posts' : 5,
	'pages' : 5,
	'themes' : 10,
	'plugins' : 10,
	'users' : 1,
	'posts-new' : 5,
	'pages-new' : 5,
	'theme-new' : 5,
	'users-new' : 10,
	'posts-edit' : 5,
	'pages-edit' : 5,
	'users-edit' : 10
}

const roleValue = {
	"Administrator": 10,
	"Editor": 6,
	"Author": 5,
	"Subscriber": 2,
	"Guest": 1
}

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

const userMetaList = ["bio","website","facebook","twitter","linkedin","phone","timezone", "userPrefConfig"];

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
	userMetaList: userMetaList,
	adminToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJraW5kIjoic2NhcGhvbGQuc3VwZXJ1c2VyIiwiZXhwIjo4NjQwMDAwMDAwMDAwMDAwLCJpYXQiOjE0ODg4NzMyODUsImF1ZCI6Ikp0Z2Z5WklRMnBKajlySThFOWU2MTdoUWNrMFJueEFuIiwiaXNzIjoiaHR0cHM6Ly9zY2FwaG9sZC5hdXRoMC5jb20vIiwic3ViIjoiMWY1ZDY3ZGYtZDQ2My00ZTliLWI0NDctOWUyMGEyNjhjYjUxIn0.GgTXH8Vie2PoZToBiMhz2CqQyB-dHqgi9VQeMJJThlM",
	roleValue: roleValue,
	menuRoleValue: menuRoleValue,
	adminMode: false
}

module.exports = config;
