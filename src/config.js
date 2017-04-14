const MenuJson = [
	{id: 'dashboard', label: 'Site', icon: 'fa-dashboard', open: false, role: 1, 
		elements: [
			{id: 'dashboard', label: 'Dashboard', icon: 'fa-dashboard', open: true, url: '/admin/dashboard', role: 1},
			{id: 'settings', label: 'Settings', icon: 'fa-gears', open: true, url: '/admin/settings', role: 10, roleId: 'modify-settings'},
			{id: 'content', label: 'Content', icon: 'fa-book', open: false, url: '/admin/content', role: 10, roleId: 'view-content'}
		]
	},
	{id: 'themes', label: 'Themes', icon: 'fa-image', open: false, role: 10, roleId: 'view-themes',
		elements: [
			{id: 'themes', label: 'Themes', icon: 'fa-image', open: true, url: '/admin/themes', role: 10, roleId: 'view-themes'},
			{id: 'customize-theme', label: 'Customize', icon: 'fa-gears', open: false, url: '/admin/themes/customize', role: 10, roleId: 'view-themes'}
		]
	},
	{id: 'plugins', label: 'Plugins', icon: 'fa-plug', open: false, role: 10, roleId: 'view-plugins',
		elements: [
			{id: 'plugins', label: 'Plugins', icon: 'fa-laptop', open: true, url: '/admin/plugins', role: 10, roleId: 'view-plugins'}
		]
	},
	{id: 'users', label: 'Users', icon: 'fa-users', open: false, role: 1, roleId: 'view-user',
		elements: [
			{id: 'users', label: 'Users', icon: 'fa-users', open: false, url: '/admin/users', role: 1, roleId: 'view-user'},
			{id: 'permission', label: 'Permissions', icon: 'fa-users', open: false, url: '/admin/users/permissions', role: 10, roleId: 'modify-permission'},
			{id: 'users-new', label: 'Add New', icon: 'fa-user-plus', open: false ,url: '/admin/users/new', role: 10, roleId: 'modify-user'}
		]
	},
	{id: 'separator', label: 'CONTENT'},
	{id: 'pages', label: 'Pages', icon: 'fa-drivers-license-o', open: false, role: 5, roleId: 'view-page',
		elements: [
			{id: 'pages', label: 'Pages', icon: 'fa-drivers-license-o', open: true, url: '/admin/pages', role: 5, roleId: 'view-page'},
			{id: 'pages-new', label: 'Add New', icon: 'fa-edit', open: false, url: '/admin/pages/new', role: 5, roleId: 'modify-page'}
		]
	},
	{id: 'posts', label: 'Posts', icon: 'fa-pencil-square-o', open: false, role: 5, roleId: 'view-post',
		elements: [
			{id: 'posts', label: 'Posts', icon: 'fa-pencil-square-o', open: true, url: '/admin/posts', role: 5, roleId: 'view-post'},
			{id: 'posts-new', label: 'Add New', icon: 'fa-edit', open: false, url: '/admin/posts/new', role: 5, roleId: 'modify-post'},
			{id: 'category', label: 'Categories', icon: 'fa-edit', open: false, url: '/admin/posts/categories', role: 5, roleId: 'modify-category'},
			{id: 'tag', label: 'Tags', icon: 'fa-edit', open: false, url: '/admin/posts/tags', role: 5, roleId: 'modify-tag'}
		]
	},
];

const roleValue = {
	"Owner": 100,
	"Admin": 10,
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
	//scapholdUrl: 'https://us-west-2.api.scaphold.io/graphql/rendact',
	scapholdUrl: 'https://us-west-2.api.scaphold.io/graphql/rendact-fork',
	auth0ClientId: 'ppT7SigAoZtxsMkivihT2O1PLS7TYBFf',
	auth0Domain: 'rendact.auth0.com',
	menuList: MenuJson,
	theme: ActiveThemeConfig,
	defaultSwalStyling: defaultSwalStyling,
	userMetaList: userMetaList,
	adminToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJraW5kIjoic2NhcGhvbGQuc3VwZXJ1c2VyIiwiZXhwIjo4NjQwMDAwMDAwMDAwMDAwLCJpYXQiOjE0OTA3NTczOTEsImF1ZCI6Ikp0Z2Z5WklRMnBKajlySThFOWU2MTdoUWNrMFJueEFuIiwiaXNzIjoiaHR0cHM6Ly9zY2FwaG9sZC5hdXRoMC5jb20vIiwic3ViIjoiMWY1ZDY3ZGYtZDQ2My00ZTliLWI0NDctOWUyMGEyNjhjYjUxIn0.iPcAUCUVbYpVGCS3bqqNXAQP5bWXJJOE7LW85AvH8Q0",
	//adminToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJraW5kIjoic2NhcGhvbGQuc3VwZXJ1c2VyIiwiZXhwIjo4NjQwMDAwMDAwMDAwMDAwLCJpYXQiOjE0ODg4NzMyODUsImF1ZCI6Ikp0Z2Z5WklRMnBKajlySThFOWU2MTdoUWNrMFJueEFuIiwiaXNzIjoiaHR0cHM6Ly9zY2FwaG9sZC5hdXRoMC5jb20vIiwic3ViIjoiMWY1ZDY3ZGYtZDQ2My00ZTliLWI0NDctOWUyMGEyNjhjYjUxIn0.GgTXH8Vie2PoZToBiMhz2CqQyB-dHqgi9VQeMJJThlM",
	roleValue: roleValue,
	adminMode: false
}

module.exports = config;
