import React from 'react';
import request from 'request';
import $ from 'jquery';
window.jQuery = $;

import Config from '../../config';
import Query from '../../query';
//window.CKEDITOR_BASEPATH = '/ckeditor/';
//require('ckeditor');


const NewPost = React.createClass({
  componentDidMount: function(){
    $.getScript("https://cdn.ckeditor.com/4.6.2/standard/ckeditor.js", function(data, status, xhr){
      window.CKEDITOR.replace('editor1', {
        height: 400,
        title: false
      });
    });

    $(document).ready(function(){
      $("m").hide();
        $("#hide").click(function(){
            $("m").hide(1000);
        });
        $("#show").click(function(){
            $("m").show(1000);
        });
        });

    $(document).ready(function(){
      $("v").hide();
        $("#hideVis").click(function(){
            $("v").hide(1000);
        });
        $("#showVis").click(function(){
            $("v").show(1000);
        });
        });

    $(document).ready(function(){
      $("s").hide();
        $("#hideStat").click(function(){
            $("s").hide(1000);
        });
        $("#showStat").click(function(){
            $("s").show(1000);
        });
        });
  },

  getInitialState: function(){
    return {
      noticeTxt: null,
      loadingMsg: null,
      errorMsg:null,
      slug:"",
      permalinkEditing: false,
      mode: this.props.postId?"update":"create"
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
    var title = $("#titlePage").val();
    var slug = title.replace(" ","-").toLowerCase();
    this.setState({slug: slug})
  },

  disableForm: function(state){
    $("#publishBtn").attr('disabled',state);
    this.setState({loadingMsg: state?"Saving...":null});
  },
  handleSubmit: function(event) {
    this.disableForm(true);
    var me = this;
    var title = $("#titlePage").val();
    var content =  window.CKEDITOR.instances['editor1'].getData();
    var titleTag = $("#titleTag").val();
    var metaKeyword = $("#metaKeyword").val();
    var metaDescription = $("#metaDescription").val();
    var summary = $("#editor2").val();
    
    var qry = "";
    if (this.state.mode==="create"){
      qry = Query.getCreatePostQry(title, content, titleTag, localStorage.getItem('userId'), this.state.slug);
      me.setState({noticeTxt:"Page Published!"});
    }else{ 
      qry = Query.getUpdatePostQry(this.props.postId, title, content, titleTag, localStorage.getItem('userId'), this.state.slug);
      me.setState({noticeTxt:"Page Updated!"});
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
  componentWillMount: function(){
    if (!this.props.postId) return;

    var me = this;
    request({
        url: Config.scapholdUrl,
        method: "POST",
        json: true,
        headers: {
          "content-type": "application/json",
          "Authorization": "Bearer " + localStorage.token
        },
        body: Query.getPageQry(this.props.postId)
      }, (error, response, body) => {
        if (!error) {
          var values = body.data.getPost;
          $("#titlePage").val(values.title);
          $("#editor1").val(values.content);
          me.setState({slug:values.slug});
        }
    });
  },
  render: function(){
    const newPage=(
      <div className="content-wrapper">
        <div className="container-fluid">
          <section className="content-header"  style={{marginBottom:20}}>
              <h1>{this.state.mode==="update"?"Edit Current Page":"Add New Page"}</h1>
                <ol className="breadcrumb">
                  <li><a href="#"><i className="fa fa-dashboard"></i> Home</a></li>
                  <li>Pages</li>
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
                <input id="titlePage" style={{marginBottom: 20}} type="text" className="form-control" 
                  placeholder="Input Title Here" required="true" onChange={this.handleTitleChange}/>
                  <div className="form-inline">
                    { !this.state.permalinkEditing ? 
                      ( <p>Permalink: 
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
                  <textarea id="editor1" name="editor1" rows="25" style={{width: "100%"}} wrap="hard" required="true"></textarea>
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
                <textarea id="editor2" name="editor2" wrap="hard" rows="3" style={{width: '100%'}}>
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
                      <p><a href="#">{this.state.slug===""?"Judul Masih Kosong":this.state.slug}</a></p>
                      <p>Some descriptions...</p>
                      <p><span className="help-block"><a style={{color: 'green'}}>{Config.rootUrl}/{this.state.slug}</a> - <a>Cache</a> - <a>Similar</a></span></p>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="col-md-4"><p>Title Tag</p></div>
                    <div className="col-md-8">
                      <input id="titleTag" type="text" style={{width: '100%'}}/>
                        <span className="help-block">Up to 65 characters recommended</span>
                        <span className="help-block">65 characters left</span>                     
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="col-md-4"><p>Meta Description</p></div>
                    <div className="col-md-8">
                      <textarea id="metaDescription" rows='2' style={{width:'100%'}}></textarea>
                      <span className="help-block">160 characters maximum</span>
                      <span className="help-block">160 characters left</span>
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
                          <p style={{fontSize: 14}}><span className="glyphicon glyphicon-pushpin" style={{marginRight:'10'}}></span>
                          Status: <b>Draft </b>
                          <button type="button" className="btn btn-flat btn-xs btn-default" id="showStat"> Edit </button></p>
                          <s><div className="form-group">
                                <form className="form-inline">
                                  <select style={{marginRight: 10, height: 30}}>
                                    <option>Draft</option>
                                    <option>Pending Review</option>
                                  </select>
                                  <button type="button" className="btn btn-flat btn-xs btn-primary" style={{marginRight: 10}}>OK</button>
                                  <button type="button" className="btn btn-flat btn-xs btn-default" id="hideStat">Cancel</button>
                                </form>
                              </div>
                          </s>
                        </div>
                        <div className="form-group">
                          <p style={{fontSize: 14}}><span className="glyphicon glyphicon-sunglasses" style={{marginRight:'10'}}></span>Visibility: <b>Public </b>
                          <button type="button" className="btn btn-flat btn-xs btn-default" id="showVis"> Edit </button></p>
                          <v><div>
                            <div className="radio">
                              <label>
                                <input type="radio" name="optionsRadios" id="optionsRadios1" value="option1" checked/>
                                Public
                              </label>
                            </div>
                            <div className="radio">
                              <label>
                                <input type="radio" name="optionsRadios" id="optionsRadios2" value="option2"/>
                                Password Protected
                              </label>
                            </div>
                            <div className="radio disabled">
                              <label>
                                <input type="radio" name="optionsRadios" id="optionsRadios3" value="option3"/>
                                Private
                              </label>
                            </div>
                            <form className="form-inline" style={{marginTop: 10}}>
                              <button type="button" className="btn btn-flat btn-xs btn-primary" style={{marginRight: 10}}>OK</button>
                              <button type="button" className="btn btn-flat btn-xs btn-default" id="hideVis">Cancel</button>
                            </form>
                            </div>
                          </v>
                        </div>
                        <div className="form-group">
                          <p><span className="glyphicon glyphicon-calendar" style={{marginRight: 10}}></span>Publish <b>Immediately </b>
                          <button type="button" className="btn btn-flat btn-xs btn-default" id="show"> Edit </button></p>

                          <m><div className="form-group">
                              <form className="form-inline">
                                <select className="form-control btn btn-flat btn-xs btn-default" style={{marginRight: 10, height: 20 }}>
                                  <option>Jan</option>
                                  <option>Feb</option>
                                  <option>Mar</option>
                                  <option>Apr</option>
                                  <option>May</option>
                                  <option>June</option>
                                  <option>July</option>
                                  <option>Aug</option>
                                  <option>Sep</option>
                                  <option>Oct</option>
                                  <option>Nov</option>
                                  <option>Des</option>
                                </select>
                                <input className="form-control btn btn-flat btn-xs btn-default" type="text" placeholder="day" style={{width: 50, height: 20}}/>,
                                <input className="form-control btn btn-flat btn-xs btn-default" type="text" placeholder="year" style={{marginLeft: 10, marginRight:5, width: 50, height: 20}}/>@
                                <input className="form-control btn btn-flat btn-xs btn-default" type="text" placeholder="hour" style={{marginLeft: 5,  width: 35, height: 20}}/> : 
                                <input className="form-control btn btn-flat btn-xs btn-default" type="text" placeholder="min" style={{width: 35, height: 20 }}/>
                              </form>
                                <form className="form-inline" style={{marginTop: 10}}>
                                  <button type="button" className="btn btn-flat btn-xs btn-primary" style={{marginRight: 10}}> OK </button>
                                </form>
                                <button type="button" style={{marginTop: 10}} className="btn btn-flat btn-xs btn-default" id="hide">Cancel</button>
                              </div></m>
                      </div> 
                    </div>
                    <div className="box-footer">
                      <div className="form-group pull-right">
                        <button type="button" className="btn btn-default btn-flat disabled" >Preview</button> 
                          <div className="btn-group">
                            <button type="submit" id="publishBtn" className="btn btn-primary btn-flat">{this.state.mode==="update"?"Save":"Publish"}</button>
                            <button type="button" className="btn btn-primary btn-flat dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                              <span className="caret"></span>
                              <span className="sr-only">Toggle Dropdown</span>
                            </button>
                            <ul className="dropdown-menu" role="menu">
                              <li><a href="#">Save as draft</a></li>
                            </ul>
                          </div>
                          <p>{this.state.loadingMsg}</p>
                      </div>        
                    </div>
                  </div>
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
                        <select>
                          <option>No Parent</option>
                          <option>Home</option>
                          <option>Category</option>
                        </select>
                        <p><b>Order</b></p>
                        <input type="text" placeholder="0" style={{width:40}}/>
                      </div>
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
  return newPage;

}
});

export default NewPost;