import User from './User.js'
import Page from './Page.js'
import Login from './Login.js'
import Post from './Post.js'

const queries = {
  getUserQry: User.getUserQry,
  getLoginAuth0Mtn: Login.getLoginAuth0Mtn,
  loginUserQry: Login.loginUserQry,
  getCreatePageQry: Page.getCreatePageQry,
  createPostMetaMtn: Page.createPostMetaMtn,
  updatePostMetaMtn: Page.updatePostMetaMtn,
  getPageQry: Page.getPageQry,
  getUpdatePageQry: Page.getUpdatePageQry,
  getPageListQry: Page.getPageListQry,
  getPageDelQry: Page.getPageDelQry,
  deletePostQry: Page.deletePostQry,
  deletePostPermanentQry: Page.deletePostPermanentQry,
  getCreatePostQry: Post.getCreatePostQry,
  getUpdatePostQry: Post.getUpdatePostQry,
  getPostListQry: Post.getPostListQry,
  getAllCategoryQry: Post.getAllCategoryQry,
  getCreateCategoryOfPostQry: Post.getCreateCategoryOfPostQry,
  getUpdateCategoryOfPostQry: Post.getUpdateCategoryOfPostQry,
  getUserListQry: User.getUserListQry,
  createUserMtn: User.createUserMtn,
  getPostQry: Post.getPostQry,
  checkSlugQry: Page.checkSlugQry,
  saveProfileMtn: User.saveProfileMtn,
  saveUserMetaMtn: User.saveUserMetaMtn,
  createUserMetaMtn: User.createUserMetaMtn,
  changePasswordMtn: User.changePasswordMtn
}

module.exports = queries;