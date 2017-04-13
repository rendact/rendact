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

const AdminConfig = {
	PageFields: PageFields,
	PostFields: PostFields,
	UserFields: UserFields
}

module.exports = AdminConfig;
