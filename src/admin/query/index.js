import User from './User.js'
import Page from './Page.js'
import Login from './Login.js'
import Post from './Post.js'
import Settings from './Settings.js'
import Content from './Content.js'
import Menu from './Menu.js'
import Widget from './Widget'

const subscriptionQry = `subscription {
      subscribeToPost(filter: {status: {eq: "Published"}}, mutations: [createPost]) {
        value {
          id
          title
          content
        }
      }
    }
  `

const queries = {
  getUserQry: User.getUserQry,
  getLoginAuth0Mtn: Login.getLoginAuth0Mtn,
  loginUserQry: Login.loginUserQry,
  getCreatePageQry: Page.getCreatePageQry,
  createUpdatePostMetaMtn: Page.createUpdatePostMetaMtn,
  getPageQry: Page.getPageQry,
  getUpdatePageQry: Page.getUpdatePageQry,
  getPageListQry: Page.getPageListQry,
  deletePostQry: Post.deletePostQry,
  deletePostPermanentQry: Page.deletePostPermanentQry,
  getCreatePostQry: Post.getCreatePostQry,
  getUpdatePostQry: Post.getUpdatePostQry,
  getPostListQry: Post.getPostListQry,
  getContentsQry: Post.getContentsQry,
  getAllCategoryQry: Post.getAllCategoryQry,
  getCreateCategoryOfPostQry: Post.getCreateCategoryOfPostQry,
  getUpdateCategoryOfPostQry: Post.getUpdateCategoryOfPostQry,
  searchPost: Post.searchPost,
  getUserListQry: User.getUserListQry,
  getUserListByTypeQry: User.getUserListByTypeQry,
  createUserMtn: User.createUserMtn,
  getPostQry: Post.getPostQry,
  checkSlugQry: Page.checkSlugQry,
  saveProfileMtn: User.saveProfileMtn,
  saveUserMetaMtn: User.saveUserMetaMtn,
  checkUsernameQry: User.checkUsernameQry,
  checkEmailQry: User.checkEmailQry,
  createUserMetaMtn: User.createUserMetaMtn,
  createUpdateTagOfPostMtn: Post.createUpdateTagOfPostMtn,
  changePasswordMtn: User.changePasswordMtn,
  recoverPostQry: Page.recoverPostQry,
  addRoleToUser: User.addRoleToUser,
  deleteRoleUser: User.deleteRoleUser,
  getRolesQry: User.getRolesQry,
  createUpdateCategoryOfPostMtn: Post.createUpdateCategoryOfPostMtn,
  loadSettingsQry: Settings.loadSettingsQry,
  getPermissionConfigQry: Settings.getPermissionConfigQry,
  createUpdateSettingsMtn: Settings.createUpdateSettingsMtn,
  createUpdatePermissionMtn: Settings.createUpdatePermissionMtn,
  getContentListQry: Content.getContentListQry,
  createContentMtn: Content.createContentMtn,
  getContentQry: Content.getContentQry,
  deleteContentQry: Content.deleteContentQry,
  getContentPostListQry: Content.getContentPostListQry,
  updateContentMtn: Content.updateContentMtn,
  createComment: Content.createComment,
  deleteUserQry: User.deleteUserQry,
  updateRoleUser: User.updateRoleUser,
  getAllTagQry: Post.getAllTagQry,
  deleteCategoryPermanentQry: Post.deleteCategoryPermanentQry,
  deleteTagPermanentQry: Post.deleteTagPermanentQry,
  createCategory: Post.createCategory,
  updateCategory: Post.updateCategory,
  createTag: Post.createTag,
  UpdateTag: Post.UpdateTag,
  checkContentSlugQry: Content.checkContentSlugQry,
  addImageGallery: Post.addImageGallery,
  removeImageGallery: Post.removeImageGallery,
  bindImageGallery: Post.bindImageGallery,
  subscriptionQry: subscriptionQry,
  setAsOwner: User.setAsOwner,
  createMenu: Menu.createMenu,
  getAllMenu: Menu.getAllMenu,
  deleteMenuQry: Menu.deleteMenuQry,
  updateMenu: Menu.updateMenu,
  updateMainMenu: Menu.updateMainMenu,
  getAllPage: Menu.getAllPage,
  getAllPost: Menu.getAllPost,
  getAllCategory: Menu.getAllCategory,
  getMenuQry: Menu.getMenuQry,
  getMainMenu: Menu.getMainMenu,
  loadAllMenuData: Menu.loadAllMenuData,
  updateMenuWithPos: Menu.updateMenuWithPos,
  createWidget: Widget.createWidget,
  getAllWidgets: Widget.getAllWidgets,
  updateListOfWidget: Widget.updateListOfWidget,
  getListOfWidget: Widget.getListOfWidget,
  updateWidget: Widget.updateWidget,
  findWidget: Widget.findWidget,
  getAllActiveWidgets: Widget.getAllActiveWidgets
}

export default queries;
