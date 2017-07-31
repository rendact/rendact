import React from 'react';
import Query from '../query';
import $ from 'jquery';
import _ from 'lodash';
import uuid from 'uuid';
import Halogen from 'halogen';
import Notification from 'react-notification-system';
import {swalert, riques, errorCallback, setValue, getValue, disableForm, defaultHalogenStyle} from '../../utils';

const MenuPanel = (props) => {
  return (
    <div className="box collapsed-box">
      <div className="box-header with-border">
        <h3 className="box-title">{props.title}</h3>
        <div className="box-tools pull-right">
          <button type="button" className="btn btn-box-tool" data-widget="collapse"><i className="fa fa-plus"></i>
          </button>
        </div>
      </div>
        <div className="box-body" style={{display: "none"}}>
          <div className="form-group">
            <i htmlFor="name" >Label</i>
            <input type="text" name="name" id="name" className="form-control" required="true" value={props.title}/>
          </div>
          <div className="form-group">
            <i htmlFor="name" >Tooltip</i>
            <input type="text" name="tooltipValue" id="tooltipValue" className="form-control" onChange={props.onHandleTooltip}/>
          </div>
          { props.type==="url" &&
          <div className="form-group">
            <i htmlFor="name" >URL</i>
            <input type="text" name="name" id="name" className="form-control" value={props.type}/>
          </div>
          }
          <div className="col-md-6">
            <button value={props.title} className="btn btn-flat btn-danger btn-xs" name="removePanel" id={props.title} onClick={props.onRemovePanel}>Remove</button>
          </div>
          <div className="col-md-6">
            <button className="btn btn-flat btn-default btn-xs pull-right" id="" data-target="">Cancel</button>
          </div>
        </div>
    </div>
  )
}

var Menu = React.createClass({
  getInitialState: function(){
      require ('../pages/Posts.css');
      return {
        name:"",
        selectedMenuName:"",
        newMenuName:"",
        urlMenu: "",
        menuId:"",
        tagId:"",
        dt: null,
        errorMsg: null,
        loadingMsg: null,
        deleteMode: false,activeStatus: "All",
        pageList: null,
        allPageList: null,
        allPostList: null,
        categoryList: null,
        coba: null,
        items: [],
        menuSortableTree:[],
        isProcessing: false,
        opacity: 1,
        treeData: [],
        itemsChecked: false,
        type: "",
        tooltip: "",
        position: false
      }
  },
  maskArea: function(state){
    this.setState({isProcessing: state, opacity: state?0.1:1});
  },
  disableForm: function(state){
    disableForm(state, this.notif);
    this.maskArea(state);
  },
  resetFormCheckbox: function(){
    _.filter(document.getElementsByName("itemsChecked[]"), function(item){
      return item.checked = false
    });
  },
  resetFormUrl: function (){
    document.getElementById("urlSabmit").reset();
  },
  resetFormDelete: function(){
    document.getElementById("menu").reset();
    document.getElementById("menuName").reset();
    this.setState({newMenuName:"", selectedMenuName:"", treeData:[]});
    this.handleNameChange();
    this.handleNewMenuChange();
    window.history.pushState("", "", '/admin/menu');
  },
  handleMenuName: function(event){
    this.setState({menu: document.querySelector('#menuSelect').value});
    var menuId = event.target.value.split("-")[0];
  	var selectedMenuName = event.target.value.split("-")[1];
  	setValue("selectedMenuName", selectedMenuName);
  	this.setState({menuId:menuId});
  	var me = this;
    var qry = Query.getMenuQry(menuId);
    me.disableForm(true);
	  riques(qry, 
      function(error, response, body) {
        if (!error && !body.errors && response.statusCode === 200) {
        	var items = [];
          items = body.data.getMenu.items;
          if (items)
		      me.setState({treeData: items});
          var position = body.data.getMenu.position;
          me.setState({position: position});
          debugger;
          me.disableForm(false);
        } else {
          errorCallback(error, body.errors?body.errors[0].message:null);
        }
        me.disableForm(false);
      }
    );

  },
  handleUrl: function(event){
    var urlMenu = getValue("urlMenu");
    this.setState({urlMenu: urlMenu})
  },
  handleUrlSubmit: function(event){
    event.preventDefault();
    var _treeData = this.state.treeData;
    var url = getValue("urlMenu");
    var _url = [{title: url, tooltip: "", type: "url", id: uuid()}];
    var treeData = [];
    if (_treeData===null) {
      treeData = _url;
    }else if (_url.length>0) {
      treeData = _.concat(_treeData, _url);
    }
    this.setState ({treeData: treeData});
    var me = this;
    me.resetFormUrl();
  },
  addToMenu: function(event){
    var _treeData = this.state.treeData;
    var menuFiltered = _.filter(document.getElementsByName("itemsChecked[]"), function(item){
    	return item.checked
    });
	  var menuValues = [];
	  menuValues = _.map(menuFiltered, function(item){return {title: item.value.split("-")[0], tooltip: "", type: item.value.split("-")[1], id: uuid()}});
    var treeData = [];
    if (_treeData===null) {
      treeData = menuValues;
    }else if (menuValues.length>0) {
      treeData = _.concat(_treeData, menuValues);
    }
    this.setState ({treeData: treeData});

    this.resetFormCheckbox();
  },
  removePanel: function(e){
    var _tree_Data = this.state.treeData;
    var panelRemoved = e.target.id;
    this.setState({treeData: _.dropWhile(this.state.treeData, {title: panelRemoved})});
  },
  handleNewMenuChange: function(event){
    var newMenuName = getValue("newMenuName");
    this.setState({newMenuName: newMenuName})
  },
  handleNameChange: function(event){
    var selectedMenuName = getValue("selectedMenuName");
    this.setState({selectedMenuName: selectedMenuName})
  },
  handleSubmit: function(event){
    event.preventDefault();
    var me = this;
    var newMenuName = getValue("newMenuName");
    this.disableForm(true);
    var qry = Query.createMenu(newMenuName);
    var noticeTxt = "Menu Saved";
    riques(qry, 
      function(error, response, body) {
        var newMenuId = body.data.createMenu.changedMenu.id;
        me.setState({newMenuId: newMenuId}); 
        if (!error && !body.errors && response.statusCode === 200) {
          me.notif.addNotification({
                  message: noticeTxt,
                  level: 'success',
                  position: 'tr',
                  autoDismiss: 2
          });
          me.resetFormNewMenu();
          var here = me;
          var cb = function(){here.disableForm(false)}
          me.componentWillMount("All", cb);
        } else {
          errorCallback(error, body.errors?body.errors[0].message:null);
        }
        me.disableForm(false);
      });
  },
  componentDidMount: function(){
    require ('jquery-ui/themes/base/theme.css');
    require ('../lib/jquery-sortable.js');
    require ('../../../public/css/AdminLTE.css');
    require ('../../../public/css/skins/_all-skins.css');

    this.notif = this.refs.notificationSystem;
    
    var panelList = $('#draggablePanelList');
    panelList.sortable({
        group: 'nested',
        handle: '.box-header',
        onDragStart: function ($item, container, _super) {
          // Duplicate items of the no drop area
          if(!container.options.drop)
            $item.clone().insertAfter($item);
          _super($item, container);
        }
    });
  },
  onChangeMainMenu: function(event){
    const target = event.target;
    const position = target.checked === true ? target.value : "";
    debugger;
    this.setState({position: position});
  },
  handleUpdateMenu: function(event){
    event.preventDefault();
      debugger
    var me = this;
    var name = getValue("selectedMenuName");
    var _tree_Data = this.state.treeData;
      let new_tree_data = document.getElementById("draggablePanelList").querySelectorAll("li")
      new_tree_data = _.map(new_tree_data, td => {
          let id = td.id;
          let type = td.type;
          let tooltip = td.querySelector("#tooltipValue").value;
          let title = td.querySelector("#name").value;

          return {
              id: id,
              type: type,
              tooltip: tooltip,
              title: title
          }
      });
      console.log(new_tree_data);

    var tooltip = getValue("tooltipValue");
    this.setState({tooltip: tooltip})

    var c = _.filter(document.getElementsByName("panel"), function(item){return item });
    var b = _.map(c, function(item){return {title: item.title, tooltip: getValue("tooltipValue"), type: item.type, id: item.id}});
    var menuSortableTree = b;
    var positionValues = this.state.position;
    var menuId = this.state.menuId;
    this.disableForm(true);
    var qry = Query.updateMenu(menuId, name, menuSortableTree, positionValues);
    var noticeTxt = "Menu Updated";
    riques(qry, 
      function(error, response, body) { 
        if (!error && !body.errors && response.statusCode === 200) {
          me.notif.addNotification({
                  message: noticeTxt,
                  level: 'success',
                  position: 'tr',
                  autoDismiss: 2
          });
          var here = me;
          var cb = function(){here.disableForm(false)}
          me.componentWillMount("All", cb);
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
            me.setState({pageList: pageList});
            _.filter(document.getElementsByName("menuSelect"), function(item){
            return item.selectedIndex = "1"
            });
          }
        }
      );
    var menuId = this.state.newMenuId;
    var newMenuName = getValue("newMenuName");
    var selectedMenuName = newMenuName;
    setValue("selectedMenuName", selectedMenuName); 
    this.setState({menuId:menuId});
    var qry = Query.getMenuQry(menuId);
        me.disableForm(true);
    riques(qry, 
      function(error, response, body) {
        if (!error && !body.errors && response.statusCode === 200) {
          var items = [];
          items = body.data.getMenu.items;
          me.setState({treeData: items});
          me.disableForm(false);
        } else {
          errorCallback(error, body.errors?body.errors[0].message:null);
        }
        me.disableForm(false);
      }
    );
    document.getElementById("menu").reset();
  },
  componentWillMount: function(){
    var me = this;
      riques(Query.getAllMenu, 
        function(error, response, body) {
          if (!error) {
            var pageList = [(<option key="0" value="">--select menu--</option>)];
            _.forEach(body.data.viewer.allMenus.edges, function(item){
              pageList.push((<option key={item.node.id} value={item.node.id+"-"+item.node.name}>{item.node.name}</option>));
            })
            me.setState({pageList: pageList});
          }
        }
      );
      riques(Query.getAllPage, 
        function(error, response, body) {
          if (!error) {
            var allPageList = [];
            _.forEach(body.data.viewer.allPosts.edges, function(item){
              allPageList.push((<div key={item.node.id}><input className="pageMenu" id={item.node.id}
              name="itemsChecked[]" type="checkbox" value={item.node.title+"-Page"} /> {item.node.title}</div>));
            })
            me.setState({allPageList: allPageList});
          }
        }
      );
      riques(Query.getAllPost, 
        function(error, response, body) {
          if (!error) {
            var allPostList = [];
            _.forEach(body.data.viewer.allPosts.edges, function(item){
              allPostList.push((<div key={item.node.id}><input id={item.node.id}
              name="itemsChecked[]" type="checkbox" value={item.node.title+"-Post"} /> {item.node.title}</div>));
            })
            me.setState({allPostList: allPostList});
          }
        }
      );
      riques(Query.getAllCategory, 
        function(error, response, body) {
          if (!error) {
            var categoryList = [];
            _.forEach(body.data.viewer.allCategories.edges, function(item){
              categoryList.push((<div key={item.node.id}><input id={item.node.id}
              name="itemsChecked[]" type="checkbox" value={item.node.name+"-Category"} /> {item.node.name}</div>));
            })
            me.setState({categoryList: categoryList});
          }
        }
      );
    },
  handleDelete: function(event){
    var me = this;
    var idList = this.state.menuId;
    swalert('warning','Sure want to delete permanently?','You might lost some data forever!',
      function () {
      me.disableForm(true);
      riques(Query.deleteMenuQry(idList), 
        function(error, response, body) {
          if (!error && !body.errors && response.statusCode === 200) {
            me.resetFormDelete();
            var here = me;
            var cb = function(){here.disableForm(false)}
            me.componentWillMount("All", cb);
          } else {
            errorCallback(error, body.errors?body.errors[0].message:null);
          }
          me.disableForm(false);
        }
      );
    })
  },
 
	render: function(){
    var me = this;
		return (
			<div className="content-wrapper">
        <div className="container-fluid">
				  <section className="content-header">
			      <h1>
            	Menus
          	</h1>
          		<ol className="breadcrumb">
            		<li><a href="#"><i className="fa fa-dashboard"></i>Home</a></li>
            		<li className="active">Menus</li>
          		</ol>
          		<div style={{borderBottom:"#eee" , borderBottomStyle:"groove", borderWidth:2, marginTop: 10, marginBottom: 10}}></div>
			    </section>
		        <Notification ref="notificationSystem" />     
			    	<div className="row">
              <div className="col-md-3">
                <form onSubmit={this.handleSubmit} id="menu" method="get">
    					    <div className="box box-default">
    								<div className="box-header with-border attachment-block clearfix">
    									<div className="form-group">
    										<h4>Create A New Menu :</h4>
    									</div>
    									<div>
    										<input type="text" name="newMenuName" id="newMenuName" className="form-control" onChange={this.handleNewMenuChange}/>
    									</div>
    									<div className="pull-right" style={{marginTop: 10}}>
    										<button type="submit" id="submit" disabled={this.state.newMenuName===""} className="btn btn-flat btn-success">Create Menu</button>
    									</div>
    								</div>
    							</div>
                </form>
							<div className="box box-default collapsed-box box-solid">
								<div className="box-header with-border">
									<h3 className="box-title">Pages</h3>
									<div className="box-tools pull-right">
									    <button type="button" className="btn btn-box-tool" data-widget="collapse"><i className="fa fa-plus"></i>
									    </button>
									</div>
								</div>
								<div className="box-body pad">
									<div id="IDpageList">
								  		{this.state.allPageList}
								  	</div>
								  	<div style={{borderBottom:"#eee" , borderBottomStyle:"groove", borderWidth:2, marginTop: 10, marginBottom: 10}}></div>
								  	<div className="box-tools pull-right">
								  		<button className="btn btn-flat btn-default" type="button" onClick={this.addToMenu} 
                              			style={{marginRight: 10}} data-target="#IDpageList">Add to Menu</button>
								  	</div>
								</div>
							</div>
							<div className="box box-default collapsed-box box-solid">
								<div className="box-header with-border">
									<h3 className="box-title">Posts</h3>
									<div className="box-tools pull-right">
									    <button type="button" className="btn btn-box-tool" data-widget="collapse"><i className="fa fa-plus"></i>
									    </button>
									</div>
								</div>
								<div className="box-body pad">
									<div id="IDpostList">
								  		{this.state.allPostList}
								  </div>
								  <div style={{borderBottom:"#eee" , borderBottomStyle:"groove", borderWidth:2, marginTop: 10, marginBottom: 10}}></div>
								  	<div className="box-tools pull-right">
								  		<button className="btn btn-flat btn-default" type="button" onClick={this.addToMenu} 
                              			style={{marginRight: 10}} data-target="#IDpostList">Add to Menu</button>
								  	</div>
								</div>
							</div>
							<div className="box box-default collapsed-box box-solid">
								<div className="box-header with-border">
									<h3 className="box-title">Custom Links</h3>
									<div className="box-tools pull-right">
									    <button type="button" className="btn btn-box-tool" data-widget="collapse"><i className="fa fa-plus"></i>
									    </button>
									</div>
								</div>
								<div className="box-body pad">
                  <form onSubmit={this.handleUrlSubmit} id="urlSabmit" method="get">
  									<div className="row">
                      <div className="col-md-3">
                        <h5>URL</h5>
                      </div>
                      <div className="col-md-9">
                        <input type="text" name="urlMenu" id="urlMenu" className="form-control" onChange={this.handleUrl}/>
                      </div>
                    </div>
                    <div style={{borderBottom:"#eee" , borderBottomStyle:"groove", borderWidth:2, marginTop: 10, marginBottom: 10}}></div>
                    <div className="box-tools pull-right">
                      <button type="submit" id="submit" disabled={this.state.urlMenu===""} className="btn btn-flat btn-default">Add to Menu</button>
                    </div>
                  </form>
							  </div>
              </div>  
							<div className="box box-default collapsed-box box-solid">
								<div className="box-header with-border">
									<h3 className="box-title">Categories</h3>
									<div className="box-tools pull-right">
									    <button type="button" className="btn btn-box-tool" data-widget="collapse"><i className="fa fa-plus"></i>
									    </button>
									</div>
								</div>
								<div className="box-body pad">
									<div id="IDcategorytList">
								  		{this.state.categoryList}
								  	</div>
								  	<div style={{borderBottom:"#eee" , borderBottomStyle:"groove", borderWidth:2, marginTop: 10, marginBottom: 10}}></div>
								  	<div className="box-tools pull-right">
								  		<button className="btn btn-flat btn-default" type="button" onClick={this.addToMenu} 
                      style={{marginRight: 10}} data-target="#IDcategorytList">Add to Menu</button>
								  	</div>
								</div>
							</div>
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
				                    	<div className="col-md-7">
      										      <div className="form-group">
      										      <select id="menuSelect" onChange={this.handleMenuName} name="menuSelect" className="form-control select" >
      											     {this.state.pageList}
      											    </select>
      										    </div>
      										  </div>
				                  </div>
				                </div>
				              </div>
					    		  </div>
					    	  </div>
					      </div>
					      
					      <div className="box box-default">
                 <form onSubmit={this.handleUpdateMenu} id="menuName" method="get">
  								<div className="box-header with-border attachment-block clearfix">
  								  <div className="form-group">
  								  	<div className="col-md-3">
  								  	  <h4>Menu Name :</h4>
  								  	</div>
  									  <div className="col-md-6">
  									    <input type="text" name="selectedMenuName" id="selectedMenuName" className="form-control" required="true" onChange={this.handleNameChange}/>
  								  	</div>
                      <div className="col-md-3">
                        <div className="box-tools pull-right">
                          <button type="submit" id="submit" name="submit" className="btn btn-flat btn-primary" >Update Menu</button>
                        </div>
                      </div>
  								  </div>
  								</div>
								  <div className="box-body">
								  <section className="content">
										<h4>Menu Structure</h4>
										  <p>Drag each item into the order you prefer. Click the arrow on the right of the item to reveal additional configuration options.</p>
									      <div className="row">
                            { this.state.isProcessing &&
                              <div style={defaultHalogenStyle}><Halogen.PulseLoader color="#4DAF7C"/></div>                   
                            }
                          <div className="col-md-4">
                            <ul id="draggablePanelList" className="list-unstyled" name="draggablePanelList">
                            { 
                              this.state.treeData.map(function(item, index){
                                var tooltip = me.state.tooltip;
                                if(item.type==="url"){
                                return (
                                  <li key={item.id} id={item.id} title={item.title} type={item.type} tooltip={tooltip} name="panel">
                                    <MenuPanel type={item.type} id={item.id} title={item.title} tooltip={item.tooltip} type={item.type} onHandleTooltip={me.handleTooltip} onRemovePanel={me.removePanel} />
                                    <ul style={{marginLeft: 20}} className="list-unstyled">
                                      {item.children && item.children.map(function(child){
                                      return (
                                        <li key={child.id} className="box collapsed-box">
                                          <MenuPanel type={item.type} id={child.id} title={child.title} tooltip={child.tooltip} type={child.type} onHandleTooltip={me.handleTooltip} onRemovePanel={me.removePanel} />
                                        </li>
                                      )
                                    })}
                                    </ul>
                                  </li>
                                )}
                                if(item.type!=="url"){
                                return (
                                  <li key={item.id} id={item.id} title={item.title} type={item.type} tooltip={item.tooltip} name="panel">
                                    <MenuPanel type={item.type} id={item.id} title={item.title} tooltip={item.tooltip} type={item.type} onHandleTooltip={me.handleTooltip} onRemovePanel={me.removePanel} />
                                    <ul style={{marginLeft: 20}} className="list-unstyled">
                                      {item.children && item.children.map(function(child){
                                      return (
                                        <li key={child.id} className="box collapsed-box">
                                          <MenuPanel type={item.type} title={child.title} tooltip={child.tooltip} type={child.type} onHandleTooltip={me.handleTooltip} onRemovePanel={me.removePanel} />
                                        </li>
                                      )
                                    })}
                                    </ul>
                                  </li>
                                )}

                                  else {
                                      return false;
                                  }
                              })
                            }
                          </ul>
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
								            <input type="checkbox" id="Main Menu" value="Main Menu" name="position" checked={this.state.position==="Main Menu"} onChange={this.onChangeMainMenu}/>
								            <i>Main Menu</i>
								          </label>
								        </div>
											</div>
										</div>

									</section>
								</div>
              </form>
              <div className="box-header with-border attachment-block clearfix">
                <button className="btn btn-flat btn-danger pull-right" id="deleteBtn" data-target="menuName" onClick={this.handleDelete}>Delete Menu</button>
              </div>
						  </div>
		        </div>
		      </div>
        </div>
		  </div>
		)
	}
});

export default Menu;
