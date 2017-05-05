const PageFields = [
  {id: 'title', label: "Title", width: 220, type: "link", target: "", cssClass:"titleText"},
  {id: 'slug', label: "Slug", width: 220, textAlign:"center"},
  {id: 'author', label: "Author", textAlign:"center"},
  {id: 'status', label: "Status", textAlign:"center"},
  {id: 'comments', label: "Comments", width: 30, textAlign:"center"},
  {id: 'createdAt', label: "Published", textAlign:"center"}
];

const PostFields = [
  {id: 'title', label: "Title", width: 220, type: "link", target: "", cssClass:"titleText"},
  {id: 'slug', label: "Slug", width: 220, textAlign:"center"},
  {id: 'author', label: "Author", textAlign:"center"},
  {id: 'category', label: "Category", textAlign:"center"},
  {id: 'tag', label: "Tags", textAlign:"center"},
  {id: 'like', label: "Likes", textAlign:"center"},
  {id: 'comments', label: "Comments", width: 30, textAlign:"center"},
  {id: 'createdAt', label: "Published", textAlign:"center"}
]

const UserFields = [
  {id: 'image', label: "Image", type: "image", width: 10},
  {id: 'username', label: "Username", width: 250, type: "link", target: "", cssClass:"titleText"},
  {id: 'email', label: "Email"},
  {id: 'fullName', label: "Full name"},
  {id: 'gender', label: "Gender", textAlign:"center"},
  {id: 'roles', label: "Role", textAlign:"center"},
  {id: 'posts', label: "Posts", width: 30, textAlign:"center"}
]

const PermissionList = [
	{id: "view-page", label: "View page list"},
	{id: "modify-page", label: "Add / modify page"},
	{id: "view-post", label: "View post list"},
	{id: "modify-post", label:"Add / modify post"},
	{id: "modify-category", label:"Add / modify category"},
	{id: "modify-tag", label:"View tag list / Add / modify tag"},
	{id: "view-user", label: "View user list"},
	{id: "modify-user", label: "Add / modify user"},
	{id: "modify-settings", label: "Modify settings"},
	{id: "view-stats", label: "View statistics"},
	{id: "upload-media", label: "Upload media"},
	{id: "modify-permission", label: "Modify permission"},
	{id: "view-plugins", label: "View plugins list"},
	{id: "modify-plugins", label: "Add / modify plugins"},
	{id: "view-themes", label: "View themes list"},
	{id: "modify-themes", label: "Add / modify themes"},
	{id: "view-content", label: "View content type list"},
	{id: "modify-content", label: "Add / modify content type"}
];

const MenuRoleValue = {
	'dashboard' : 'all',
	'settings' : 'modify-settings',
	'profile' : 'all',
	'posts' : 'view-post',
	'pages' : 'view-page',
	'themes' : 'view-page',
	'plugins' : 'view-plugins',
	'users' : 'view-user',
	'permission': 'modify-permission',
	'posts-new' : 'modify-post',
	'posts-category' : 'modify-category',
	'posts-tag' : 'modify-tag',
	'tag-new' : 'modify-tag',
	'tag-edit' : 'modify-tag',
	'pages-new' : 'modify-page',
	'theme-new' : 'modify-themes',
	'users-new' : 'modify-user',
	'posts-edit' : 'modify-post',
	'pages-edit' : 'modify-page',
	'users-edit' : 'modify-user',
	'content': 'view-content',
	'content-new': 'modify-content',
	'content-edit': 'modify-content'
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

const RoleList = ["Owner","Admin", "Editor", "Author", "Subscriber", "No Role"]

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
			{id: 'posts-category', label: 'Categories', icon: 'fa-edit', open: false, url: '/admin/posts/category', role: 5, roleId: 'modify-category'},
			{id: 'posts-tag', label: 'Tags', icon: 'fa-edit', open: false, url: '/admin/posts/tag', role: 5, roleId: 'modify-tag'}
		]
	},
];

const ActiveThemeConfig = {
	id: 'default',
	name: 'Default Theme',
	path: 'default',
	version: '1.0'
}

const defaultSwalStyling = {
  showCancelButton: true,
  confirmButtonColor: '#ff0000',
  cancelButtonColor: 'grey',
  confirmButtonClass: 'btn swal-btn-success',
  cancelButtonClass: 'btn swal-btn-danger',
  buttonsStyling: true,
  customClass: 'swal'
}

const userMetaList = ["bio","website","facebook","twitter","linkedin","phone","timezone", "userPrefConfig"];

const roleValue = {
	"Owner": 100,
	"Admin": 10,
	"Editor": 6,
	"Author": 5,
	"Contributor": 2,
	"Subscriber": 1
}

const AdminConfig = {
	PageFields: PageFields,
	PostFields: PostFields,
	UserFields: UserFields,
	PermissionList: PermissionList,
	MenuRoleValue: MenuRoleValue,
	PermalinkTypeList: PermalinkTypeList,
	ActivePermalinkType: ActivePermalinkType,
	RoleList: RoleList,
	menuList: MenuJson,
	theme: ActiveThemeConfig,
	defaultSwalStyling: defaultSwalStyling,
	userMetaList: userMetaList,
	roleValue: roleValue
}

module.exports = AdminConfig;
