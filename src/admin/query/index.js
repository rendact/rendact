import User from './User.js'
import Page from './Page.js'
import Login from './Login.js'
import Post from './Post.js'

const queries = {
  getUserQry: User.getUserQry,
  getLoginAuth0Mtn: Login.getLoginAuth0Mtn,
  loginUserQry: Login.loginUserQry,
  getCreatePostQry: Page.getCreatePostQry,
  createPostMetaMtn: Page.createPostMetaMtn,
  updatePostMetaMtn: Page.updatePostMetaMtn,
  getPageQry: Page.getPageQry,
  getUpdatePostQry: Page.getUpdatePostQry,
  getPageListQry: Page.getPageListQry,
  deletePostQry: Page.deletePostQry,
  getPostListQry: Post.getPostListQry,
  getAllCategoryQry: Post.getAllCategoryQry,
  getUserListQry: User.getUserListQry,
  createUserMtn: User.createUserMtn,
  getPostQry: Post.getPostQry,
  checkSlugQry: Page.checkSlugQry,
  saveProfileMtn: User.saveProfileMtn
}

module.exports = queries;