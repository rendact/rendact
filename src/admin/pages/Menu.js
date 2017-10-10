import React from 'react';
import {Link} from 'react-router';
import Query from '../query';
import _ from 'lodash';
import uuid from 'uuid';
import Halogen from 'halogen';
import Notification from 'react-notification-system';
import {connect} from 'react-redux'
import {toggleSelectAll, maskArea, setPosition, setResetDelete, setTreeData, setSelectedMenuName, setDisabled, setNewMenuId,
  setIdMainMenu, setPageListMenu, setMenuId, assignValueToMenuItem} from '../../actions'
import {validateUrl, swalert, disableForm, defaultHalogenStyle, disableBySelector} from '../../utils';
import {Nestable} from '../lib/react-dnd-nestable/react-dnd-nestable';
import {reduxForm, Field, formValueSelector, change} from 'redux-form';
import {withApollo, graphql} from 'react-apollo';


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
          <button id={props.type+"Submit"} className="btn  btn-default" type="submit" style={{marginRight: 10}}>Add to Menu</button>
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
    "div > div > input[class*='Menu']",
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

  loadMenuItems: function(menuId){
    this.disableForm(true)
    var allMenuData = this.props.client.readQuery({query: Query.loadAllMenuData});
    var menuFound = _.find(allMenuData.viewer.allMenu.edges, {node: {id: menuId}});
    if (menuFound) {
      this.props.changeFieldValue("mainMenuPos", menuFound.node.position==="Main Menu");
      this.props.dispatch(setTreeData(menuFound.node.items));
    }
    this.disableForm(false);
    this.props.dispatch(setDisabled(false))
    disableBySelector(true, ["#urlSabmit #submit"])
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
    const filterTree = (dataTree, toRemoveId) => {
      let result = _.filter(dataTree, data => {
        if (data.children) data.children = filterTree(data.children, toRemoveId);
        return data.id !== toRemoveId
      });
      return result;
    }

    swalert("warning", "Are you sure want to delete this menu", "", () => {
      var _treeData = _.cloneDeep(this.props.treeData);
      let newData = filterTree(_treeData, panelRemoved)
      this.props.dispatch(setTreeData(newData))
    });
  },

  refreshMenuList: function(menuList){
    var pageList = [(<option key="0" value="">--select menu--</option>)];
    _.forEach(menuList, function(item){
      pageList.push((<option key={item.node.id} value={item.node.id+"-"+item.node.name}>{item.node.name}</option>));
    })
    this.props.dispatch(setPageListMenu(pageList)) 
  },

  handleNameChange: function(event){
    var selectedMenuName = this.props.selectedMenuName;
    this.props.dispatch(setSelectedMenuName(selectedMenuName))
    this.notifyUnsavedData(true);
  },

  handleSubmit: function(event){
    event.preventDefault();
    var me = this;
    var newMenuName = this.props.newMenuName;
    this.disableForm(true);
    var noticeTxt = "Menu Saved";
    this.props.createMenu({variables: {
      input: {
        name: newMenuName
      }
    }}).then(({data}) => {
      me.props.refetchAllMenuData().then(({data}) => {
        me.refreshMenuList(data.viewer.allMenu.edges);
      });
      var newMenuId = data.createMenu.changedMenu.id;
      me.props.dispatch(setNewMenuId(newMenuId))
      me.props.dispatch(setMenuId(newMenuId))
      me.props.dispatch(setTreeData([]))
      
      me.props.changeFieldValue("selectedMenuName", newMenuName);
      me.props.changeFieldValue("newMenuName", "");
      me.props.changeFieldValue("menuSelect",newMenuId+"-"+newMenuName);
      me.props.changeFieldValue("mainMenuPos",false);

      me.refs.notificationSystem.addNotification({
        message: noticeTxt,
        level: 'success',
        position: 'tr',
        autoDismiss: 2
      });
      me.disableForm(false);
    });
  },

  handleChangeMainMenu: function(event){
    const target = event.target;
    const position = target.checked === true ? target.value : "";
    !this.props.IdMainMenu && position && this.props.dispatch(setIdMainMenu(this.props.menuId))
    this.props.dispatch(setPosition(position))
    this.notifyUnsavedData(true);
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
      this.props.changeFieldValue("mainMenuPos", false)
      this.props.changeFieldValue("selectedMenuName", "");
      this.props.dispatch(setResetDelete());
      disableBySelector(true, me.disabledSelectors);
    }
  },

  handleUrlSubmit: function(urlData, reset){
    if(urlData.title && urlData.url) {
      urlData.url = validateUrl(urlData.url)
      var _treeData = this.props.treeData;
      var _url = [{titlePanel: urlData.title, url: urlData.url, tooltip: "", type: "url", id: uuid(), target: urlData.url, children: []}];
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

  handleUpdateMenu: function(v){
    var me = this;
    var name = v.selectedMenuName;
    var positionValues = v.mainMenuPos?"Main Menu":"";
    var _IdMainMenu = this.props.IdMainMenu;
    var IdMainMenu = _IdMainMenu.toString();
    var treeData = this.props.treeData
    var menuId = this.props.menuId;
    let noticeTxt = "Menu Successfully Updated";

    const callback = (me, data) => {
      if (data) {
        me.refs.notificationSystem.addNotification({
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
      } 
      me.disableForm(false);
    }

    // starting mutation
    this.disableForm(true)
    if (positionValues==="Main Menu") {
      me.props.dispatch(setIdMainMenu(menuId))
      this.props.updateMenuWithPos({variables: {
        positionInput: {
          id: IdMainMenu,
          position: ''
        },
        updateMenuInput: {
          id: menuId,
          name: name,
          items: treeData,
          position: positionValues
        }
      }}).then(({data}) => {
        callback(me, data)
      });
    } else {
      this.props.updateMenu({variables: {
        input: {
          id: menuId,
          name: name,
          items: treeData,
          position: positionValues
        }
      }}).then(({data}) => {
        callback(me, data)
      });
    }
  },

  handleDelete: function(event){
    var me = this;
    var idList = this.props.menuId;
    swalert('warning','Sure want to delete permanently?','You might lost some data forever!',
      function () {
      me.disableForm(true);
      me.props.deleteMenu({
        variables: {
          user: {
          id: idList
        }
      }}).then(({data, test}) => {
        me.props.refetchAllMenuData().then(({data}) => {
          me.refreshMenuList(data.viewer.allMenu.edges);
        });
        
        me.props.dispatch(setResetDelete())
        me.props.dispatch(setTreeData([]))
        
        me.props.changeFieldValue("selectedMenuName", "");
        me.props.changeFieldValue("newMenuName", "");
        me.props.changeFieldValue("menuSelect","");
        me.props.changeFieldValue("mainMenuPos",false);

        me.notifyUnsavedData(false);
        me.disableForm(false);
        disableBySelector(true, me.disabledSelectors);
      });
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

  componentDidMount: function(){
    require ('jquery-ui/themes/base/theme.css');
    require ('../../css/AdminLTE.css');
    require ('../../css/skins/_all-skins.css');
    require('./menucustom.css');
    disableBySelector(true, ["#urlSabmit div button#submit"]);
  },
  componentWillMount(){
    if(this.props.isLoading){
      this.props.dispatch(maskArea(true))
    }
    this.props.dispatch(setResetDelete())
  },
  componentWillReceiveProps(props){
    if(!props.isLoading && this.props.isLoading){
      props.dispatch(setResetDelete())
      props.dispatch(maskArea(false))
    }
    if(!props.newMenuName){
      disableBySelector(true, ["#menu button"]);
    }
    if(!props.menuId){
      disableBySelector(true, this.disabledSelectors);
    }
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
                              childrenClassName='childrenClassName'
                              treeshold={40}
                              useDragHandle
                              maxDepth={3}
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
                            <Field component="input" type="checkbox" value="Main Menu" disabled={this.props.selectedMenuName===""} id="mainMenuPos" name="mainMenuPos" onChange={this.handleChangeMainMenu}/>
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
    out = {...out, ...customStates}
    return out
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

Menu = graphql(Query.loadAllMenuData, {
  props: ({ownProps, data}) => {
    var mainMenuId, mainMenuName;
    const processItems = (items) => (items.edges.map(item => item));
    
    if (!data.loading) {
      let { mainMenu, allMenu, allPage, allPost, allCategory } = data.viewer;
      let selectedMenuName, menuSelect = null;
      var menuPos = false;
      var treeData = [];

        // processing main menu
        if (mainMenu.edges.length>=1){
          var mainMenuData = _.head(mainMenu.edges).node;
          mainMenuId = mainMenuData.id;
          mainMenuName = mainMenuData.name;
          treeData = mainMenuData.items;
          selectedMenuName = mainMenuData.name;
          menuSelect = mainMenuData.id+"-"+mainMenuData.name;
          menuPos = (mainMenuData.position === "Main Menu")
        } 
        // processing all Menu
        var pageList = [(<option key="0" value="">--select menu--</option>)];
        _.forEach(allMenu.edges, function(item){
          pageList.push((<option key={item.node.id} value={item.node.id+"-"+item.node.name}>{item.node.name}</option>));
        })
        // processing all page
        let allPageList = processItems(allPage)
        // processing all posts
        let allPostList = processItems(allPost)
        // processing all categories
        let categoryList = processItems(allCategory)
        
        return {
          menuId: mainMenuId,
          pageList: pageList,
          IdMainMenu: mainMenuId,
          mainMenuName: mainMenuName,
          menuSelect: mainMenuId+"-"+mainMenuName,
          allPageList: allPageList,
          allPostList: allPostList,
          categoryList: categoryList,
          isLoading: false,
          treeData: treeData,
          initialValues: {
            selectedMenuName: selectedMenuName,
            menuSelect: menuSelect,
            mainMenuPos: menuPos
          },
          refetchAllMenuData: data.refetch
        }
    } else {
      return {
        isLoading: true
      }
    }
  }
})(Menu);

Menu = graphql(Query.createMenu, {name: 'createMenu'})(Menu);
Menu = graphql(Query.updateMenu, {name: 'updateMenu'})(Menu);
Menu = graphql(Query.updateMenuWithPos, {name: 'updateMenuWithPos'})(Menu);
Menu = graphql(Query.deleteMenu, {name: 'deleteMenu'})(Menu);
Menu = withApollo(Menu);

export default Menu;
