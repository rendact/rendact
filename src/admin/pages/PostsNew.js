import React from 'react';
import request from 'request';
import _ from 'lodash';
import $ from 'jquery';
window.jQuery = $;

import Config from '../../config';
import Query from '../query';
//window.CKEDITOR_BASEPATH = '/ckeditor/';
//require('ckeditor');

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
        window.CKEDITOR.instances[i].on('change', me.handleContentChange);
      }
    });

    var d = new Date();
    var year = d.getFullYear();
    var month = d.getMonth();
    var day = d.getDate();
    var hour = d.getHours();
    var minute = d.getMinutes();
    $("#yy").val(year);
    $("#dd").val(day);
    $("#mm option[value="+(month+1)+"]").prop("selected", true);
    $("#hh").val(hour);
    $("#min").val(minute);

  },

  getInitialState: function(){
    return {
      noticeTxt: null,
      loadingMsg: null,
      errorMsg:null,
      title:"",
      slug:"",
      content:"",
      summary:"",
      status:"Draft",
      immediately:"",
      immediatelyStatus:false,
      visibilityTxt:"",
      visibilityStatus:false,
      permalinkEditing: false,
      mode: this.props.postId?"update":"create",
      categoryList: null,
      titleTagLeftCharacter: 65,
      metaDescriptionLeftCharacter: 160
    }
  },

  handlePermalinkBtn: function(event) {
    var slug = this.state.slug;
    $("#slugEditor").val(slug);
    this.setState({permalinkEditing: true});
  },
  handlePermalinkChange: function(event) {
    var slug = $("#slugEditor").val();
    this.setState({slug:slug});
  },
  handleSavePermalinkBtn: function(event) {
    this.setState({permalinkEditing: false});
  },
  handleTitleChange: function(event){
    var title = $("#titlePost").val();
    var slug = title.replace(" ","-").toLowerCase();
    this.setState({title: title, slug: slug})
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
  saveImmediately: function(event){
    this.setState({immediatelyStatus: true});
    var day = $("#dd").val();
    var year = $("#yy").val();
    var hour = $("#hh").val();
    var min = $("#min").val();
    this.setState({immediately: $("#mm option:selected").text() + " " + day + " " + year + " " + "@" + " " + hour + ":" + min});
    $("m").hide();
  },
  saveDraft: function(event){
    this.setState({draft: $("#statusSelect option:selected").text()});
    $("s").hide();
  },
  saveVisibility: function(event){
    this.setState({visibilityStatus: true});
    this.setState({visibilityTxt: $("input[name=radiosName]:checked").val()});
    $("v").hide();
  },
  disableForm: function(state){
    $("#publishBtn").attr('disabled',state);
    this.setState({loadingMsg: state?"Saving...":null});
  },
  handleSubmit: function(event) {
    this.disableForm(true);
    var me = this;
    var title = $("#titlePost").val();
    var content =  window.CKEDITOR.instances['content'].getData();
    var titleTag = $("#titleTag").val();
    var metaKeyword = $("#metaKeyword").val();
    var metaDescription = $("#metaDescription").val();
    var summary = $("#summary").val();
    var draft = $("#statusSelect option:selected").text();
    var visibility = $("input[name=radiosName]:checked").val();
    //var passwordPage = $("#passwordPage").val();
    var passwordPage = "";
    var year = $("#yy").val();
    var month = $("#mm option:selected").text();
    var day = $("#dd").val();
    var hour = $("#hh").val();
    var min = $("#min").val();
    var publishDate = year+"-"+month+"-"+day+"@"+hour+":"+min ;
    var parentPost = $("#parentPost").val();
    var postOrder = $("#postOrder").val();
    var postOrderInt = 0;
    try  {postOrderInt=parseInt(postOrderInt)} catch(e) {}
    var type = "post";
    
    var qry = "";
    if (this.state.mode==="create"){
      qry = Query.getCreatePostQry(
        title, 
        content, 
        titleTag, 
        draft, 
        visibility, 
        passwordPage, 
        publishDate, 
        localStorage.getItem('userId'), 
        this.state.slug,
        parentPost,
        postOrderInt,
        type);
      me.setState({noticeTxt:"Post Published!"});
    }else{
      qry = Query.getUpdatePostQry(title, 
        content, 
        titleTag, 
        draft, 
        visibility, 
        passwordPage, 
        publishDate, 
        localStorage.getItem('userId'), 
        this.state.slug,
        parentPost,
        postOrderInt,
        type);
      me.setState({noticeTxt:"Post Updated!"});
    }
    request({
      url: Config.scapholdUrl,
      method: "POST",
      json: true,
      headers: {
        "content-type": "application/json",
        "Authorization": "Bearer " + localStorage.token
      },
      body: qry
    }, (error, response, body) => {
      if (!error && !body.errors && response.statusCode === 200) {
        me.setState({mode: "update"});
      } else {
        if (body && body.errors) {
          me.setState({errorMsg: body.errors[0].message});
        } else {
          me.setState({errorMsg: error.toString()});
        }
      }
    });
    
    request({
      url: Config.scapholdUrl,
      method: "POST",
      json: true,
      headers: {
        "content-type": "application/json",
        "Authorization": "Bearer " + localStorage.token
      },
      body: Query.getCreatePostMetaQry(metaKeyword, metaDescription, summary)
    }, (error, response, body) => {

      if (!error && !body.errors && response.statusCode === 200) {
        
      } else {
        if (body && body.errors) {
          me.setState({errorMsg: body.errors[0].message});
        } else {
          me.setState({errorMsg: error.toString()});
        }
      }
      me.disableForm(false);
    });

    event.preventDefault();
  },
  onTagKeyDown: function(event){
    debugger;
    event.preventDefault();
  },
  componentWillMount: function(){
    var me = this;
    request({
        url: Config.scapholdUrl,
        method: "POST",
        json: true,
        headers: {
          "content-type": "application/json",
          "Authorization": "Bearer " + localStorage.token
        },
        body: Query.getAllCategoryQry
      }, (error, response, body) => {
        if (!error) {
          var categoryList = [];
          $.each(body.data.viewer.allCategories.edges, function(key, item){
            categoryList.push((<div><input key={item.node.id} type="checkbox" value=""/> {item.node.name}</div>));
          })
          me.setState({categoryList: categoryList});
        }
    });

    if (!this.props.postId) return;

    request({
        url: Config.scapholdUrl,
        method: "POST",
        json: true,
        headers: {
          "content-type": "application/json",
          "Authorization": "Bearer " + localStorage.token
        },
        body: Query.getPostQry(this.props.postId)
      }, (error, response, body) => {
        if (!error) {
          var values = body.data.getPost;
          me.setFormValues(values);
        }
    });
  },
  handleAddNewBtn: function(event) {
    window.location = Config.rootUrl+"/admin/posts/new";
  },
  setFormValues: function(v){
    var meta = {};
    if (v.meta.edges.length>0) {
      _.forEach(v.meta.edges, function(i){
        meta[i.node.item] = i.node.value;
      });
    }
    document.getElementById("titlePost").value = v.title;
    document.getElementById("content").value = v.content;
    document.getElementById("summary").value = v.summary;
    document.getElementById("statusSelect").value = v.status;
    document.getElementsByName("visibilityRadio")[v.visibility=="Public"?0:1].checked = true;
    if (_.has(meta, "metaKeyword")){
      document.getElementById("metaKeyword").value = meta.metaKeyword;
    }
    if (_.has(meta, "metaDescription")){
      document.getElementById("metaDescription").value = meta.metaDescription;
    }
    this.setState({title: v.title, slug:v.slug, content: v.content, summary: v.summary, status: v.status});
  },
  render: function(){
    const newPost=(
      <div className="content-wrapper">
        <div className="container-fluid">
          <section className="content-header"  style={{marginBottom:20}}>
              <h1>{this.state.mode==="update"?"Edit Current Post":"Add New Post"}
              { this.state.mode==="update" &&
                <small style={{marginLeft: 5}}><button onClick={this.handleAddNewBtn}>Add new</button></small>
              }
              </h1>
                <ol className="breadcrumb">
                  <li><a href="#"><i className="fa fa-dashboard"></i> Home</a></li>
                  <li>Posts</li>
                  <li className="active">Add New</li>
                </ol>
               
          </section>
          { this.state.errorMsg &&
            <div className="alert alert-danger alert-dismissible">
              <button type="button" className="close" data-dismiss="alert" aria-hidden="true">×</button>
              {this.state.errorMsg}
            </div>
          }
          <form onSubmit={this.handleSubmit} method="get">
          <div className="col-md-8">
            <div className="form-group"  style={{marginBottom:30}}>
              <div>
                <input id="titlePost" style={{marginBottom: 20}} type="text" className="form-control" 
                  placeholder="Input Title Here" required="true" onChange={this.handleTitleChange}/>
                  <div className="form-inline">
                    { !this.state.permalinkEditing ? 
                      ( <p>Permalink: &nbsp;
                        <a id="permalink">{Config.rootUrl}/{this.state.slug}</a><button type="button" onClick={this.handlePermalinkBtn} id="editBtn" className="btn btn-default" style={{height:25, marginLeft: 5, padding: "2px 5px"}}>
                          <span style={{fontSize: 12}}>Edit</span>
                        </button>
                        </p>
                      ) : (
                        <p>Permalink: 
                        <div className="form-group" id="permalinkEditor">
                          <a id="permalink">{Config.rootUrl}/</a>
                          <input id="slugEditor" value={this.state.slug} onChange={this.handlePermalinkChange}/>
                          <button type="button" className="btn btn-default" onClick={this.handleSavePermalinkBtn}>OK</button>
                        </div>
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
                      <p>{this.state.content===""?"":this.state.content.substring(0,100)}</p>
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
                      <textarea id="metaDescription" rows='2' style={{width:'100%'}} placeholder={this.state.summary} onChange={this.handleMetaDescriptionChange}></textarea>
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
                                <form className="form-inline">
                                  <select id="statusSelect" style={{marginRight: 10, height: 30}}>
                                    <option>Published</option>
                                    <option>Draft</option>
                                    <option>Pending Review</option>
                                  </select>
                                  <button type="button" onClick={this.saveDraft} className="btn btn-flat btn-xs btn-primary" style={{marginRight: 10}}>OK</button>
                                  <button type="button" className="btn btn-flat btn-xs btn-default" data-toggle="collapse" data-target="#statusOption">Cancel</button>
                                </form>
                            </div>
                          </div>
                        </div>

                        <div className="form-group">
                          <p style={{fontSize: 14}}><span className="glyphicon glyphicon-sunglasses" style={{marginRight:10}}></span>Visibility: <b>{this.state.visibilityStatus===false?"Public":this.state.visibilityTxt} </b>
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
                            <form className="form-inline" style={{marginTop: 10}}>
                              <button type="button" onClick={this.saveVisibility} className="btn btn-flat btn-xs btn-primary" style={{marginRight: 10}}>OK</button>
                              <button type="button" className="btn btn-flat btn-xs btn-default" data-toggle="collapse" data-target="#visibilityOption">Cancel</button>
                            </form>
                            </div>
                        </div>

                        <div className="form-group">
                          <p><span className="glyphicon glyphicon-calendar" style={{marginRight: 10}}></span>Publish <b>{this.state.immediatelyStatus===false?"Immediately":this.state.immediately} </b>
                          <button type="button" className="btn btn-flat btn-xs btn-default" data-toggle="collapse" data-target="#scheduleOption"> Edit </button></p>

                          <div id="scheduleOption" className="collapse">
                            <div className="form-group">
                              <form className="form-inline">
                                <select id="mm" name="mm" className="form-control btn btn-flat btn-xs btn-default" style={{marginRight: 10, height: 20 }}>
                                  <option value="1">Jan</option>
                                  <option value="2">Feb</option>
                                  <option value="3">Mar</option>
                                  <option value="4">Apr</option>
                                  <option value="5">May</option>
                                  <option value="6">June</option>
                                  <option value="7">July</option>
                                  <option value="8">Aug</option>
                                  <option value="9">Sep</option>
                                  <option value="10">Oct</option>
                                  <option value="11">Nov</option>
                                  <option value="12">Des</option>
                                </select>
                                <input className="form-control btn btn-flat btn-xs btn-default" type="text" id="dd" style={{width: 50, height: 20}}/>,
                                <input className="form-control btn btn-flat btn-xs btn-default" type="text" id="yy" style={{marginLeft: 10, marginRight:5, width: 50, height: 20}}/>@
                                <input className="form-control btn btn-flat btn-xs btn-default" type="text" id="hh" style={{marginLeft: 5,  width: 35, height: 20}}/> : 
                                <input className="form-control btn btn-flat btn-xs btn-default" type="text" id="min" style={{width: 35, height: 20 }}/>
                              </form>
                                <form className="form-inline" style={{marginTop: 10}}>
                                  <button type="button" id="immediatelyOkBtn" onClick={this.saveImmediately} className="btn btn-flat btn-xs btn-primary" style={{marginRight: 10}}> OK </button>
                                  <button type="button" className="btn btn-flat btn-xs btn-default" data-toggle="collapse" data-target="#scheduleOption">Cancel</button>
                                </form>
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
                              <li><button type="submit" className="btn btn-default btn-flat">{this.state.status==="Draft"?"Save As Draft":""}</button></li>
                            </ul>
                          </div>
                          <p>{this.state.loadingMsg}</p>
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