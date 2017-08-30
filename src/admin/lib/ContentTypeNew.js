import React from 'react';
import _ from 'lodash';
import $ from 'jquery';
import Query from '../query';
import {riques, disableForm, errorCallback, 
        getConfig, defaultHalogenStyle, getFormData} from '../../utils';
import {getTemplates} from '../../includes/theme';
import DatePicker from 'react-bootstrap-date-picker';
import Notification from 'react-notification-system';
import Halogen from 'halogen';
import { default as swal } from 'sweetalert2';
import ReactSelect from 'react-select';
import 'react-select/dist/react-select.css';
import {connect} from 'react-redux';
import {maskArea, setSlug, togglePermalinkProcessState, setPostStatus, resetPostEditor,
        setCategoryList, setTagList, setImageGalleryList, setConnectionValue, 
        toggleSaveImmediatelyMode, togglePermalinkEditingState,
        setPostContent, updateTitleTagLeftCharacter,
        updateMetaDescriptionLeftCharacter, setPostPublishDate, setFeaturedImage,
        setEditorMode, toggleImageGalleyBinded, setPageList, setAllCategoryList, setPostId,
        setOptions, setTagMap, loadFormData} from '../../actions'
import {reduxForm, Field, formValueSelector} from 'redux-form';


const PermalinkEditor = (props) => {
  return (
    <div className="form-inline">
      { !props.permalinkEditing ? 
        ( <p>Permalink: &nbsp;
          {props.mode==="update"?(
            <a id="permalink" href={props.rootUrl+'/'+props.permalink}>{props.rootUrl}/{props.permalink}</a>
            ) : (
            <a id="permalink" href="#">{props.rootUrl}/{props.permalink}</a>
            )
          }
          <button type="button" onClick={() => {props.dispatch(togglePermalinkEditingState(true))}} id="editBtn" className="btn btn-default" style={{height:25, marginLeft: 5, padding: "2px 5px"}}>
            <span style={{fontSize: 12}}>Edit</span>
          </button> 
          { props.permalinkInProcess && <i style={{marginLeft:5}} className="fa fa-spin fa-refresh"></i>}
          </p>
        ) : (
          <p>Permalink: 
          <div className="form-group" id="permalinkcontent">
            <a id="permalink" href="#">{props.rootUrl}/</a>
            <input id="slugcontent" defaultValue={props.permalink} type="text" className="form-control" />
            <button type="button" className="btn btn-default" onClick={()=>{props.onCheckSlug(props.permalink)}}>OK</button>
          </div>
          { props.permalinkInProcess && <i style={{marginLeft:5}} className="fa fa-spin fa-refresh"></i>}
          </p>
        )
      }
    </div>
  )
}

let NewContentType = React.createClass({
  propTypes: {
    isProcessing: React.PropTypes.bool.isRequired,
    opacity: React.PropTypes.number.isRequired,
    errorMsg: React.PropTypes.string,
    loadingMsg: React.PropTypes.string,
    title: React.PropTypes.string,
    permalink: React.PropTypes.string,
    content: React.PropTypes.string,
    category: React.PropTypes.string,
    summary: React.PropTypes.string,
    status: React.PropTypes.string,
    immediately: React.PropTypes.string,
    immediatelyStatus: React.PropTypes.bool,
    visibilityTxt: React.PropTypes.string,
    permalinkEditing: React.PropTypes.bool,
    mode: React.PropTypes.string,
    pageList: React.PropTypes.array,
    allCategoryList: React.PropTypes.array,
    postCategoryList: React.PropTypes.array,
    postTagListInit: React.PropTypes.array,
    postTagList: React.PropTypes.array,
    titleTagLeftCharacter: React.PropTypes.number,
    metaDescriptionLeftCharacter: React.PropTypes.number,
    publishDate: React.PropTypes.instanceOf(Date),
    publishDateReset: React.PropTypes.instanceOf(Date),
    titleTag: React.PropTypes.string,
    metaKeyword: React.PropTypes.string,
    metaDescription: React.PropTypes.string,
    permalinkInProcess: React.PropTypes.bool,
    featuredImage: React.PropTypes.string,
    imageGallery: React.PropTypes.array,
    tagMap: React.PropTypes.object,
    connectionValue: React.PropTypes.object,
    data: React.PropTypes.object,
    parent: React.PropTypes.string,
  },
  getDefaultProps: function() {
    return {
      isProcessing: false,
      opacity: 1,
      title: "",
      content: "",
      featuredImage: "",
      status:"Published",
      immediatelyStatus:true,
      visibilityTxt:"Public",
      permalinkEditing: false,
      mode: "create",
      postCategoryList: [],
      postTagListInit: [],
      postTagList: [],
      titleTagLeftCharacter: 65,
      metaDescriptionLeftCharacter: 160,
      publishDate: new Date(),
      publishDateReset: new Date(),
      permalinkInProcess: false,
      imageGallery: [],
      tagMap: {},
      connectionValue: {},
      data: {},
      parent: "",
      permalink: ""
    }
  },
  isWidgetActive: function(name){
    return _.indexOf(this.props.widgets, name) > -1;
  },
  checkSlug: function(permalink){
    var me = this;
    if (permalink===this.props.permalink) return;
    this.props.dispatch(togglePermalinkProcessState(true));
    riques( Query.checkSlugQry(permalink),
      function(error, response, body) {
        me.props.dispatch(togglePermalinkProcessState(false));
        if (!error && !body.errors && response.statusCode === 200) {
          var slugCount = body.data.viewer.allPosts.edges.length;
          if (slugCount > 0) me.props.dispatch(setSlug(permalink+"-"+slugCount, false));
          else me.props.dispatch(setSlug(permalink, false));
        } else {
          errorCallback(error, body.errors?body.errors[0].message:null, "Check Slug");
        }
      }
    );
  },
  saveImmediately: function(event){
    var hours = this.props.hours;
    var minute = this.props.minutes;
    var time = this.props.publishDate + hours + minute;
    this.props.dispatch(toggleSaveImmediatelyMode(false, time));
  },
  disableForm: function(isFormDisabled){
    disableForm(isFormDisabled, this.notification);
    this.props.dispatch(maskArea(isFormDisabled));
  },
  componentWillReceiveProps: function(props){
    //
    console.log(props.urlParams)
    if (props.urlParams.postId !== this.props.postId){
      props.dispatch(setPostId(props.urlParams.postId))
      props.destroy()
      console.log("hello")
    }
    if(!props.postId && this.props.postId){
      window.CKEDITOR.instances['content'].setData("");
      props.dispatch(resetPostEditor());
      props.destroy()
    }
  },
  resetForm: function(){
    this.props.handleNav(this.props.slug, "new")
    this.props.dispatch(setPostId(""))
    $(".menu-item").removeClass("active");
    $("#menu-posts-new").addClass("active");
  },
  getMetaFormValues: function(v){
    var out = getFormData("metaField");

    _.forEach(this.props.connectionValue, function(item, key){
      out.push({
        item: "conn~"+key,
        value: item.value
      });
    });

    return out;
  },
  setFormValues: function(v){
    var meta = [];
    var metaValues = {}
    this.props.destroy()

    // prepare post meta values
    if (v.meta.edges.length>0) {
      _.forEach(v.meta.edges, function(i){ meta.push(i.node) });
    }
    
    // prepare main post values
    var pubDate = v.publishDate? new Date(v.publishDate) : new Date();
    window.CKEDITOR.instances['content'].setData(v.content);
    v["hours"] = pubDate.getHours();
    v["minutes"] = pubDate.getMinutes();
    v["publishDate"] = pubDate;
    v["publishDateReset"] = pubDate;
    v["visibilityRadio"] = v.visibility;

    this.props.dispatch(loadFormData(_.merge(v, metaValues)));
    //this.props.dispatch(setContentFormValues(v));

    // set categories value to state
    let me = this
    var _postCategoryList = [];
    if (v.category.edges.length>0) {
      _.forEach(v.category.edges, function(i){
        if (i.node.category){ 
          // index 0 is category id
          // index 1 is categoryOfPost id
          _postCategoryList.push([i.node.category.id, i.node.id]) 
          me.props.change("categories."+i.node.category.id, true)
        }
      });
      this.props.dispatch(setCategoryList(_postCategoryList));
    }
    // set tags value to state
    var _postTagList = [];
    if (v.tag && v.tag.edges.length>0) {
      _.forEach(v.tag.edges, function(i){
        if (i.node.tag){
          _postTagList.push({id: i.node.tag.id, value: i.node.tag.name, name: i.node.tag.name, label: i.node.tag.name, connectionId: i.node.id});
        }
      });
      this.props.dispatch(setTagList(_postTagList, _postTagList));
    }

    // set gallery values to state
    var _imageGalleryList = [];    
    if (v.tag && v.file.edges.length>0) {
      _.forEach(v.file.edges, function(i){
        if (i.node.value){
          _imageGalleryList.push({id: i.node.id, value: i.node.value});
        }
      });
      this.props.dispatch(setImageGalleryList(_imageGalleryList));
    }

    // set additional field values to state
    var _connectionValue = this.props.connectionValue;
    _.forEach(meta, function(item){
      metaValues[item.item] = item.value;
      var el = document.getElementsByName(item.item);
      if (el && el.length>0) {
        el[0].id = item.id
      }
      var isConnItem = item.item.split("~");
      if (isConnItem.length > 1) {
        _connectionValue[isConnItem[1]] = item.value; 
      }
    });
    // manual change because with initialValues values in the
    // these fields not displayed
    this.props.dispatch(setConnectionValue(_connectionValue));
    this.props.change("title", this.props.data.title)
    this.props.change("visibilityRadio", this.props.data.visibility)
    _.forEach(this.props.data.meta.edges, meta => {
      this.props.change(meta.node.item, meta.node.value)
    })
  },
  formatDate: function(date){
    var min = date.getMinutes();
    if (min.length<2) min = "0"+min;
    return date.getDate()+"/"+(1+date.getMonth())+"/"+date.getFullYear()+" "+date.getHours()+":"+min;
  },
  notifyUnsavedData: function(state){
    if (this.props.handleUnsavedData){
      this.props.handleUnsavedData(state)
    }
  },
  handleTitleChange: function(event){
    this.notifyUnsavedData(true);
  },
  handleContentChange: function(event){
    var content = window.CKEDITOR.instances['content'].getData();
    this.props.dispatch(setPostContent(content));
    this.props.change('content', content)
    this.notifyUnsavedData(true);
  },
  handleTitleTagChange: function(event){
    var titleTag = this.props.titleTag;
    this.props.dispatch(updateTitleTagLeftCharacter(65-(titleTag.length)));
    this.notifyUnsavedData(true);
  },
  handleMetaDescriptionChange: function(event){
    var metaDescription = this.props.metaDescription;
    this.props.dispatch(updateMetaDescriptionLeftCharacter(160-(metaDescription.length)));
    this.notifyUnsavedData(true);
  },
  handleDateChange: function(date){
    this.props.dispatch(setPostPublishDate(new Date(date), false));
    this.notifyUnsavedData(true);
  },
  handleTimeChange: function(event){
    var hours = this.props.hours;
    var minutes = this.props.minutes;
    var d = this.props.publishDate;
    d.setHours(parseInt(hours, 10));
    d.setMinutes(parseInt(minutes, 10));
    this.props.dispatch(setPostPublishDate(d, false));
    this.notifyUnsavedData(true);
  },
  handlePublishDateCancel: function(event){
    var resetDate = this.props.publishDateReset;
    this.props.dispatch(setPostPublishDate(resetDate, false));
  },
  featuredImageChange: function(e){
    var me = this;
    var reader = new FileReader();
    reader.onload = function(){
      me.props.dispatch(setFeaturedImage(reader.result));
    };
    reader.readAsDataURL(e.target.files[0]);
  },
  _emulateDataForSaving: function(v){
    var output = {};
    var fields = ["id","title","type","content","order","deleteData",
    "featuredImage","slug","status","publishDate","passwordPage","parent","summary","visibility","authorId"];
    _.forEach(fields, function(item){
      if (v[item]) output[item] = v[item];
    });
    
    v["content"] = this.props.content;
    v["visibility"] = this.props.visibilityTxt;
    v["type"] = this.props.postType;
    v["authorId"] = localStorage.getItem('userId');
    v["slug"] = this.props.permalink;
    v["featuredImage"] = this.props.featuredImage;
    return v
  },
  onSubmit: function(v, status) {
    if (status) {
      this.props.dispatch(setPostStatus(status))
      v.status = status
    }
    var me = this;
    if (v.status === "Published" || v.status === "Draft" || v.status === "Reviewing") {
      if (v.title === null || v.title.length<=3) {
        this._errorNotif('Title is too short');
        return;
      }
    }
    var _objData = this._emulateDataForSaving(v);
    var qry = "", noticeTxt = "";
    if (this.props.mode==="create"){
      qry = this.props.createQuery(_objData);
      noticeTxt = this.props.name+' Published!';
    }else{
      _objData["id"] = this.props.postId;
      qry = this.props.updateQuery(_objData);
      noticeTxt = this.props.name+' Updated!';
    }
    this.disableForm(true);
    var metaDataList = me.getMetaFormValues();

    riques(qry, 
      function(error, response, body) {
        if (!error && !body.errors && response.statusCode === 200) {
          var here = me, postId = "", pmQry = "";
          
 
          if (me.props.mode==="create"){
            postId = body.data.createPost.changedPost.id;
          } else {
            postId = body.data.updatePost.changedPost.id;
          }
          
          if (metaDataList.length>0) {
            pmQry = Query.createUpdatePostMetaMtn(postId, metaDataList);
            riques(pmQry, 
              function(error, response, body) {
                if (!error && !body.errors && response.statusCode === 200) {
                  
                } else {
                  errorCallback(error, body.errors?body.errors[0].message:null, "Save Post Meta");
                }
                here.disableForm(false);
                here.notifyUnsavedData(false);
              }
            );
          }
          
          if (me.isWidgetActive("category")) {
            // process categories
            let categToSave = _.keys(v.categories) 
            here.disableForm(true);
            var catQry = Query.createUpdateCategoryOfPostMtn(postId, me.props.postCategoryList, categToSave);
            if (catQry)
              riques(catQry,
                function(error, response, body) {
                  here.disableForm(false);
                  here.notifyUnsavedData(false);
                  here.bindPostToImageGallery(postId);
                  if (!error && !body.errors && response.statusCode === 200) {
                    
                  } else {
                    errorCallback(error, body.errors?body.errors[0].message:null, "Save Category");
                  }
                }
              );
          }

          if (me.isWidgetActive("tag")) {
            here.disableForm(true);
            var tagQry = Query.createUpdateTagOfPostMtn(postId, me.props.postTagListInit, me.props.postTagList, me.props.tagMap);
            if (tagQry)
              riques(tagQry,
                function(error, response, body) {
                  here.disableForm(false);
                  here.notifyUnsavedData(false);
                  here.bindPostToImageGallery(postId);
                  if (!error && !body.errors && response.statusCode === 200) {
                    
                  } else {
                    errorCallback(error, body.errors?body.errors[0].message:null, "Save Tag");
                  }
                }
              );
          } 

          // do these when post data succesfully saved
          here._successNotif(noticeTxt);
          here.props.dispatch(setEditorMode("update"));
          here.props.dispatch(setPostId(postId));
          here.notifyUnsavedData(false);
          here.bindPostToImageGallery(postId);
          here.props.handleNav(me.props.slug,"edit",postId);
        } else {
          errorCallback(error, body.errors?body.errors[0].message:null, "Save Post");
          here.disableForm(false);
        }
      }
    );  
  },
  _errorNotif: function(msg){
    this.refs.notificationSystem.addNotification({
      title: 'Error',
      message: msg,
      level: 'error',
      position: 'tr'
    });
  },
  _successNotif: function(msg){
    this.refs.notificationSystem.addNotification({
      message: msg,
      level: 'success',
      position: 'tr',
      autoDismiss: 2
    });
  },
  imageGalleryChange: function(e){
    var me = this;
    this.disableForm(true);
    var reader = new FileReader();
    reader.onload = function(){
      if (!me.props.postId) me.props.dispatch(toggleImageGalleyBinded(true));
      riques(Query.addImageGallery(reader.result, me.props.postId), 
        function(error, response, body){
          if (!error && !body.errors && response.statusCode === 200) {
            var data = body.data.createFile.changedFile;
            var imageGallery = me.props.imageGallery;
            imageGallery.push({id: data.id, value:data.value});
            me.props.dispatch(setImageGalleryList(imageGallery));
          } else {
            errorCallback(error, body.errors?body.errors[0].message:null, "Image Gallery");
          }
          me.disableForm(false);
          document.getElementById("imageGallery").value=null;
        }
      );
      
    }
    reader.readAsDataURL(e.target.files[0]);
  },
  handleImageClick: function(e){
    e.preventDefault();
    
    swal({
      imageUrl: e.target.src,
      imageWidth: "100%",
      animation: true,
      customClass: 'imageSwal',
      confirmButtonText: 'Close'
    })
  },
  bindPostToImageGallery: function(postId){
    var me = this;
    if (this.props.imageGallery.length>0 && this.props.imageGalleryUnbinded) {
      var qry = Query.bindImageGallery(this.props.imageGallery, postId);
      
      riques(qry, 
        function(error, response, body){
          if (!error && !body.errors && response.statusCode === 200) {
            me.props.dispatch(toggleImageGalleyBinded(false));
          } else {
            errorCallback(error, body.errors?body.errors[0].message:null, "Bind To Image Galley");
          }
        }
      );
    }
  },
  handleImageRemove: function(e){
    var me = this;
    var id = e.target.id;
    var index = id.split("-")[1];
    var imageId = id.split("-")[0];
    this.disableForm(true);

    var qry = Query.removeImageGallery(imageId);
    riques(qry, 
      function(error, response, body){
        if (!error && !body.errors && response.statusCode === 200) {
          var imageGallery = me.props.imageGallery;
          _.pull(imageGallery, _.nth(imageGallery, index));
          me.props.dispatch(setImageGalleryList(imageGallery));
        } else {
          errorCallback(error, body.errors?body.errors[0].message:null);
        }
        me.disableForm(false);
        document.getElementById("imageGallery").value=null;
      }
    );
  },
  _genReactSelect: function(contentId){
    var me = this;
    var getConnectionOptions = function(input, callback) {
      var qry = Query.getContentPostListQry("All", contentId);
      
      riques(qry, 
        function(error, response, body) {
          var options = [];
          _.forEach(body.data.viewer.allPosts.edges, function(item){
            options.push({value: item.node.slug, label: item.node.title});
          });
          callback(error, {
            options: options,
            complete: true
          });
        }
      );
    }

    var handleSelectConnectionChange = function(newValue) {
      var _connectionValue = me.props.connectionValue;
      _connectionValue[contentId] = newValue
      me.props.dispatch(setConnectionValue(_connectionValue));
    }

    return (
      <ReactSelect.Async
        name={contentId}
        value={this.props.connectionValue[contentId]}
        loadOptions={getConnectionOptions}
        onChange={handleSelectConnectionChange}
        connectedContent={contentId}
      />
    )
  },
 
  componentDidMount: function(){
    var me = this;

    if (this.isWidgetActive("pageHierarchy")) {
      me.disableForm(true);
      riques(Query.getPageListQry("All"),
        function(error, response, body) {
          if (!error && !body.errors && response.statusCode === 200) {
            var pageList = [(<option key="0" value="">(no parent)</option>)];
            _.forEach(body.data.viewer.allPosts.edges, function(item){
              pageList.push((<option key={item.node.id} value={item.node.id} checked={me.props.parent===item.node.id}>
                {item.node.title}</option>));
            });
            me.props.dispatch(setPageList(pageList));
            me.disableForm(false);
          } else {
            errorCallback(error, body.errors?body.errors[0].message:null);
          }
      });
    }

    if (this.isWidgetActive("category")) {
      me.disableForm(true);
      var postType = this.props.postType;
      riques(Query.getAllCategoryQry(postType), 
        function(error, response, body) {
          if (!error && !body.errors && response.statusCode === 200) {
            /*
            var categoryList = [];
            _.forEach(body.data.viewer.allCategories.edges, function(item){
              categoryList.push((<div key={item.node.id}><input id={item.node.id}
              name="categoryCheckbox[]" type="checkbox" value={item.node.id} /> {item.node.name}</div>));
            })
            */
            let categoryList = body.data.viewer.allCategories.edges.map(item => item.node)
            me.props.dispatch(setAllCategoryList(categoryList));
            me.disableForm(false);
          } else {
            errorCallback(error, body.errors?body.errors[0].message:null);
          }
        }
      );
    }
    
    if (this.isWidgetActive("tag")) {
      me.disableForm(true);
      riques(Query.getAllTagQry(this.props.postType), 
        function(error, response, body) {
          if (!error && !body.errors && response.statusCode === 200) {
            var _tagMap = {};
            var options = [];
                
            _.forEach(body.data.viewer.allTags.edges, function(item){
                _tagMap[item.node.name] = {id: item.node.id, name: item.node.name}
                options.push({id: item.node.id, value: item.node.name, label: item.node.name});
            })
            me.props.dispatch(setOptions(options));
            me.props.dispatch(setTagMap(_tagMap));
            me.disableForm(false);
          } else {
            errorCallback(error, body.errors?body.errors[0].message:null);
          }
        }
      );
    };
        
    $.getScript("https://cdn.ckeditor.com/4.6.2/standard/ckeditor.js", function(data, status, xhr){
      window.CKEDITOR.replace('content', {
        height: 400,
        title: false
      });
      for (var i in window.CKEDITOR.instances) {
        if (window.CKEDITOR.instances.hasOwnProperty(i))
          window.CKEDITOR.instances[i].on('change', me.handleContentChange);
      }

      if (me.props.postId) {
        me.props.dispatch(setEditorMode("update"));
        riques(me.props.loadQuery(me.props.postId), 
          function(error, response, body) {
            if (!error ) {
              var values = body.data.getPost;
              me.setFormValues(values);
            }
          }
        );
      }
    });

    if (this.props.visibilityTxt==="Public") 
      document.getElementById("public").setAttribute('checked', true);
    else
      document.getElementById("private").setAttribute('checked', true);

            me.disableForm(false);
    this.notification = this.refs.notificationSystem;
  },
  render: function(){
    var rootUrl = getConfig('rootUrl');
    var templates = getTemplates();
    
    const newPost=(
      <div className="content-wrapper">
        <div className="container-fluid">
          <section className="content-header"  style={{marginBottom:20}}>
              <h1>{this.props.mode==="update"?"Edit Current "+this.props.name:"Add New "+this.props.name}
                { this.props.mode==="update" &&
                <small style={{marginLeft: 5}}>
                  <button className="btn btn-default btn-primary add-new-post-btn" onClick={()=>{this.resetForm()}}>Add new</button>
                </small>
              }
              </h1>
                <ol className="breadcrumb">
                  <li><a href="#"><i className="fa fa-dashboard"></i> Home</a></li>
                  <li><a href="#" onClick={function(){this.props.handleNav(this.props.slug)}.bind(this)}>
                    {this.props.name}</a></li>
                  <li className="active">{this.props.mode==="update"?"Edit "+this.props.name:"Add New"}</li>
                </ol>
               <div style={{borderBottom:"#eee" , borderBottomStyle:"groove", borderWidth:2, marginTop: 10}}></div>
          </section>
          <Notification ref="notificationSystem" />

          <form  id="postForm" method="get" style={{opacity: this.props.opacity}}>
          { this.props.isProcessing &&
          <div style={defaultHalogenStyle}><Halogen.PulseLoader color="#4DAF7C"/></div>                   
          }
          <div className="col-md-8">
            <div className="form-group"  style={{marginBottom:30}}>
              <div>
                <Field name="title" component="input" type="text" className="form-control"
                  placeholder="Input Title Here" onChange={this.handleTitleChange} onBlur={() => {this.checkSlug(this.props.title.split(" ").join("-").toLowerCase())}} style={{marginBottom: 20}}/>
                <PermalinkEditor rootUrl={rootUrl} onCheckSlug={this.checkSlug} {...this.props} />
                <Field id="content" name="content" rows="25" component="textarea" wrap="hard" type="textarea" className="form-control" />
                <div id="trackingDiv"></div>
              </div>
            </div>
            
            <div className="box box-info" style={{marginTop:20}}>
              <div className="box-header with-border">
                <h3 className="box-title">Summary</h3>         
                <div className="pull-right box-tools">
                  <button type="button" className="btn btn-box-tool" data-widget="collapse" data-toggle="tooltip" title="Collapse">
                  <i className="fa fa-minus"></i></button>
                </div>
              </div>
              <div className="box-body pad">
              <Field id="summary" name="summary" rows="5" component="textarea" wrap="hard" style={{width: '100%'}} onChange={()=>{this.notifyUnsavedData(true)}} />
              </div>
            </div>

            <div className="box box-info" style={{marginTop:20}}>
              <div className="box-header with-border">
                <h3 className="box-title">SEO</h3>         
                <div className="pull-right box-tools">
                  <button type="button" className="btn btn-box-tool" data-widget="collapse" data-toggle="tooltip" title="Collapse">
                    <i className="fa fa-minus"></i></button>
                </div>
              </div>
              <div className="box-body pad">
                <div className="form-horizonral">
                  <div className="form-group">
                    <div className="col-md-4">Preview</div>
                    <div className="col-md-8">
                      <p><a href="#">{this.props.title===""?"No Title":this.props.title.substring(0,71)}</a></p>
                      <p>{this.props.content===""?"":this.props.content.substring(0,100).replace(/(<([^>]+)>)/ig,"")}</p>
                      <p><span className="help-block"><a style={{color: 'green'}}>{rootUrl}/{this.props.permalink}</a> - <a>Cache</a> - <a>Similar</a></span></p>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="col-md-4"><p>Title Tag</p></div>
                    <div className="col-md-8">
                      <Field name="titleTag" component="input" type="text" className="form-control metaField" 
                        style={{width: '100%'}} placeholder={this.props.title} onChange={this.handleTitleTagChange} />
                        <span className="help-block">Up to 65 characters recommended<br/>
                        {this.props.titleTagLeftCharacter} characters left</span>                     
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="col-md-4"><p>Meta Description</p></div>
                    <div className="col-md-8">
                      <Field name="metaDescription" component="input" type="textarea" className="form-control metaField" 
                        rows='2' style={{width:'100%'}} placeholder={this.props.summary} onChange={this.handleMetaDescriptionChange} />
                      <span className="help-block">160 characters maximum<br/>
                      {this.props.metaDescriptionLeftCharacter} characters left</span>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="col-md-4"><p>Meta Keywords</p></div>
                    <div className="col-md-8">
                      <div className="form-group">
                        <Field name="metaKeyword" component="input" type="text" className="form-control metaField" style={{width: '100%'}} />
                        <span className="help-block"><b>News keywords </b><a>(?)</a></span>
                      </div>
                    </div>
                  </div>
                </div> 
                </div>
              </div> 
                                
            </div>

            <div className="col-md-4 col-sm-6 col-xs-12">
              <div className="row">
                <div className="col-md-12">  
                  <div className="box box-info">
                    <div className="box-header with-border">
                      <h3 className="box-title">Publish</h3>
                      <div className="pull-right box-tools">
                            <button type="button" data-widget="collapse" data-toggle="tooltip" title="Collapse" className="btn btn-box-tool ">
                              <i className="fa fa-minus"></i></button>
                          </div>         
                    </div>
                    <div className="box-body pad">
                      
                       <div className="form-group">
                          <p style={{fontSize: 14}}><span className="glyphicon glyphicon-pushpin" style={{marginRight:10}}></span>
                          Status: <b>{this.props.status} </b>
                          <button type="button" className="btn btn-flat btn-xs btn-default" data-toggle="collapse" data-target="#statusOption"> Edit </button></p>
                          <div id="statusOption" className="collapse">
                            <div className="form-group">
                                <Field id="statusSelect" name="statusSelect" component="select" style={{marginRight: 10, height: 30}}>
                                  <option value="Published">Published</option>
                                  <option value="Reviewing">Reviewing</option>
                                </Field>
                                <button type="button" onClick={ ()=> this.props.dispatch(setPostStatus(this.props.statusSelect))} className="btn btn-flat btn-xs btn-primary" 
                                style={{marginRight: 10}} data-toggle="collapse" data-target="#statusOption">OK</button>
                                <button type="button" className="btn btn-flat btn-xs btn-default" data-toggle="collapse" data-target="#statusOption">Cancel</button>
                            </div>
                          </div>
                        </div>

                        <div className="form-group">
                          <p style={{fontSize: 14}}><span className="glyphicon glyphicon-sunglasses" style={{marginRight:10}}></span>Visibility: <b>{this.props.visibilityTxt} </b>
                          <button type="button" className="btn btn-flat btn-xs btn-default" data-toggle="collapse" data-target="#visibilityOption"> Edit </button></p>
                          <div id="visibilityOption" className="collapse">
                            <div className="radio">
                              <label>
                                <Field id="public" name="visibilityRadio" component="input" type="radio" value="Public" />
                                Public
                              </label>
                            </div>
                            <div className="radio">
                              <label>
                                <Field id="private" name="visibilityRadio" component="input" type="radio" value="Private" />
                                Private
                              </label>
                            </div>
                            <div className="form-inline" style={{marginTop: 10}}>
                              <button type="button" onClick={this.saveVisibility} className="btn btn-flat btn-xs btn-primary" 
                              style={{marginRight: 10}} data-toggle="collapse" data-target="#visibilityOption">OK</button>
                              <button type="button" className="btn btn-flat btn-xs btn-default" data-toggle="collapse" data-target="#visibilityOption">Cancel</button>
                            </div>
                          </div>
                        </div>

                        <div className="form-group">
                          <p><span className="glyphicon glyphicon-calendar" style={{marginRight: 10}}></span>{this.props.immediatelyStatus===true?
                            (<span>Publish <b>Immediately </b></span>):<span>Published at <b>{this.formatDate(this.props.publishDate)}</b> </span>} 
                          <button type="button" className="btn btn-flat btn-xs btn-default" data-toggle="collapse" data-target="#scheduleOption"> Edit </button></p>

                          <div id="scheduleOption" className="collapse">
                            <div className="form-group">
                              <div className="row">
                                <div className="col-md-6">
                                  <DatePicker id="datepicker" style={{width: "100%", padddingRight: 0, textAlign: "center"}} value={this.props.publishDate.toISOString()} onChange={this.handleDateChange}/>
                                </div>
                                <div className="col-md-6">
                                  <Field name="hours" component="input" type="text" className="form-control" style={{width: 30, height: 34, textAlign: "center"}} defaultValue={new Date().getHours()} onChange={this.handleTimeChange} />
                                  <Field name="minutes" component="input" type="text" className="form-control" style={{width: 30, height: 34, textAlign: "center"}} defaultValue={new Date().getMinutes()} onChange={this.handleTimeChange} />
                                </div>
                              </div>
                              <div className="form-inline" style={{marginTop: 10}}>
                                <button type="button" id="immediatelyOkBtn" onClick={this.saveImmediately} className="btn btn-flat btn-xs btn-primary" 
                                style={{marginRight: 10}} data-toggle="collapse" data-target="#scheduleOption"> OK </button>
                                <button type="button" className="btn btn-flat btn-xs btn-default" data-toggle="collapse" data-target="#scheduleOption" onClick={this.handlePublishDateCancel}>Cancel</button>
                              </div>
                            </div>
                          </div>
                      </div> 
                    </div>
                    <div className="box-footer">
                      <div className="form-group pull-right">
                        <button type="button" className="btn btn-default btn-flat disabled" style={{marginRight: 5}}>Preview</button> 
                          <div className="btn-group">
                            <button type="submit" onClick={this.props.handleSubmit(v => this.onSubmit(v, this.props.status))} id="publishBtn" className="btn btn-primary btn-flat">{this.props.mode==="update"?"Save":"Publish"}</button>
                            <button type="button" className="btn btn-primary btn-flat dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                              <span className="caret"></span>
                              <span className="sr-only">Toggle Dropdown</span>
                            </button>
                            <ul className="dropdown-menu" role="menu">
                              <li><button onClick={this.props.handleSubmit(v => this.onSubmit(v, 'Draft'))} className="btn btn-default btn-flat">{this.props.status!=="Draft"?"Save As Draft":""}</button></li>
                            </ul>
                          </div>
                      </div>        
                    </div>
                  </div>

                  { this.isWidgetActive("pageHierarchy") &&
                  <div className="box box-info" style={{marginTop:20}}>
                    <div className="box-header with-border">
                      <h3 className="box-title">Page Attributes</h3>         
                      <div className="pull-right box-tools">
                        <button type="button" className="btn btn-box-tool" data-widget="collapse" title="Collapse">
                        <i className="fa fa-minus"></i></button>
                      </div>
                    </div>
                    <div className="box-body pad">
                      <div>
                      <div className="form-group">
                        <p><b>Parent</b></p>
                        <Field id="parent" name="parent" component="select" style={{widht: 250}}>
                          {this.props.pageList}
                        </Field>
                      </div>
                      <div className="form-group">
                        <p><b>Page  Template</b></p>
                        <Field name="pageTemplate" component="select" className="metaField" style={{width: 250}} defaultValue={templates?templates[0].item:null}>
                        { templates ?
                          templates.map(function(item, index){
                            return (<option key={item.id}>{item.name}</option>)
                          }) : ""
                        }
                        </Field>
                      </div>
                      <div className="form-group">
                        <p><b>Order</b></p>
                        <input type="text" id="pageOrder" placeholder="0" style={{width:50}} min="0" step="1" data-bind="value:pageOrder"/>
                      </div>
                      </div>                  
                    </div>
                  </div>
                  }

                  { this.isWidgetActive("category") &&
                  <div className="box box-info" style={{marginTop:20}}>
                    <div className="box-header with-border">
                      <h3 className="box-title">Category</h3>         
                      <div className="pull-right box-tools">
                        <button type="button" className="btn btn-box-tool" data-widget="collapse" title="Collapse">
                        <i className="fa fa-minus"></i></button>
                      </div>
                    </div>
                    <div className="box-body pad">
                      <div>
                      <div className="form-group">
                        {
                          _.map(this.props.allCategoryList, (cat, index) => {
                            return <div key={index}> 
                              <Field name={"categories." + cat.id} component="input" type="checkbox"/>
                              {cat.name}
                            </div>
                          })
                        }
                      </div>
                      </div>                  
                    </div>
                  </div>
                  }

                  { this.isWidgetActive("tag") &&
                  <div className="box box-info" style={{marginTop:20}}>
                    <div className="box-header with-border">
                      <h3 className="box-title">Tags</h3>         
                      <div className="pull-right box-tools">
                        <button type="button" className="btn btn-box-tool" data-widget="collapse" title="Collapse">
                        <i className="fa fa-minus"></i></button>
                      </div>
                    </div>
                    <div className="box-body pad">
                      <div className="form-group" style={{width: '100%'}}>
                          <ReactSelect.Creatable
                            id="tag"
                            name="form-field-name"
                            value={this.props.postTagList}
                            options={this.props.options}
                            onChange={(value)=>{this.props.dispatch(setTagList(this.props.postTagListInit, value))}}
                            multi={true}
                          />
                          <p><span className="help-block">Press enter after inputting tag</span></p>
                      </div>
                    </div>
                  </div>
                  }

                  { this.isWidgetActive("featuredImage") &&
                  <div className="box box-info" style={{marginTop:20}}>
                    <div className="box-header with-border">
                      <h3 className="box-title">Featured Image</h3>         
                      <div className="pull-right box-tools">
                        <button type="button" className="btn btn-box-tool" data-widget="collapse" title="Collapse">
                        <i className="fa fa-minus"></i></button>
                      </div>
                    </div>
                    <div className="box-body pad">
                      <div>
                        { this.props.featuredImage &&
                          <div style={{position: "relative"}}>
                            <Field id="featuredImage" name="featuredImage" component="img" src={this.props.featuredImage} style={{width: "100%"}} alt={this.props.title} />
                            { /* <img src={this.props.featuredImage} style={{width: "100%"}} alt={this.props.title}/> */ }
                            <button onClick={()=>{this.props.dispatch(setFeaturedImage(null))}} type="button" className="btn btn-info btn-sm" style={{top: 15, right: 5, position: "absolute"}}><i className="fa fa-times"></i></button>
                          </div>
                        }
                        { !this.props.featuredImage &&
                          <input type="file" name="featuredImage" onChange={this.featuredImageChange}/>
                        }
                      </div>                  
                    </div>
                  </div>
                  }

                  { this.isWidgetActive("imageGallery") &&
                  <div className="box box-info" style={{marginTop:20}}>
                    <div className="box-header with-border">
                      <h3 className="box-title">Image Gallery</h3>         
                      <div className="pull-right box-tools">
                        <button type="button" className="btn btn-box-tool" data-widget="collapse" title="Collapse">
                        <i className="fa fa-minus"></i></button>
                      </div>
                    </div>
                    <div className="box-body pad">
                      <div>
                        <input type="file" id="imageGallery" name="imageGallery" onChange={this.imageGalleryChange}/>
                        {
                          _.map(this.props.imageGallery, function(item, index){
                            return <div key={index} className="margin" style={{width: 150, float: "left", position: "relative"}}>
                            <a href="" onClick={this.handleImageClick}><img src={item.value} className="margin" style={{width: 150, height: 150, borderWidth: "medium", borderStyle: "solid", borderColor: "cadetblue"}} alt={"gallery"+index}/></a>
                            <button id={item.id+"-"+index} onClick={this.handleImageRemove} type="button" className="btn btn-info btn-sm" style={{top: 15, right: 5, position: "absolute"}}><i className="fa fa-times"></i></button>
                            </div>
                          }.bind(this))
                        }
                      </div>                  
                    </div>
                  </div>
                  }

                  {
                    this.props.customFields && this.props.customFields.map(function(item){
                      var form;
                      if (item.type === "text" || item.type === "number")
                        form = (<input id={item.id} name={item.id} className="metaField" type="text" style={{width: '100%'}}/>)
                      if (item.type === "date")
                        form = (<DatePicker id={item.id} name={item.id} style={{width: "100%", padddingRight: 0, textAlign: "center"}} value={this.props.publishDate.toISOString()} onChange={this.handleDateChange}/>)
                      if (item.type === "connection") {
                        form = this._genReactSelect(item.connection)
                      }
                      return <div key={item.id} className="box box-info" style={{marginTop:20}}>
                        <div className="box-header with-border">
                          <h3 className="box-title">{item.label}</h3>         
                          <div className="pull-right box-tools">
                            <button type="button" className="btn btn-box-tool" data-widget="collapse" data-toggle="tooltip" title="Collapse">
                            <i className="fa fa-minus"></i></button>
                          </div>
                        </div>
                        <div className="box-body pad">
                          {form}
                        </div>
                      </div>
                    }.bind(this))
                  }

              </div>
            </div>
          </div>
          </form>
        
        </div>
      </div>
      )
  return newPost;

}
});

const selector = formValueSelector('newContentForm');

const mapStateToProps = function(state){
  var customStates = {
    title: selector(state, 'title'),
    content: selector(state, 'content'),
    hours: selector(state, 'hours'),
    minutes: selector(state, 'minutes'),
    summary: selector(state, 'summary'),
    featuredImage: selector(state, 'featuredImage'),
    titleTag: selector(state, 'titleTag'),
    metaKeyword: selector(state, 'metaKeyword'),
    metaDescription: selector(state, 'metaDescription'),
    statusSelect: selector(state, 'statusSelect'),
    visibilityTxt: selector(state, 'visibilityRadio')
  }

  if (!_.isEmpty(state.contentTypeNew)) {
    var out = _.head(state.contentTypeNew);
    out["initialValues"] = out.data;
    //return _.merge(out, customStates);
    return {...out, ...customStates}
  } else return customStates;
}

NewContentType = reduxForm({
  form: 'newContentForm'
})(NewContentType)
NewContentType = connect(mapStateToProps)(NewContentType);
export default NewContentType;
