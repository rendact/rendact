import React from 'react';
import _ from 'lodash';
import $ from 'jquery';
import Query from '../query';
import {riques, setValue, getValue, disableForm, errorCallback, getConfig, defaultHalogenStyle} from '../../utils';
import {getTemplates} from '../theme';
import DatePicker from 'react-bootstrap-date-picker';
import Notification from 'react-notification-system';
import Halogen from 'halogen';
import { default as swal } from 'sweetalert2';

const NewContentType = React.createClass({
  getInitialState: function(){
    
    return {
      title:"",
      slug:"",
      content:"",
      category: "",
      summary:"",
      status:"Draft",
      immediately:"",
      immediatelyStatus:this.props.postId?false:true,
      visibilityTxt:"Public",
      permalinkEditing: false,
      mode: this.props.postId?"update":"create",
      pageList: null,
      categoryList: null,
      postCategoryList: [],
      postTagList: [],
      titleTagLeftCharacter: 65,
      metaDescriptionLeftCharacter: 160,
      publishDate: new Date(),
      publishDateReset: new Date(),
      titleTag: "",
      metaKeyword: "",
      metaDescription: "",
      permalinkInProcess: false,
      isProcessing: false,
      opacity: 1,
      featuredImage: null,
      imageGallery: [],
      tagMap: {}
    }
  },
  isWidgetActive: function(name){
    return _.indexOf(this.props.widgets, name) > -1;
  },
  checkSlug: function(slug){
    var me = this;
    this.setState({permalinkInProcess: true});
    riques( Query.checkSlugQry(slug),
      function(error, response, body) {
        if (!error && !body.errors && response.statusCode === 200) {
          var slugCount = body.data.viewer.allPosts.edges.length;
          if (me.state.mode==="create") {
            if (slugCount > 0) me.setState({permalinkEditing: false, slug: slug+"-"+slugCount});
            else me.setState({permalinkEditing: false, slug: slug});
          } else {
            if (slugCount > 1) me.setState({permalinkEditing: false, slug: slug+"-"+slugCount});
            else me.setState({permalinkEditing: false, slug: slug});
          }
        } else {
          errorCallback(error, body.errors?body.errors[0].message:null);
        }
        me.setState({permalinkInProcess: false});
      }
    );
  },
  saveImmediately: function(event){
    this.setState({immediatelyStatus: false});
    var hours = getValue("hours");
    var minute = getValue("minute");
    var time = this.state.publishDate + hours + minute;
    this.setState({immediately: time});
  },
  handleChangeStatus: function(event){
    this.setState({status: document.querySelector('#statusSelect').value});
  },
  saveDraft: function(event){
    this.setState({status: "Draft"});
  },
  saveVisibility: function(event){
    this.setState({visibilityTxt: document.querySelector("input[name=visibilityRadio]:checked").value});
  },
  disableForm: function(state){
    disableForm(state, this.notification);
    this.setState({isProcessing: state, opacity: state?0.4:1});
  },
  resetForm: function(){
    document.getElementById("postForm").reset();
    window.CKEDITOR.instances['content'].setData(null);
    this.setState({title:"", slug:"", content:"", summary:"", featuredImage: null, imageGallery:"",
      status:"Draft", immediately:"", immediatelyStatus:false, visibilityTxt:"Public",
      permalinkEditing: false, mode: "create", titleTagLeftCharacter: 65, metaDescriptionLeftCharacter: 160});
    this.handleTitleChange();
    window.history.pushState("", "", '/admin/'+this.props.slug+'/new');
  },
  getFormValues: function(){
    return {
      title: getValue("titlePost"),
      content: window.CKEDITOR.instances['content'].getData(),
      status: this.state.status,
      titleTag: getValue("titleTag"),
      metaKeyword: getValue("metaKeyword"),
      metaDescription: getValue("metaDescription"),
      passwordPage: "",
      summary: getValue("summary"),
      visibility: document.querySelector("input[name=visibilityRadio]:checked").value,
      publishDate: this.state.publishDate,
      type: this.props.slug,
      featuredImage: this.state.featuredImage,
      categories: _.map(document.getElementsByName("categoryCheckbox[]"), function(item){
        if (item.checked)
          return item.value
      })
    }
  },
  setFormValues: function(v){
    var meta = {};
    if (v.meta.edges.length>0) {
      _.forEach(v.meta.edges, function(i){
        meta[i.node.item] = i.node.value;
      });
    }
    
    var _postCategoryList = [];
    if (v.category.edges.length>0) {
      _.forEach(v.category.edges, function(i){
        if (i.node.category){
          _postCategoryList.push(i.node.category.id);
          if (document.getElementById(i.node.category.id)){
            document.getElementById(i.node.category.id).checked = true;
          }
        }
      });
      this.setState({postCategoryList: _postCategoryList});
    }
    var _postTagList = [];
    if (v.tag.edges.length>0) {
      _.forEach(v.tag.edges, function(i){
        if (i.node.tag){
          _postTagList.push({id: i.node.tag.id, name: i.node.tag.name});
          $('#tag').tagsinput('add', i.node.tag.name);
        }
      });
      this.setState({postTagList: _postTagList});
    }
    var _imageGalleryList = [];
    
    if (v.file.edges.length>0) {
      _.forEach(v.file.edges, function(i){
        if (i.node.value){
          _imageGalleryList.push({id: i.node.id, value: i.node.value});
        }
      });
      this.setState({imageGallery: _imageGalleryList});
    }

    var pubDate = v.publishDate? new Date(v.publishDate) : new Date();
    setValue("titlePost", v.title);
    setValue("content", v.content);
    window.CKEDITOR.instances['content'].setData(v.content);
    setValue("summary", v.summary);
    setValue("statusSelect", v.status);
    setValue("hours", pubDate.getHours());
    setValue("minutes", pubDate.getMinutes());
    document.getElementsByName("visibilityRadio")[v.visibility==="Public"?0:1].checked = true;
    if (_.has(meta, "metaKeyword")){
      setValue("metaKeyword", meta.metaKeyword);
    }
    if (_.has(meta, "metaDescription")){
      setValue("metaDescription", meta.metaDescription);
    }
    if (_.has(meta, "titleTag")){
      setValue("titleTag", meta.titleTag);
    }
    this.setState({title: v.title, content: v.content, summary: v.summary, 
      status: v.status, visibilityTxt: v.visibility, 
      publishDate: pubDate, publishDateReset: pubDate, slug: v.slug, featuredImage: v.featuredImage});
    this.handleTitleChange();
    this.handleTitleTagChange();
    this.handleMetaDescriptionChange();
    this.handleSummaryChange();
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
  handlePermalinkBtn: function(event) {
    var slug = this.state.slug;
    setValue("slugcontent", slug);
    this.setState({permalinkEditing: true});
  },
  handleTitleBlur: function(event) {
    var title = getValue("titlePost");
    var slug = title.split(" ").join("-").toLowerCase();
    this.checkSlug(slug);
  },
  handleSavePermalinkBtn: function(event) {
    var slug = getValue("slugcontent");
    this.checkSlug(slug);
  },
  handleTitleChange: function(event){
    var title = getValue("titlePost");
    this.setState({title: title});
    this.notifyUnsavedData(true);
  },
  handleContentChange: function(event){
    var content = window.CKEDITOR.instances['content'].getData();
    this.setState({content: content})
    this.notifyUnsavedData(true);
  },
  handleSummaryChange: function(event){
    var summary = getValue("summary");
    this.setState({summary: summary});
    this.notifyUnsavedData(true);
  },
  handleTitleTagChange: function(event){
    var titleTag = getValue("titleTag");
    this.setState({titleTagLeftCharacter: 65-(titleTag.length)});
    this.notifyUnsavedData(true);
  },
  handleMetaDescriptionChange: function(event){
    var metaDescription = getValue("metaDescription");
    this.setState({metaDescriptionLeftCharacter: 160-(metaDescription.length)});
    this.notifyUnsavedData(true);
  },
  handleDateChange: function(date){
    this.setState({immediatelyStatus: false, publishDate: new Date(date)});
    this.notifyUnsavedData(true);
  },
  handleTimeChange: function(event){
    var hours = getValue("hours");
    var minutes = getValue("minutes");
    var d = this.state.publishDate;
    d.setHours(parseInt(hours, 10));
    d.setMinutes(parseInt(minutes, 10));
    this.setState({publishDate: d});
    this.notifyUnsavedData(true);
  },
  handlePublishDateCancel: function(event){
    var resetDate = this.state.publishDateReset;
    this.setState({publishDate: resetDate});
  },
  handleTagChange: function(tag){
    debugger;
  },
  handleAddNewBtn: function(event) {
    this.resetForm();
  },
  _emulateDataForSaving: function(v){
    return {
      "title": v.title,
      "content": v.content,
      "status": v.status,
      "visibility": v.visibility,
      "passwordPage": v.passwordPage,
      "publishDate": v.publishDate,
      "type": this.props.postType,
      "authorId": localStorage.getItem('userId'),
      "slug": this.state.slug,
      "summary": v.summary,
      "parent": v.parentPage,
      "order": v.pageOrder,
      "featuredImage": v.featuredImage
    }
  },
  handleSubmit: function(event) {
    event.preventDefault();
    var me = this;
    var v = this.getFormValues();

    if (v.status === "Published" || v.status === "Draft" || v.status === "Reviewing") {
      if (v.title === null || v.title.length<=3) {
        this._errorNotif('Title is too short');
        return;
      }

      if (!v.content) {
        this._errorNotif("Content can't be empty");
        return;
      }
    }
    
    var _objData = this._emulateDataForSaving(v);
    var qry = "", noticeTxt = "";
    if (this.state.mode==="create"){
      qry = this.props.createQuery(_objData);
      noticeTxt = this.props.name+' Published!';
    }else{
      _objData["id"] = this.props.postId;
      qry = this.props.updateQuery(_objData);
      noticeTxt = this.props.name+' Updated!';
    }

    this.disableForm(true);
    riques(qry, 
      function(error, response, body) {
        if (!error && !body.errors && response.statusCode === 200) {
          var here = me, postId = "", pmQry = "";
          
          if (me.state.mode==="create"){
            postId = body.data.createPost.changedPost.id;
            pmQry = Query.createPostMetaMtn(postId, v.metaKeyword, v.metaDescription, v.titleTag, null);
          } else {
            postId = body.data.updatePost.changedPost.id;
            if (body.data.updatePost.changedPost.meta.edges.length===0) {
              pmQry = Query.createPostMetaMtn(postId, v.metaKeyword, v.metaDescription, v.titleTag, null);
            } else {
              var data = [];
              _.forEach(body.data.updatePost.changedPost.meta.edges, function(item){
                data.push({
                  postMetaId: item.node.id,
                  item: item.node.item,
                  value: _.has(v, item.node.item)?v[item.node.item]:null
                });
              });
              pmQry = Query.updatePostMetaMtn(postId, data);
            }
          }

          riques(pmQry, 
            function(error, response, body) {
              if (!error && !body.errors && response.statusCode === 200) {
                
              } else {
                errorCallback(error, body.errors?body.errors[0].message:null);
              }
              here.disableForm(false);
              here.notifyUnsavedData(false);
            }
          );
          
          if (me.isWidgetActive("category")) {
            var catQry = Query.createUpdateCategoryOfPostMtn(postId, me.state.postCategoryList, v.categories);
            riques(catQry,
              function(error, response, body) {
                here.disableForm(false);
                here.notifyUnsavedData(false);
                here.bindPostToImageGallery(postId);
                if (!error && !body.errors && response.statusCode === 200) {
                  
                } else {
                  errorCallback(error, body.errors?body.errors[0].message:null);
                }
              }
            );
          }

          if (me.isWidgetActive("tag")) {
            var currentTag = $('#tag').tagsinput('items');
            var tagQry = Query.createUpdateTagOfPostMtn(postId, me.state.postTagList, currentTag, me.state.tagMap);
            debugger;
            riques(tagQry,
              function(error, response, body) {
                here.disableForm(false);
                here.notifyUnsavedData(false);
                here.bindPostToImageGallery(postId);
                if (!error && !body.errors && response.statusCode === 200) {
                  
                } else {
                  errorCallback(error, body.errors?body.errors[0].message:null);
                }
              }
            );
          } 

          // do these when post data succesfully saved
          here._successNotif(noticeTxt);
          here.setState({mode: "update"});
          here.disableForm(false);
          here.notifyUnsavedData(false);
          here.bindPostToImageGallery(postId);
          here.props.handleNav(me.props.slug,"edit",postId);
        } else {
          errorCallback(error, body.errors?body.errors[0].message:null);
        }
      }
    );  
  },
  onTagKeyDown: function(event){
    ;
    event.preventDefault();
  },
  componentWillMount: function(){
    var me = this;

    if (this.isWidgetActive("pageHierarchy")) {
      riques(Query.getPageListQry("All"),
        function(error, response, body) {
          if (!error) {
            var pageList = [(<option key="0" value="">(no parent)</option>)];
            _.forEach(body.data.viewer.allPosts.edges, function(item){
              pageList.push((<option key={item.node.id} value={item.node.id} checked={me.state.parent=item.node.id}>
                {item.node.title}</option>));
            })
            me.setState({pageList: pageList});
          }
      });
    }

    if (this.isWidgetActive("category")) {
      riques(Query.getAllCategoryQry, 
        function(error, response, body) {
          if (!error) {
            var categoryList = [];
            _.forEach(body.data.viewer.allCategories.edges, function(item){
              categoryList.push((<div key={item.node.id}><input id={item.node.id}
              name="categoryCheckbox[]" type="checkbox" value={item.node.id} /> {item.node.name}</div>));
            })
            me.setState({categoryList: categoryList});
          }
        }
      );
    }
    if (this.isWidgetActive("tag")) {
      riques(Query.getAllTagQry, 
        function(error, response, body) {
          if (!error) {
            var _tagMap = {};
            _.forEach(body.data.viewer.allTags.edges, function(item){
              _tagMap[item.node.name] = {id: item.node.id, name: item.node.name}
            })
            me.setState({tagMap: _tagMap});
          }
        }
      );
    }
  },
  componentDidMount: function(){
    require('../lib/bootstrap-tagsinput.js');
    require('../lib/bootstrap-tagsinput.css');
    var me = this;
    
    $.getScript("https://cdn.ckeditor.com/4.6.2/standard/ckeditor.js", function(data, status, xhr){
      window.CKEDITOR.replace('content', {
        height: 400,
        title: false
      });
      for (var i in window.CKEDITOR.instances) {
        if (window.CKEDITOR.instances.hasOwnProperty(i))
          window.CKEDITOR.instances[i].on('change', me.handleContentChange);
      }
    });

    if (this.state.visibilityTxt==="Public") 
      document.getElementById("public").setAttribute('checked', true);
    else
      document.getElementById("private").setAttribute('checked', true);

    this.notification = this.refs.notificationSystem;
    
    if (this.props.postId) {
      riques(this.props.loadQuery(this.props.postId), 
        function(error, response, body) {
          if (!error ) {
            var values = body.data.getPost;
            me.setFormValues(values);
          }
        }
      );
    }
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
  featuredImageChange: function(e){
    var me = this;
    var reader = new FileReader();
    reader.onload = function(){
      me.setState({featuredImage: reader.result})
    };
    reader.readAsDataURL(e.target.files[0]);
  },
  handleFeaturedImageRemove: function(e){
    this.setState({featuredImage: null})
  },
  imageGalleryChange: function(e){
    var me = this;
    this.disableForm(true);
    var reader = new FileReader();
    reader.onload = function(){
      if (!me.props.postId) me.setState({imageGalleryUnbinded: true});
      riques(Query.addImageGallery(reader.result, me.props.postId), 
        function(error, response, body){
          if (!error && !body.errors && response.statusCode === 200) {
            var data = body.data.createFile.changedFile;
            var imageGallery = me.state.imageGallery;
            imageGallery.push({id: data.id, value:data.value});
            me.setState({imageGallery: imageGallery});
          } else {
            errorCallback(error, body.errors?body.errors[0].message:null);
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
    if (this.state.imageGallery.length>0 && this.state.imageGalleryUnbinded) {
      var qry = Query.bindImageGallery(this.state.imageGallery, postId);
      
      riques(qry, 
        function(error, response, body){
          if (!error && !body.errors && response.statusCode === 200) {
            me.setState({imageGalleryUnbinded: false})
          } else {
            errorCallback(error, body.errors?body.errors[0].message:null);
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
          var imageGallery = me.state.imageGallery;
          _.pull(imageGallery, _.nth(imageGallery, index));
          me.setState({imageGallery: imageGallery});
        } else {
          errorCallback(error, body.errors?body.errors[0].message:null);
        }
        me.disableForm(false);
        document.getElementById("imageGallery").value=null;
      }
    );
  },
  render: function(){
    var rootUrl = getConfig('rootUrl');
    var templates = getTemplates();

    const newPost=(
      <div className="content-wrapper">
        <div className="container-fluid">
          <section className="content-header"  style={{marginBottom:20}}>
              <h1>{this.state.mode==="update"?"Edit Current "+this.props.name:"Add New "+this.props.name}
              { this.state.mode==="update" &&
                <small style={{marginLeft: 5}}>
                  <button className="btn btn-default btn-primary add-new-post-btn" onClick={this.handleAddNewBtn}>Add new</button>
                </small>
              }
              </h1>
                <ol className="breadcrumb">
                  <li><a href="#"><i className="fa fa-dashboard"></i> Home</a></li>
                  <li><a href="#" onClick={function(){this.props.handleNav(this.props.slug)}.bind(this)}>
                    {this.props.name}</a></li>
                  <li className="active">{this.state.mode==="update"?"Edit "+this.props.name:"Add New"}</li>
                </ol>
               <div style={{borderBottom:"#eee" , borderBottomStyle:"groove", borderWidth:2, marginTop: 10}}></div>
          </section>
          <Notification ref="notificationSystem" />

          <form onSubmit={this.handleSubmit} id="postForm" method="get" style={{opacity: this.state.opacity}}>
          { this.state.isProcessing &&
          <div style={defaultHalogenStyle}><Halogen.PulseLoader color="#4DAF7C"/></div>                   
          }
          <div className="col-md-8">
            <div className="form-group"  style={{marginBottom:30}}>
              <div>
                <input id="titlePost" style={{marginBottom: 20}} type="text" className="form-control" 
                  placeholder="Input Title Here" onChange={this.handleTitleChange} onBlur={this.handleTitleBlur}/>
                  <div className="form-inline">
                    { !this.state.permalinkEditing ? 
                      ( <p>Permalink: &nbsp;
                        {this.state.mode==="update"?(
                          <a id="permalink" href={rootUrl+'/'+this.state.slug}>{rootUrl}/{this.state.slug}</a>
                          ) : (
                          <a id="permalink" href="#">{rootUrl}/{this.state.slug}</a>
                          )
                        }
                        <button type="button" onClick={this.handlePermalinkBtn} id="editBtn" className="btn btn-default" style={{height:25, marginLeft: 5, padding: "2px 5px"}}>
                          <span style={{fontSize: 12}}>Edit</span>
                        </button> 
                        { this.state.permalinkInProcess && <i style={{marginLeft:5}} className="fa fa-spin fa-refresh"></i>}
                        </p>
                      ) : (
                        <p>Permalink: 
                        <div className="form-group" id="permalinkcontent">
                          <a id="permalink" href="#">{rootUrl}/</a>
                          <input id="slugcontent" defaultValue={this.state.slug}/>
                          <button type="button" className="btn btn-default" onClick={this.handleSavePermalinkBtn}>OK</button>
                        </div>
                        { this.state.permalinkInProcess && <i style={{marginLeft:5}} className="fa fa-spin fa-refresh"></i>}
                        </p>
                      )
                    }
                  </div>
                  <textarea id="content" name="content" rows="25" style={{width: "100%"}} wrap="hard"></textarea>
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
                <textarea id="summary" name="summary" wrap="hard" rows="3" style={{width: '100%'}} onChange={this.handleSummaryChange}>
                </textarea>                 
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
                      <p><a href="#">{this.state.title===""?"No Title":this.state.title.substring(0,71)}</a></p>
                      <p>{this.state.content===""?"":this.state.content.substring(0,100).replace(/(<([^>]+)>)/ig,"")}</p>
                      <p><span className="help-block"><a style={{color: 'green'}}>{rootUrl}/{this.state.slug}</a> - <a>Cache</a> - <a>Similar</a></span></p>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="col-md-4"><p>Title Tag</p></div>
                    <div className="col-md-8">
                      <input id="titleTag" type="text" style={{width: '100%'}} placeholder={this.state.title} onChange={this.handleTitleTagChange}/>
                        <span className="help-block">Up to 65 characters recommended<br/>
                        {this.state.titleTagLeftCharacter} characters left</span>                     
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="col-md-4"><p>Meta Description</p></div>
                    <div className="col-md-8">
                      <textarea id="metaDescription" rows='2' style={{width:'100%'}} placeholder={this.state.summary} 
                      onChange={this.handleMetaDescriptionChange}></textarea>
                      <span className="help-block">160 characters maximum<br/>
                      {this.state.metaDescriptionLeftCharacter} characters left</span>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="col-md-4"><p>Meta Keywords</p></div>
                    <div className="col-md-8">
                      <div className="form-group">
                        <input id="metaKeyword" type="text" style={{width: '100%'}}/>
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
                          Status: <b>{this.state.status} </b>
                          <button type="button" className="btn btn-flat btn-xs btn-default" data-toggle="collapse" data-target="#statusOption"> Edit </button></p>
                          <div id="statusOption" className="collapse">
                            <div className="form-group">
                                <select id="statusSelect" style={{marginRight: 10, height: 30}}>
                                  <option>Published</option>
                                  <option>Reviewing</option>
                                </select>
                                <button type="button" onClick={this.handleChangeStatus} className="btn btn-flat btn-xs btn-primary" 
                                style={{marginRight: 10}} data-toggle="collapse" data-target="#statusOption">OK</button>
                                <button type="button" className="btn btn-flat btn-xs btn-default" data-toggle="collapse" data-target="#statusOption">Cancel</button>
                            </div>
                          </div>
                        </div>

                        <div className="form-group">
                          <p style={{fontSize: 14}}><span className="glyphicon glyphicon-sunglasses" style={{marginRight:10}}></span>Visibility: <b>{this.state.visibilityTxt} </b>
                          <button type="button" className="btn btn-flat btn-xs btn-default" data-toggle="collapse" data-target="#visibilityOption"> Edit </button></p>
                          <div id="visibilityOption" className="collapse">
                            <div className="radio">
                              <label>
                                <input type="radio" name="visibilityRadio" id="public" value="Public"/>
                                Public
                              </label>
                            </div>
                            <div className="radio">
                              <label>
                                <input type="radio" name="visibilityRadio" id="private" value="Private"/>
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
                          <p><span className="glyphicon glyphicon-calendar" style={{marginRight: 10}}></span>{this.state.immediatelyStatus===true?
                            (<span>Publish <b>Immediately </b></span>):<span>Published at <b>{this.formatDate(this.state.publishDate)}</b> </span>} 
                          <button type="button" className="btn btn-flat btn-xs btn-default" data-toggle="collapse" data-target="#scheduleOption"> Edit </button></p>

                          <div id="scheduleOption" className="collapse">
                            <div className="form-group">
                              <div className="row">
                                <div className="col-md-6">
                                  <DatePicker id="datepicker" style={{width: "100%", padddingRight: 0, textAlign: "center"}} value={this.state.publishDate.toISOString()} onChange={this.handleDateChange}/>
                                </div>
                                <div className="col-md-6">
                                  <input type="text" id="hours" style={{width: 30, height: 34, textAlign: "center"}} defaultValue={new Date().getHours()} onChange={this.handleTimeChange}/> : 
                                  <input type="text" id="minutes" style={{width: 30, height: 34, textAlign: "center"}} defaultValue={new Date().getMinutes()} onChange={this.handleTimeChange}/>
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
                            <button type="submit" id="publishBtn" className="btn btn-primary btn-flat">{this.state.mode==="update"?"Save":"Publish"}</button>
                            <button type="button" className="btn btn-primary btn-flat dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                              <span className="caret"></span>
                              <span className="sr-only">Toggle Dropdown</span>
                            </button>
                            <ul className="dropdown-menu" role="menu">
                              <li><button onClick={this.saveDraft} className="btn btn-default btn-flat">{this.state.status==="Draft"?"Save As Draft":""}</button></li>
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
                        <select id="parentPage" style={{width: 250}}>
                          {this.state.pageList}
                        </select>
                      </div>
                      <div className="form-group">
                        <p><b>Page  Template</b></p>
                        <select id="pageTemplate" style={{width: 250}} defaultValue={templates?templates[0].item:null}>
                        { templates ?
                          templates.map(function(item, index){
                            return (<option key={item.id}>{item.name}</option>)
                          }) : ""
                        }
                        </select>
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
                          {this.state.categoryList}
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
                          <input id="tag" data-role="tagsinput" style={{width: '100%'}} onChange={this.handleTagChange}/>
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
                        { this.state.featuredImage &&
                          <div style={{position: "relative"}}>
                            <img src={this.state.featuredImage} style={{width: "100%"}} alt={this.state.title}/>
                            <button onClick={this.handleFeaturedImageRemove} type="button" className="btn btn-info btn-sm" style={{top: 15, right: 5, position: "absolute"}}><i className="fa fa-times"></i></button>
                          </div>
                        }
                        { !this.state.featuredImage &&
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
                          _.map(this.state.imageGallery, function(item, index){
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

export default NewContentType;