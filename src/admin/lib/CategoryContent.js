import React from 'react';
import Query from '../query';
import _ from 'lodash';
import Notification from 'react-notification-system';
import Halogen from 'halogen'
import {riques, hasRole, errorCallback, removeTags, swalert, disableForm, defaultHalogenStyle} from '../../utils';
import {TableTagCat, SearchBox, DeleteButtons} from '../lib/Table';
import {connect} from 'react-redux'
import {reduxForm, Field, formValueSelector} from 'redux-form';
import {setNameValue, setDescription, setModeNameIdDes, setId, initContentList, maskArea, setEditorMode, toggleSelectedItemState} from '../../actions'
import gql from 'graphql-tag';
import {graphql, withApollo} from 'react-apollo';

let CategoryContent = React.createClass({
  propTypes: {
    isProcessing: React.PropTypes.bool.isRequired,
    opacity: React.PropTypes.number.isRequired,
    errorMsg: React.PropTypes.string,
    loadingMsg: React.PropTypes.string,
    postId: React.PropTypes.string,
    mode: React.PropTypes.string,
    deleteMode: React.PropTypes.bool,
    statusList: React.PropTypes.arrayOf(React.PropTypes.string),
    dynamicStateBtnList: React.PropTypes.arrayOf(React.PropTypes.string),
    activeStatus: React.PropTypes.string,
    itemSelected: React.PropTypes.bool
  },
  getDefaultProps: function() {
    return {
      isProcessing: false,
      name:"",
      description:"",
      slug:"",
      postId:"",
      opacity: 1,
      monthList: [],
      deleteMode: false,
      mode: "create",
      statusList: ["All", "Published", "Draft", "Pending Review", "Deleted"],
      dynamicStateBtnList: ["deleteBtn", "recoverBtn", "deletePermanentBtn"],
      activeStatus: "All",
      itemSelected: false
    }
  },
  dt: null,
  handleDeleteBtn: function(event){
    var me = this;
    swalert('warning','Sure want to delete permanently?','You might lost some data forever!',
    function () {
      var checkedRow = document.querySelectorAll("input.category-"+me.props.slug+"Cb:checked");
      var idList = _.map(checkedRow, function(item){ return item.id.split("-")[1]});
      let listOfData = me.props.client.mutate({mutation: gql`${Query.deleteCategoryPermanentQry(idList).query}`})
      var he = me;
      me.disableForm(true);
      listOfData.then(function() {
        he.props.refetchAllMenuData().then(function() {
          he.props.dispatch(toggleSelectedItemState(false));
          he.disableForm(false);
        })
      })
    });
  },
  disableForm: function(state){
    disableForm(state, this.notif);
    this.props.dispatch(maskArea(state));
  },
  checkDynamicButtonState: function(){
    var checkedRow = document.querySelectorAll("input.category-"+this.props.slug+"Cb:checked");
    this.props.dispatch(toggleSelectedItemState(checkedRow.length>0));
  },
  handleViewPage: function(categoryId){
    this.props.handleNav(this.props.slug,'bycategory', categoryId);
  },
  notifyUnsavedData: function(state){
    if (this.props.handleUnsavedData){
      this.props.handleUnsavedData(state)
    }
  },
  onAfterTableLoad: function(){
    var me = this;
    var nameLink = function(event){
      event.preventDefault();
      var index = this.id.split("-")[0];
      var row = me.table.datatable.data()[index];
      var postId = this.id.split("-")[1];
      var name = removeTags(row[1]);
      var description = removeTags(row[2]);
      me.props.change('name', name);
      me.props.change('description', description);
      me.notifyUnsavedData(true);
      me.props.dispatch(setModeNameIdDes("update", name, postId, description))
    }
    var names = document.getElementsByClassName('nameText');
    _.forEach(names, function(item){
      item.addEventListener('click',nameLink);
    });

    var postLink = function(event){
      event.preventDefault();
      var categoryId = this.id.split("-")[1];
      me.handleViewPage(categoryId);
    }

    var titles = document.getElementsByClassName('categoryText');
    _.forEach(titles, function(item){
      item.addEventListener('click',postLink);
    });
  },
  componentDidMount: function(){
    require ('../pages/Posts.css');
    this.notif = this.refs.notificationSystem;
    this.table = this.refs.rendactTable;
    var datatable = this.table.datatable;
    this.refs.rendactSearchBox.bindToTable(datatable);
    this.dt = datatable;
  },
  componentWillReceiveProps(props){
    if(props._dataArr!==this.props._dataArr ){
      this.table.loadData(props._dataArr, props.bEdit);
    }
    // this.props.dispatch(initContentList(props.monthList))
  },
  handleSubmit: function(event){
    // event.preventDefault();
    var me = this;
    var name = this.props.name;
    var description = this.props.description;
    var postId = this.props.postId;
    var type = me.props.postType;
    var noticeTxt = "";
    var listOfData = "";

    if (this.props.mode==="create"){
      noticeTxt = 'Category Published!';
      listOfData = me.props.client.mutate({
        mutation: gql`${Query.createCategory(name, description, type).query}`,
        variables: Query.createCategory(name, description, type).variables
      })
    }else{
      noticeTxt = 'Category Updated!';
      listOfData = me.props.client.mutate({
        mutation: gql`${Query.updateCategory(postId, name, description, type).query}`,
        variables: Query.updateCategory(postId, name, description, type).variables
      })
    }

    this.disableForm(true);
    listOfData.then(function() {
        me.props.refetchAllMenuData().then(function() {
          me.resetForm();
          me.notif.addNotification({
              message: noticeTxt,
              level: 'success',
              position: 'tr',
              autoDismiss: 2
            });
          me.disableForm(false);
        })
    })
  },
  resetForm: function(){
    document.getElementById("pageForm").reset();
    this.props.change('name', "");
    this.props.change('description', "");
    this.props.dispatch(setEditorMode("create"))
    window.history.pushState("", "", '/admin/category');
  },

  render: function(){
    return (
      <div className="content-wrapper">
        <div className="container-fluid">
          <section className="content-header" style={{marginBottom:20}}>
            <h1>
              Categories
            </h1>
            <ol className="breadcrumb">
              <li><a href="#"><i className="fa fa-dashboard"></i> Home</a></li>
              <li className="active">Categories</li>
            </ol>
            <div style={{borderBottom:"#eee" , borderBottomStyle:"groove", borderWidth:2, marginTop: 10}}></div>
          </section>  
          <Notification ref="notificationSystem" /> 
          <section className="content">
            <div className="box box-default">
              <div className="box-body">
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-xs-4" style={{marginTop: 40}}>
                    <form onSubmit={this.props.handleSubmit(this.handleSubmit)} id="pageForm" method="get">
                      <div className="form-group">
                        <h4><b>{this.props.mode==="create"?"Add New Category":"Edit Category"}</b></h4>
                      </div>
                      <div className="form-group">
                          <label htmlFor="name" >Category name</label>
                          <div >
                            <Field component="input" type="text" name="name" id="name" className="form-control" required="true"/>
                            <p className="help-block">The name appears on your site</p>
                          </div>
                      </div>
                      <div className="form-group">
                        <label htmlFor="homeUrl" >Description</label>
                        <div >
                          <Field component="textarea" name="description" id="description" className="form-control" />
                          <p className="help-block">The description is not prominent by default; however, some themes may show it.</p>
                        </div>
                      </div>
                       <div className="form-group">
                          
                            <input type="submit" name="submit" id="submit" value={this.props.mode==="create"?"Add New Category":"Edit Category"} className="btn btn-primary btn-sm" />
                            
                      </div>
                    </form>
                    </div>
                    <div className="col-xs-8">
                      <div style={{marginTop: 10, marginBottom: 20}}>
                          <DeleteButtons 
                            deleteMode={this.props.deleteMode}
                            itemSelected={this.props.itemSelected}
                            onDelete={this.handleDeleteBtn}
                            onRecover={this.handleRecover}
                            onDeletePermanent={this.handleDeletePermanent}
                            onEmptyTrash={this.handleEmptyTrash}
                          />                  
                        <div className="box-tools pull-right">
                          <SearchBox datatable={this.table} ref="rendactSearchBox"/>
                        </div>
                      </div>    
                      { this.props.isProcessing &&
                      <div style={defaultHalogenStyle}><Halogen.PulseLoader color="#4DAF7C"/></div>                   
                      }               
                      <TableTagCat 
                          id={"category-"+this.props.slug}
                          columns={[
                            {id: 'name', label: "Name", type: "link", textAlign:"center", cssClass:"nameText"},
                            {id: 'description', label: "Description", textAlign:"center", width: 400},
                            {id: 'count', label: "Count", textAlign:"center", type: "link", target: "", cssClass:"categoryText"}
                          ]}
                          checkBoxAtFirstColumn="true"
                          ref="rendactTable"
                          onSelectAll={this.checkDynamicButtonState}
                          onCheckBoxClick={this.checkDynamicButtonState}
                          onAfterLoad={this.onAfterTableLoad}
                          style={{opacity: this.props.opacity}}
                      />
                  </div>
                </div>
              </div>
             </div>
            </div>
          </section>
        </div>
      </div>
    )},
});

const selector = formValueSelector('categoryContentForm');

const mapStateToProps = function(state){
  var customStates = {
    name: selector(state, 'name'),
    description: selector(state, 'description')
  }

  if (!_.isEmpty(state.categoryContent)) {
    var out = _.head(state.categoryContent);
    out = {...out, ...customStates}
    // return _.head(state.categoryContent)
    return out
  } else return {}
}

CategoryContent = reduxForm({
  form: 'categoryContentForm'
})(CategoryContent)

CategoryContent = connect(mapStateToProps)(CategoryContent)

let getAllCategoryQry = gql`
  query getCategories ($type: String!){
    viewer {
      allCategories (where: {type: {eq: $type}}) {
        edges {
          node {
            id,
            name,
            description,
            post {
              edges {
                node{
                  id
                }
              }
            }
          }
        }
      }
    }
  }`

CategoryContent = graphql(getAllCategoryQry,
  { 
    options: props => ({
      variables: {
        type: props.postType,
      },
    }),
    props: ({ownProps, data}) => {
    if (!data.loading) {
      let allCategories = data.viewer.allCategories.edges;
      allCategories = _.map(allCategories, item => item.node)
      var monthList = ["all"];
      var _dataArr = [];

      _.forEach(allCategories, function(item){
        _dataArr.push({
          "postId": item.id,
          "name": item.name,
          "description": item.description,
          "count": item.post.edges.length
        });
      });
      var bEdit = hasRole('modify-tag');

      return{
        isLoading: false,
        _dataArr : _dataArr,
        bEdit : bEdit,
        refetchAllMenuData : data.refetch,
        monthList: monthList,
      }
    } else { 
        return {
          isLoading: true
        }
      }
  }
})(CategoryContent)
CategoryContent = withApollo(CategoryContent);

export default CategoryContent;