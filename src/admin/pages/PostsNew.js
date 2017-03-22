import React from 'react';
import _ from 'lodash';
import $ from 'jquery';
window.jQuery = $;
import Config from '../../config';
import Query from '../query';
import {riques, setValue, getValue} from '../../utils';
import { default as swal } from 'sweetalert2';
import DatePicker from 'react-bootstrap-date-picker';
import Notification from 'react-notification-system';

const errorCallback = function(msg1, msg2){
  if (msg1) swal('Failed!', msg1, 'warning')
  else if (msg2) swal('Failed!', msg2, 'warning')
  else swal('Failed!', 'Unknown error','warning')
}

const NewPost = React.createClass({
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

    if (this.state.visibilityTxt==="Public") {
      $("#public").attr("checked", true);
    }else $("#private").attr("checked", true);

    this.notification = this.refs.notificationSystem;
  },

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
      categoryList: null,
      postCategoryList: [],
      titleTagLeftCharacter: 65,
      metaDescriptionLeftCharacter: 160,
      publishDate: new Date(),
      publishDateReset: new Date()
    }
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
    var hours = $("#hours").val();
    var minute = $("#minute").val();
    var time = this.state.publishDate + hours + minute;
    this.setState({immediately: time});
  },
  saveDraft: function(event){
    this.setState({status: $("#statusSelect option:selected").text()});
  },
  saveVisibility: function(event){
    this.setState({visibilityTxt: $("input[name=visibilityRadio]:checked").val()});
  },
  disableForm: function(state){
    _.forEach(document.getElementsByTagName('input'), function(el){ el.disabled = state;})
    _.forEach(document.getElementsByTagName('button'), function(el){ el.disabled = state;})
    _.forEach(document.getElementsByTagName('select'), function(el){ el.disabled = state;})
    
    if (state)
      this.notification.addNotification({
        id: 'loading',
        message: 'Processing...',
        level: 'warning',
        position: 'tr'
      });
    else 
      this.notification.removeNotification('loading');
  },
  resetForm: function(){
    document.getElementById("postForm").reset();
    window.CKEDITOR.instances['content'].setData(null);
    this.setState({title:"", slug:"", content:"", summary:"",
      status:"Draft", immediately:"", immediatelyStatus:false, visibilityTxt:"Public",
      permalinkEditing: false, mode: "create", titleTagLeftCharacter: 65, metaDescriptionLeftCharacter: 160});
    this.handleTitleChange();
    window.history.pushState("", "", '/admin/posts/new');
  },
  getFormValues: function(){
    return {
      title: getValue("titlePost"),
      content: window.CKEDITOR.instances['content'].getData(),
      status: getValue("statusSelect"),
      titleTag: getValue("titleTag"),
      metaKeyword: getValue("metaKeyword"),
      metaDescription: getValue("metaDescription"),
      passwordPage: "",
      summary: getValue("summary"),
      visibility: $("input[name=visibilityRadio]:checked").val(),
      publishDate: this.state.publishDate,
      type: "post",
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
        _postCategoryList.push(i.node.id);
        if (document.getElementById(i.node.category.id)){
          document.getElementById(i.node.category.id).checked = true;
        }
      });
      this.setState({postCategoryList: _postCategoryList});
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
      publishDate: pubDate, publishDateReset: pubDate, slug: v.slug});
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
  handlePermalinkBtn: function(event) {
    var slug = this.state.slug;
    $("#slugcontent").val(slug);
    this.setState({permalinkEditing: true});
  },
  handleTitleBlur: function(event) {
    var title = $("#titlePost").val();
    var slug = title.split(" ").join("-").toLowerCase();
    this.checkSlug(slug);
  },
  handleSavePermalinkBtn: function(event) {
    var slug = $("#slugcontent").val();
    this.checkSlug(slug);
  },
  handleTitleChange: function(event){
    var title = $("#titlePost").val();
    //var slug = title.split(" ").join("-").toLowerCase();
    this.setState({title: title});
  },
  handleContentChange: function(event){
    var content = $(window.CKEDITOR.instances['content'].getData()).text();
    this.setState({content: content})
  },
  handleSummaryChange: function(event){
    var summary = $("#summary").val();
    this.setState({summary: summary})
  },
  handleTitleTagChange: function(event){
    var titleTag = $("#titleTag").val();
    this.setState({titleTagLeftCharacter: 65-(titleTag.length)});
  },
  handleMetaDescriptionChange: function(event){
    var metaDescription = $("#metaDescription").val();
    this.setState({metaDescriptionLeftCharacter: 160-(metaDescription.length)});
  },
  handleDateChange: function(date){
    this.setState({immediatelyStatus: false, publishDate: new Date(date)});
  },
  handleTimeChange: function(event){
    var hours = getValue("hours");
    var minutes = getValue("minutes");
    var d = this.state.publishDate;
    d.setHours(parseInt(hours, 10));
    d.setMinutes(parseInt(minutes, 10));
    this.setState({publishDate: d})
  },
  handlePublishDateCancel: function(event){
    var resetDate = this.state.publishDateReset;
    this.setState({publishDate: resetDate});
  },
  handleSubmit: function(event) {
    event.preventDefault();
    var me = this;
    var v = this.getFormValues();

    if (v.title.length<=3) {
      this.notification.addNotification({
        title: 'Error',
        message: 'Title is too short',
        level: 'error',
        position: 'tr'
      });
      return;
    }

    if (!v.content) {
      this.notification.addNotification({
        title: 'Error',
        message: "Content can't be empty",
        level: 'error',
        position: 'tr'
      });
      return;
    }

    this.disableForm(true);
    var qry = "", noticeTxt = "";
    if (this.state.mode==="create"){
      qry = Query.getCreatePostQry(v.title, v.content, v.status, v.visibility, v.passwordPage, v.publishDate, 
        localStorage.getItem('userId'), this.state.slug, v.summary);
      noticeTxt = 'Post Published!';
    }else{
      qry = Query.getUpdatePostQry(this.props.postId, v.title, v.content, v.status, v.visibility, v.passwordPage, 
        v.publishDate, localStorage.getItem('userId'), this.state.slug, v.summary);
      noticeTxt = 'Post Updated!';
    }

    riques(qry, 
      function(error, response, body) {
        if (!error && !body.errors && response.statusCode === 200) {
          var here = me;
          var postMetaId = "";
          var postId = "";
          var pmQry = "";
          var categoryOfPostId = "";

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
                var catQry = Query.createUpdateCategoryOfPostMtn(postId, me.state.postCategoryList, v.categories);
                riques(catQry,
                  function(error, response, body) {
                    if (!error && !body.errors && response.statusCode === 200) {
                      here.notification.addNotification({
                        message: noticeTxt,
                        level: 'success',
                        position: 'tr',
                        autoDismiss: 2
                      });
                      here.setState({mode: "update"});
                    } else {
                      errorCallback(error, body.errors?body.errors[0].message:null);
                    }
                    here.disableForm(false);
                  }
                );
              } else {
                errorCallback(error, body.errors?body.errors[0].message:null);
              }
              here.disableForm(false);
            }
          );
        } else {
          errorCallback(error, body.errors?body.errors[0].message:null);
        }
      }
    );  
  },
  onTagKeyDown: function(event){
    debugger;
    event.preventDefault();
  },
  componentWillMount: function(){
    var me = this;
    riques(Query.getAllCategoryQry, 
      function(error, response, body) {
        if (!error) {
          var categoryList = [];
          $.each(body.data.viewer.allCategories.edges, function(key, item){
            categoryList.push((<div><input key={item.node.id} id={item.node.id} name="categoryCheckbox[]" type="checkbox" value={item.node.id} /> {item.node.name}</div>));
          })
          me.setState({categoryList: categoryList});

          if (!me.props.postId) return;

          riques(Query.getPostQry(me.props.postId), 
            function(error, response, body) {
              if (!error) {
                var values = body.data.getPost;
                me.setFormValues(values);
              }
            }
          );

        }
      }
    );
  },
  handleAddNewBtn: function(event) {
    this.resetForm();
  },
  
  render: function(){
    const newPost=(
      <div className="content-wrapper">
        <div className="container-fluid">
          <section className="content-header"  style={{marginBottom:20}}>
              <h1>{this.state.mode==="update"?"Edit Current Post":"Add New Post"}
              { this.state.mode==="update" &&
                <small style={{marginLeft: 5}}>
                  <button className="btn btn-default btn-primary add-new-post-btn" onClick={this.handleAddNewBtn}>Add new</button>
                </small>
              }
              </h1>
                <ol className="breadcrumb">
                  <li><a href="#"><i className="fa fa-dashboard"></i> Home</a></li>
                  <li>Posts</li>
                  <li className="active">{this.state.mode==="update"?"Edit Post":"Add New"}</li>
                </ol>
               
          </section>
          <Notification ref="notificationSystem" />

          <form onSubmit={this.handleSubmit} id="postForm" method="get">
          <div className="col-md-8">
            <div className="form-group"  style={{marginBottom:30}}>
              <div>
                <input id="titlePost" style={{marginBottom: 20}} type="text" className="form-control" 
                  placeholder="Input Title Here" required="true" onChange={this.handleTitleChange} onBlur={this.handleTitleBlur}/>
                  <div className="form-inline">
                    { !this.state.permalinkEditing ? 
                      ( <p>Permalink: &nbsp;
                        {this.state.mode==="update"?(
                          <a id="permalink" href={Config.rootUrl+'/'+this.state.slug}>{Config.rootUrl}/{this.state.slug}</a>
                          ) : (
                          <a id="permalink" href="#">{Config.rootUrl}/{this.state.slug}</a>
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
                          <a id="permalink" href="#">{Config.rootUrl}/</a>
                          <input id="slugcontent" defaultValue={this.state.slug}/>
                          <button type="button" className="btn btn-default" onClick={this.handleSavePermalinkBtn}>OK</button>
                        </div>
                        { this.state.permalinkInProcess && <i style={{marginLeft:5}} className="fa fa-spin fa-refresh"></i>}
                        </p>
                      )
                    }
                  </div>
                  <textarea id="content" name="content" rows="25" style={{width: "100%"}} wrap="hard" required="true"></textarea>
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
                      <p><span className="help-block"><a style={{color: 'green'}}>{Config.rootUrl}/{this.state.slug}</a> - <a>Cache</a> - <a>Similar</a></span></p>
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
                                  <option>Pending Review</option>
                                </select>
                                <button type="button" onClick={this.saveDraft} className="btn btn-flat btn-xs btn-primary" 
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
                            (<span>Publish <b>Immediately</b></span>):<span>Published at <b>{this.formatDate(this.state.publishDate)}</b></span>} 
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
                          <input id="tags" type="text" data-role="tagsinput"/>
                          <p><span className="help-block">Press enter after inputting tag</span></p>
                      </div>
                    </div>
                  </div>
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

export default NewPost;