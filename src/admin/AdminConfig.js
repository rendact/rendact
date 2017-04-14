const PageFields = [
  {id: 'title', label: "Title", width: 400, type: "link", target: "", cssClass:"titleText"},
  {id: 'slug', label: "Slug", textAlign:"center"},
  {id: 'author', label: "Author", textAlign:"center"},
  {id: 'status', label: "Status", textAlign:"center"},
  {id: 'comments', label: "Comments", width: 30, textAlign:"center"},
  {id: 'createdAt', label: "Published", textAlign:"center"}
];

const PostFields = [
  {id: 'title', label: "Title", width: 400, type: "link", target: "", cssClass:"titleText"},
  {id: 'slug', label: "Slug", textAlign:"center"},
  {id: 'author', label: "Author", textAlign:"center"},
  {id: 'category', label: "Category", textAlign:"center"},
  {id: 'tag', label: "Tags", textAlign:"center"},
  {id: 'like', label: "Likes", textAlign:"center"},
  {id: 'comments', label: "Comments", width: 30, textAlign:"center"},
  {id: 'createdAt', label: "Publish Date", textAlign:"center"}
]

const UserFields = [
  {id: 'image', label: "Image", type: "image", width: 10},
  {id: 'username', label: "Username", width: 400, type: "link", target: "", cssClass:"titleText"},
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
	{id: "modify-tag", label:"Add / modify tag"},
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
	'category' : 'modify-category',
	'tag' : 'modify-tag',
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

const AdminConfig = {
	PageFields: PageFields,
	PostFields: PostFields,
	UserFields: UserFields,
	PermissionList: PermissionList,
	MenuRoleValue: MenuRoleValue,
	PermalinkTypeList: PermalinkTypeList,
	ActivePermalinkType: ActivePermalinkType,
	RoleList: RoleList
}

module.exports = AdminConfig;
