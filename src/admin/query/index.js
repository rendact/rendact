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
  deletePostQry: Page.deletePostQry,
  deletePostPermanentQry: Page.deletePostPermanentQry,
  getCreatePostQry: Post.getCreatePostQry,
  getUpdatePostQry: Post.getUpdatePostQry,
  getPostListQry: Post.getPostListQry,
  getAllCategoryQry: Post.getAllCategoryQry,
  getCreateCategoryOfPostQry: Post.getCreateCategoryOfPostQry,
  getUpdateCategoryOfPostQry: Post.getUpdateCategoryOfPostQry,
  getUserListQry: User.getUserListQry,
  getUserListByTypeQry: User.getUserListByTypeQry,
  createUserMtn: User.createUserMtn,
  getPostQry: Post.getPostQry,
  checkSlugQry: Page.checkSlugQry,
  saveProfileMtn: User.saveProfileMtn,
  saveUserMetaMtn: User.saveUserMetaMtn,
  createUserMetaMtn: User.createUserMetaMtn,
  createUpdateUserMetaMtn: User.createUpdateUserMetaMtn,
  changePasswordMtn: User.changePasswordMtn,
  recoverPostQry: Page.recoverPostQry,
  addRoleToUser: User.addRoleToUser,
  deleteRoleUser: User.deleteRoleUser,
  getRolesQry: User.getRolesQry
}

module.exports = queries;