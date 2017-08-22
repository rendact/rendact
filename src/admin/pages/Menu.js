import React from 'react';
import {Link} from 'react-router';
import Query from '../query';
import _ from 'lodash';
import uuid from 'uuid';
import Halogen from 'halogen';
import Notification from 'react-notification-system';
import {connect} from 'react-redux'
import {toggleSelectAll, maskArea, setPosition, setResetDelete, setTreeData, setSelectedMenuName, setDisabled, setNewMenuId,  loadmenuSelect,
  setIdMainMenu, setPageListMenu, setMenuId, setAllPageList, setAllPostList, setCategoryMenu, assignValueToMenuItem} from '../../actions'
import {swalert, riques, errorCallback, disableForm, defaultHalogenStyle, disableBySelector} from '../../utils';
import {Nestable} from '../lib/react-dnd-nestable/react-dnd-nestable';
import {reduxForm, Field, formValueSelector, change} from 'redux-form'


let MenuContentForm = (props) => (
<div className={props.type === 'page' ? "box box-default box-solid" : "box box-default collapsed-box box-solid"}>
                <div className="box-header with-border">
                  <h3 className="box-title">{props.panelTitle}</h3>
                  <div className="box-tools pull-right">
                      <button type="button" className="btn btn-box-tool"  data-widget="collapse"><i className={props.type === 'page'? "fa fa-minus" : "fa fa-plus"}></i>
                      </button>
                  </div>
                </div>
                <div className="box-body pad">
  <form onSubmit={props.handleSubmit(values => props.addToMenu(values, props.type, props.itemList, props.reset))}>
                  <div id={props.elementId}>
                    {
                      _.map(props.itemList, (item, index) => (
                        <div key={index}>
                          <Field component="input" type="checkbox" name={props.type + "["+index+"]"} className={props.type+"Menu"}/>
                          {item.node.name || item.node.title}
                        </div>
                      ))
                    }
                    </div>
                    <div style={{borderBottom:"#eee" , borderBottomStyle:"groove", borderWidth:2, marginTop: 10, marginBottom: 10}}></div>
                    <button id={props.type+"SelectAll"} type="submit" className="btn btn-default" style={{marginRight: 10}} onClick={props.selectAll}>Select All</button>
                    <div className="box-tools pull-right">
                      <button id={props.type+"Submit"} className="btn  btn-default" type="submit" style={{marginRight: 10}} onClick={e => {e.currentTarget.parentElement.parentElement.checked=false;}} >Add to Menu</button>
                    </div>
  </form>
                </div>
              </div>
)


MenuContentForm = connect(
  state => {
    if (!_.isEmpty(state.menu)) {
      var out = _.head(state.menu);
      return out;
      
    } else return {};
  },
  (dispatch, ownProps) => ({
    selectAll(e){
      e.preventDefault();
      let status = ownProps.allSelectState[ownProps.type]

      _.forEach(ownProps.itemList, (item, index) => {
        ownProps.change(ownProps.type + "[" + index.toString() + "]", !status);
      });
      dispatch(toggleSelectAll(!status, ownProps.type))
    }
    
  })
)(MenuContentForm)

MenuContentForm = reduxForm({form: 'menuContentForm'})(MenuContentForm)


let CustomUrlForm = (props) => {
  let submitDisable = false;

  if (!props.url)  submitDisable = true
  if (!props.title)  submitDisable = true
  
  return(
  <div className="box box-default collapsed-box box-solid">
    <div className="box-header with-border">
      <h3 className="box-title">Custom Links</h3>
      <div className="box-tools pull-right">
          <button type="button" className="btn btn-box-tool"  data-widget="collapse"><i className="fa fa-plus"></i>
          </button>
      </div>
    </div>
    <div className="box-body pad">
      <form onSubmit={props.handleSubmit(value => props.handleUrlSubmit(value, props.reset))} id="urlSabmit" method="get">

        <div className="row">
          <div className="col-md-3">
            <h5>TITLE</h5>
          </div>
          <div className="col-md-9">
            <Field name="title" component="input" type="text" className="form-control"/>
          </div>
        </div>

        <div className="row">
          <div className="col-md-3">
            <h5>URL</h5>
          </div>
          <div className="col-md-9">
            <Field name="url" component="input" type="text" className="form-control"/>
          </div>
        </div>

        <div style={{borderBottom:"#eee" , borderBottomStyle:"groove", borderWidth:2, marginTop: 10, marginBottom: 10}}></div>
        <div className="box-tools pull-right">
          <button disabled={submitDisable} type="submit" id="submit" className="btn  btn-default">Add to Menu</button>
        </div>
      </form>
    </div>
  </div>  
)}

CustomUrlForm = reduxForm({form: 'customUrlForm'})(CustomUrlForm)
let custUrlSelector = formValueSelector('customUrlForm');
CustomUrlForm = connect(
  state => {
    return  {
    url: custUrlSelector(state, 'url'),
    title: custUrlSelector(state, 'title')
    }
  },
)(CustomUrlForm)

const MenuPanel = React.createClass({

  componentDidMount: function(){
    let inputsText = document.querySelectorAll("input[type='text']");
    _.forEach(inputsText, input => {
      input.onchange = (e) => {
        this.props.notifyUnsavedData(true)
      }
    });
  },

  render: function() {
    var itemData = this.props.itemData;
    var originalLink;

    if(itemData.type === 'url') {
      originalLink = <a href={itemData.target} target="_blank">{itemData.titlePanel}</a>
    } else {
      originalLink = <Link to={"/" + itemData.type + "/" + itemData.target}>{itemData.titlePanel} </Link>
    }
  let item;

    if (this.props.isDragging) {
      item = <div id={itemData.id} className="box" style={{background:'white', border: '1px dashed gray'}}>
        <div className="box-header with-border" style={{background:'white', color:'white'}}>{itemData.label? itemData.label : itemData.titlePanel}</div>
        </div>
    } else {


  item =  (
    <div id={itemData.id} className="box collapsed-box">
      {this.props.connectDragSource(<div className="box-header with-border" style={{cursor: 'move'}}>
        <h3 className="box-title" style={{paddingRight : itemData.type === "category"? 75 : 50}}>{itemData.label? itemData.label : itemData.titlePanel}</h3>
        <div className="box-tools pull-right">
          <span className="label label-default" id="typeValue">
            {itemData.type}
          </span>
          <button type="button" className="btn btn-box-tool" data-widget="collapse"><i id={"icon-"+itemData.titlePanel} className="fa fa-plus"></i>
          </button>
        </div>
      </div>)}
        <div className="box-body" style={{display: "none"}}>

          <div style={{margin: "15px 0", border: "solid 1px #ccc", padding: "10px 5px"}}>
            <em>Original</em> : {originalLink}
          </div>

          <div className="form-group">
            <i htmlFor="name" >Label</i>
            <input 
              type="text" 
              name="name" 
              id="labelValue" 
              className="form-control" 
              required="true"
              defaultValue={itemData.label? itemData.label: itemData.titlePanel} 
              onChange={(e) => this.props.assignValueToMenuItem(itemData.id, 'label', e.currentTarget.value)}
            />
          </div>
          <div className="form-group">
            <i htmlFor="name" >Tooltip</i>
            <input type="text" 
              name="tooltipValue" 
              defaultValue={itemData.tooltip} 
              id="tooltipValue" 
              className="form-control"
              onChange={(e) => this.props.assignValueToMenuItem(itemData.id, 'tooltip', e.currentTarget.value)}
            />
          </div>
          { itemData.type==="url" &&
          <div className="form-group">
            <i htmlFor="name" >URL</i>
            <input type="text"
              name="urlValue" 
              id="urlValue" 
              className="form-control" 
              defaultValue={itemData.url}
              onChange={(e) => this.props.assignValueToMenuItem(itemData.id, 'url', e.currentTarget.value)}
            />
          </div>
          }
          
          <div className="col-md-6">
            <button type="button" value={itemData.titlePanel} className="btn  btn-danger btn-xs" name="removePanel" id={itemData.id} onClick={this.props.onRemovePanel}>Remove</button>
          </div>
          <div className="col-md-6">
            <button type="button" 
              className="btn  btn-default btn-xs pull-right" 
              data-widget="collapse" 
              onClick={(e)=>{document.getElementById("icon-"+itemData.titlePanel).className="fa fa-plus"}} >Cancel</button>
          </div>
        </div>
    </div>
  )}
    return item
  }
})


let Menu = React.createClass({
  propTypes: {
    disabled: React.PropTypes.bool,
    name: React.PropTypes.string,
    selectedMenuName:React.PropTypes.string,
    newMenuName:React.PropTypes.string,
    menuId:React.PropTypes.string,
    pageList: React.PropTypes.array,
    allPageList: React.PropTypes.array,
    allPostList: React.PropTypes.array,
    categoryList: React.PropTypes.array,
    items: React.PropTypes.array,
    menuSortableTree: React.PropTypes.array,
    treeData: React.PropTypes.array,
    itemsChecked: React.PropTypes.bool,
    type: React.PropTypes.string,
    target: React.PropTypes.string,
    tooltip: React.PropTypes.string,
    urlData: React.PropTypes.object,
    position: React.PropTypes.string,
    IdMainMenu: React.PropTypes.string,
    isProcessing: React.PropTypes.bool.isRequired,
    opacity: React.PropTypes.number.isRequired,
    errorMsg: React.PropTypes.string,
    loadingMsg: React.PropTypes.string,
    deleteMode: React.PropTypes.bool,
    menuStructure: React.PropTypes.array,
    allSelectState: React.PropTypes.object
  },
  getDefaultProps: function() {
    return {
      isProcessing: false,
      opacity: 1,
      deleteMode: false,
      disabled: true,
      name:"",
      selectedMenuName:"",
      newMenuName:"",
      menuId:"",
      errorMsg: null,
      loadingMsg: null,
      pageList: [],
      allPageList: null,
      allPostList: null,
      categoryList: null,
      items: [],
      menuSortableTree:[],
      IdMainMenu: "",
      treeData: [],
      itemsChecked: false,
      type: "",
      target: "",
      tooltip: "",
      urlData: {},
      menuStructure: [],
      allSelectState : {
        page: false,
        category: false,
        post: false
        }
      }
  },

  disabledSelectors : [
    "#menuName #submit",
    "#deleteBtn", 
    "#menu button",
    "#menu ~ .box > .box-header > .box-tools > button",
    "#selectedMenuName",
    "#mainMenuPos",
    'div > div > input[class*="Menu"]',
    "button[id*='SelectAll']",
    "button[id*='Submit']",
    "#urlSabmit #submit",
    "#urlSabmit input",
  ],

  assignValueToMenuItem(menuId, name, value){
    this.props.dispatch(assignValueToMenuItem(menuId, name, value))
  },

  notifyUnsavedData: function(state){
    let me = this;
    if (me.props.handleUnsavedData) {
      me.props.handleUnsavedData(state)
    }
  },
  disableForm: function(state){
    disableForm(state, this.notif);
    this.props.dispatch(maskArea(state));
  },
  resetFormCheckbox: function(){
    _.filter(document.getElementsByName("itemsChecked[]"), function(item){
      return item.checked = false
    });
  },
  resetFormDelete: function(){
    document.getElementById("menu").reset();
    document.getElementById("menuName").reset();
    this.props.changeFieldValue("selectedMenuName", "");
    
    this.props.dispatch(setResetDelete())
    this.handleNameChange();
    window.history.pushState("", "", '/admin/menu');
  },

  loadMenuItems: function(menuId){
    var qry = Query.getMenuQry(menuId);
    var me = this;
    me.disableForm(true)
      riques(qry, 
        function(error, response, body) {
          if (!error && !body.errors && response.statusCode === 200) {
            var items = [];
            items = body.data.getMenu.items;
            var position = body.data.getMenu.position;
            me.props.changeFieldValue("mainMenuPos", position==="Main Menu");
            if (items)
            me.props.dispatch(setTreeData(items));
          } else {
            errorCallback(error, body.errors?body.errors[0].message:null);
          }
          me.disableForm(false);
          me.props.dispatch(setDisabled(false))
          disableBySelector(true, ["#urlSabmit #submit"])
          
          if (me.props.newMenuName===""){
            // this will disable the create menu button if the newMenuName is ""
            disableBySelector(true, ["#menu button#submit.btn.btn-success", ]);
          }

        }
      );
  },

  handleMenuName: function(event){
    var menuId = event.target.value.split("-")[0];
    var selectedMenuName = event.target.value.split("-")[1];
    var me = this;
    
    if (menuId) {
      this.props.changeFieldValue("selectedMenuName", selectedMenuName);
      this.props.dispatch(setMenuId(menuId))
      this.loadMenuItems(menuId);
      this.notifyUnsavedData(true);
    } else {
      this.loadData(true)
      this.props.changeFieldValue("mainMenuPos", false)
      this.resetFormDelete();
      disableBySelector(true, me.disabledSelectors);
    }

  },

    handleUrlSubmit: function(urlData, reset){
      if(urlData.title && urlData.url) {
        var _treeData = this.props.treeData;
        var _url = [{titlePanel: urlData.title, url: urlData.url, tooltip: "", type: "url", id: uuid(), target: urlData.url}];
        var treeData = [];
        if (_treeData===null) {
          treeData = _url;
        }else if (_url.length>0) {
          treeData = _.concat(_treeData, _url);
        }
        this.props.dispatch(setTreeData(treeData))
        reset()
      } else {
        swalert('error', '', 'Please fill the blank');
      }
  },

  addToMenu: function(values, type, itemList, reset){
    let checkedItems = [];
    _.forEach(values[type], (value, index) => {
      if (value) {
        checkedItems.push(itemList[index].node)
      }
    })
    var menuValues = [];
    menuValues = _.map(checkedItems, (item) => {
      return {
        titlePanel: item.name || item.title,
        tooltip: "", 
        type: type,
        id: uuid(), 
        children:[], 
        target: item.id
      }
    });
    
    var _treeData = this.props.treeData;
    var treeData = [];
    if (_treeData===null) {
      treeData = menuValues;
    }else if (menuValues.length>0) {
      treeData = _.concat(_treeData, menuValues);
    }

    if (checkedItems.length) {
      this.props.dispatch(setTreeData(treeData))
      this.notifyUnsavedData(true)
    } else {
      swalert("error", "",  "Cannot add empty list into Menu, please select some items", () => {
      })
    }

    this.props.dispatch(toggleSelectAll(false, 'all'))
    reset();

  },

  removePanel: function(e){
    var panelRemoved = e.target.id;
    swalert("warning", "Are you sure want to delete this menu", "", () => {
      var _treeData = this.props.treeData;
      _treeData = _.filter(_treeData, data => {
        if (data.children) {
          data.children = _.filter(data.children, child => (child.id !== panelRemoved));
        }
        return data.id !== panelRemoved
      });
      this.props.dispatch(setTreeData(_treeData))
    });
  },
  handleNameChange: function(event){
    var selectedMenuName = this.props.selectedMenuName;
    this.props.dispatch(setSelectedMenuName(selectedMenuName))
    this.notifyUnsavedData(true);
  },

  componentWillReceiveProps: function(props){
    if(!props.newMenuName){
      disableBySelector(true, ["#menu button"]);
    }
  },

  handleSubmit: function(event){
    event.preventDefault();
    var me = this;
    var newMenuName = this.props.newMenuName;
    this.disableForm(true);
    var qry = Query.createMenu(newMenuName);
    var noticeTxt = "Menu Saved";
    riques(qry, 
      function(error, response, body) {
        var newMenuId = body.data.createMenu.changedMenu.id;
        me.props.dispatch(setNewMenuId(newMenuId))
        if (!error && !body.errors && response.statusCode === 200) {
          me.notif.addNotification({
                  message: noticeTxt,
                  level: 'success',
                  position: 'tr',
                  autoDismiss: 2
          });
          me.resetFormNewMenu();
          me.props.dispatch(setTreeData([]))
          document.getElementById("mainMenuPos").checked = false
        } else {
          errorCallback(error, body.errors?body.errors[0].message:null);
        }
        me.disableForm(false);
      });
  },

  loadData: function(withoutMenuItems){
    var me = this;
    this.notif = this.refs.notificationSystem;

    this.props.dispatch(setResetDelete())
    this.disableForm(true);
    var mainMenuId, mainMenuName;
    const disableIfNoIdMenu = () => {
      if (!this.props.IdMainMenu || withoutMenuItems){
        disableBySelector(true, me.disabledSelectors);
        this.props.changeFieldValue("mainMenuPos", "");
      }
    }

    riques(Query.getMainMenu, 
      function(error, response, body) {
        if (!error) {
          var mainMenu = _.forEach(body.data.viewer.allMenus.edges, function(item){ return item });
          if (mainMenu.length>=1){
            mainMenuId = _.head(mainMenu).node.id;
            mainMenuName = _.head(mainMenu).node.name;
            me.props.dispatch(setIdMainMenu(_.head(mainMenu).node.id))
          } 
        }

        riques(Query.getAllMenu, 
          function(error, response, body) {
            if (!error) {
              var pageList = [(<option key="0" value="">--select menu--</option>)];
              _.forEach(body.data.viewer.allMenus.edges, function(item){
                pageList.push((<option key={item.node.id} value={item.node.id+"-"+item.node.name}>{item.node.name}</option>));
              })
              me.props.dispatch(setPageListMenu(pageList)) 
              if (mainMenuId && mainMenuName && !withoutMenuItems) {

                  me.props.dispatch(setMenuId(mainMenuId));
                  me.loadMenuItems(mainMenuId);
                  me.props.changeFieldValue("selectedMenuName", mainMenuName);
                  me.props.changeFieldValue("menuSelect", mainMenuId+"-"+mainMenuName);
                  me.props.dispatch(loadmenuSelect(mainMenuId+"-"+mainMenuName));

              } else {
                  disableBySelector(true, me.disabledSelectors);
              }
            }
          }
        );
        riques(Query.getAllPage, 
          function(error, response, body) {
            if (!error) {
              var allPageList = [];
              _.forEach(body.data.viewer.allPosts.edges, function(item){
                allPageList.push(item);
              })
              me.props.dispatch(setAllPageList(allPageList)) 
              disableIfNoIdMenu();
            }
            
          }
        );
        riques(Query.getAllPost, 
          function(error, response, body) {
            if (!error) {
              var allPostList = [];
              _.forEach(body.data.viewer.allPosts.edges, function(item){
                allPostList.push(item);
              })
              me.props.dispatch(setAllPostList(allPostList))
              disableIfNoIdMenu();
            }
          }
        );
        riques(Query.getAllCategory, 
          function(error, response, body) {
            if (!error) {
              var categoryList = [];
              _.forEach(body.data.viewer.allCategories.edges, function(item, index){
                categoryList.push(item);
              })
              me.props.dispatch(setCategoryMenu(categoryList))
              disableIfNoIdMenu();
            }
          }
        );

        me.disableForm(false);
        disableIfNoIdMenu();
      }
    );
  },

  componentDidMount: function(){
    require ('jquery-ui/themes/base/theme.css');
    require ('../lib/jquery-sortable.js');
    require ('../../../public/css/AdminLTE.css');
    require ('../../../public/css/skins/_all-skins.css');
    require('./menucustom.css');
    //Load sidebar
    this.loadData();
    disableBySelector(true, ["#urlSabmit div button#submit"]);
  },
  onChangeMainMenu: function(event){
    const target = event.target;
    const position = target.checked === true ? target.value : "";
    this.props.dispatch(setPosition(position))
    this.notifyUnsavedData(true);
  },

  handleUpdateMenu: function(v){
    var me = this;
    var name = v.selectedMenuName;
    var positionValues = v.mainMenuPos?"Main Menu":"";
    var _IdMainMenu = this.props.IdMainMenu;
    var IdMainMenu = _IdMainMenu.toString();
    var treeData = this.props.treeData
    var menuId = this.props.menuId;
    var qry = Query.updateMenu(menuId, name, treeData, positionValues);

    if (positionValues==="Main Menu") {
      riques(Query.updateMainMenu(IdMainMenu), 
        function(error, response, body) {
        }
      );
    }
    
    this.disableForm(true);
    let noticeTxt = "Menu Successfully Updated";
    riques(qry, 
      function(error, response, body) { 
        if (!error && !body.errors && response.statusCode === 200) {
          me.notif.addNotification({
            message: noticeTxt,
            level: 'success',
            position: 'tr',
            autoDismiss: 2
          });
          me.loadMenuItems(menuId)

          // also update the dropdown menu without requesting into database
          let newMenuList = _.map(me.props.pageList, menu => {
            if(menu.key === menuId){
              return <option key={menu.key} value={menu.key+"-"+name}>{name}</option>
            }
            return <option key={menu.key} value={menu.props.value}>{menu.props.children}</option>
          })
          me.props.dispatch(setPageListMenu(newMenuList)) 
          me.props.changeFieldValue("menuSelect", menuId+"-"+name);

          me.notifyUnsavedData(false);
        } else {
          errorCallback(error, body.errors?body.errors[0].message:null);
        }
        me.disableForm(false);
    });
  },
  resetFormNewMenu: function(){
    var me = this;
      riques(Query.getAllMenu, 
        function(error, response, body) {
          if (!error) {
            var pageList = [(<option key="0" value="">--select menu--</option>)];
            _.forEach(body.data.viewer.allMenus.edges, function(item){
              pageList.push((<option key={item.node.id} value={item.node.id+"-"+item.node.name}>{item.node.name}</option>));
            })
            me.props.dispatch(setPageListMenu(pageList)) 
            _.filter(document.getElementsByName("menuSelect"), function(item){
            return item.selectedIndex = "1"
            });
          }
        }
      );
    var menuId = this.props.newMenuId;
    var newMenuName = this.props.newMenuName;
    var selectedMenuName = newMenuName;
    this.props.changeFieldValue("selectedMenuName", selectedMenuName);
    this.props.dispatch(setMenuId(menuId))
    this.props.changeFieldValue("newMenuName", "");
  },
  handleDelete: function(event){
    var me = this;
    var idList = this.props.menuId;
    swalert('warning','Sure want to delete permanently?','You might lost some data forever!',
      function () {
      me.disableForm(true);
      riques(Query.deleteMenuQry(idList), 
        function(error, response, body) {
          if (!error && !body.errors && response.statusCode === 200) {
            me.loadData()
            me.resetFormDelete();
            me.notifyUnsavedData(false)
          } else {
            errorCallback(error, body.errors?body.errors[0].message:null);
          }
          me.disableForm(false);
          disableBySelector(true, me.disabledSelectors);
        }
      );
    })
  },

  renderItem: function({item, isDragging, connectDragSource}){
    return <MenuPanel 
        itemData={item} 
        onRemovePanel={this.removePanel} 
        notifyUnsavedData={this.notifyUnsavedData}
        assignValueToMenuItem={this.assignValueToMenuItem}
        isDragging={isDragging}
        connectDragSource={connectDragSource}
      />
  },

  render: function(){
    var me = this;
    return (
      <div className="content-wrapper">
        <div className="container-fluid">
          <section className="content-header">
            <h1>
              Menu
            </h1>
              <ol className="breadcrumb">
                <li><a href="#"><i className="fa fa-dashboard"></i>Home</a></li>
                <li className="active">Menu</li>
              </ol>
              <div style={{borderBottom:"#eee" , borderBottomStyle:"groove", borderWidth:2, marginTop: 10, marginBottom: 10}}></div>
          </section>
            <Notification ref="notificationSystem" />     
            <div className="row" style={{opacity: this.props.opacity}}>
              <div className="col-md-3">
                <form onSubmit={this.handleSubmit} id="menu" method="get">
                  <div className="box box-default">
                    <div className="box-header with-border attachment-block clearfix">
                      <div className="form-group">
                        <h4>Create a new menu :</h4>
                      </div>
                      <div>
                        <Field name="newMenuName" component="input" type="text" className="form-control"/>
                      </div>
                      <div className="pull-right" style={{margin: "10px 0px"}}>
                        <button type="submit" id="submit" disabled={this.props.newMenuName===""} className="btn  btn-success">Create Menu</button>
                      </div>
                    </div>
                  </div>
                </form>

              <MenuContentForm
                type="page"
                itemList={this.props.allPageList}
                panelTitle="Pages"
                addToMenu={this.addToMenu}
                elementId="PageList"
                allSelectState={this.props.allSelectState}
              />

              <MenuContentForm
                type="post"
                itemList={this.props.allPostList}
                panelTitle='Posts'
                addToMenu={this.addToMenu}
                elementId="PostList"
                allSelectState={this.props.allSelectState}
              />

              <CustomUrlForm handleUrlSubmit={this.handleUrlSubmit} />
                
              
              <MenuContentForm 
                type="category" 
                itemList={this.props.categoryList}
                panelTitle='Categories'
                addToMenu={this.addToMenu}
                elementId="CategoryList"
                allSelectState={this.props.allSelectState}
              />

            </div>
                  <div className="col-md-9">
                    <div className="box box-default">
                      <div className="box-header with-border attachment-block clearfix">
                        <div className="container-fluid">
                          <div className="row">
                            <div className="col-xs-12">
                              <div className="row">
                              <div className="col-xs-3">
                                <h5><b>Select a menu to edit :</b></h5>
                              </div>
                              <div className="col-md-3">
                                <div className="form-group">
                                <Field id="menuSelect" name="menuSelect" component="select" className="form-control select" onChange={this.handleMenuName}>
                                 { this.props.pageList }
                                </Field>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="box box-default">
                 <form onSubmit={this.props.handleSubmit(this.handleUpdateMenu)} id="menuName" method="get">
                  <div className="box-header with-border attachment-block clearfix" style={{padding: "15px 10px"}}>
                    <div className="form-group">
                      <div className="col-md-3">
                        <h4>Menu Name :</h4>
                      </div>

                      <div className="col-md-6">
                        <Field component="input" type="text" name="selectedMenuName" id="selectedMenuName" disabled={this.selectedMenuName===""} 
                         className="form-control" required="true" onChange={this.handleNameChange}/>
                      </div>
                      
                      <div className="col-md-3">
                        <div className="box-tools pull-right">
                          <button type="submit" id="submit" name="submit" disabled={this.props.selectedMenuName===""} className="btn  btn-primary" >Update Menu</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="box-body">
                  <section className="content">
                    <h4>Menu Structure</h4>
                      <p>Drag each item into the order you prefer. Click the arrow on the right of the item to reveal additional configuration options.</p>
                        <div className="row">
                            { this.props.isProcessing &&
                              <div style={defaultHalogenStyle}><Halogen.PulseLoader color="#4DAF7C"/></div>                   
                            }
                          <div className="col-md-4 wide">
                            <Nestable
                              items={this.props.treeData||[]}
                              renderItem={this.renderItem}
                              onUpdate={(newItems) => (me.props.dispatch(setTreeData(newItems)))}
                              childrenStyle={{marginLeft: '2rem'}}
                              treeshold={40}
                              useDragHandle
                            />
                          </div>
                        </div>
                    <div style={{borderBottom:"#eee" , borderBottomStyle:"groove", borderWidth:2, marginTop: 5, marginBottom: 20}}></div>
                    <h4>Menu Settings</h4>
                    <div className="row">
                      <div className="col-md-3">
                        <h5><i>Display location</i></h5>
                      </div>
                      <div className="col-md-9">
                        <div className="checkbox">
                          <label key="Main Menu">
                            <Field component="input" type="checkbox" value="Main Menu" disabled={this.props.selectedMenuName===""} id="mainMenuPos" name="mainMenuPos" onChange={this.onChangeMainMenu}/>
                            <i>Main Menu</i>
                          </label>
                        </div>
                      </div>
                    </div>

                  </section>
                </div>
              </form> <div className="box-header with-border attachment-block clearfix">
              <div onClick={this.handleDelete}>
                <button className="btn  btn-danger pull-right" id="deleteBtn" 
                  disabled={this.props.selectedMenuName===""} 
                  style={{marginTop: 15, marginBottom: 15, marginRight: 10}}
                  data-target="menuName">Delete Menu</button>
              </div>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
});

Menu = reduxForm({
  form: 'menuForm'
})(Menu)
const selector = formValueSelector('menuForm');

const mapStateToProps = function(state){
  var customStates = {
    newMenuName: selector(state, 'newMenuName'),
    selectedMenuName: selector(state, 'selectedMenuName'),
    menuSelect: selector(state, 'menuSelect'),
    mainMenuPos: selector(state, 'mainMenuPos')?"Main Menu":null,
  }
  
  if (!_.isEmpty(state.menu)) {
    var out = _.head(state.menu);
    return {...out, ...customStates}
  } else return {};
}

const mapDispatchToProps = function(dispatch){ 
  return {
    changeFieldValue: function(field, value) {
      dispatch(change('menuForm', field, value))
    }
  }
}
Menu = connect(mapStateToProps, mapDispatchToProps)(Menu);
export default Menu;
