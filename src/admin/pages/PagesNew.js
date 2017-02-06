import React from 'react';
import request from 'request';
import $ from 'jquery';
window.jQuery = $;

import Admin from '../../admin/pages/PagesNew';
import Config from '../../config';
//window.CKEDITOR_BASEPATH = '/ckeditor/';
//require('ckeditor');

var Input= React.createClass({
  render: function(){
    return (
      <div className="form-group">
      <form className="form-inline">
        <select style={{marginRight: 10, height: 20}}>
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
        <input type="text" placeholder="day" style={{width: 40, height: 20}}/>,
        <input type="text" placeholder="year" style={{marginLeft: 10, marginRight:5, height: 20, width: 40}}/>@
        <input type="text" placeholder="hour" style={{marginLeft: 5, height: 20, width: 30}}/>:
        <input type="text" placeholder="min" style={{width: 30, height: 20}}/>
      </form>
        <form className="form-inline" style={{marginTop: 10}}>
          <button type="button" className="btn btn-default" style={{marginRight: 10}}>OK</button>
          <a><u>Cancel</u></a>
        </form>
      </div>
      )
  }
});

var Perm= React.createClass({
  render: function(){
    return (
      <div className="form-group">
      <form className="form-inline">
        <input type="text"/>
        <button type="button" className="btn btn-default" style={{marginLeft: 10}}>OK</button>
      </form>
      </div>
      )
  }
});

const NewPost = React.createClass({
  componentDidMount: function(){
    $.getScript("https://cdn.ckeditor.com/4.6.2/standard/ckeditor.js", function(data, status, xhr){
      window.CKEDITOR.replace('editor1', {
        height: 400,
        title: false
      });
    });
  },

  getInitialState: function(){
    return {
      inputList: [],
      textList: [],
      btnText: "Publish",
      errorMsg:null,
      slug:"",
      permalinkEditing: false
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
  onAddBtnClick: function(event) {
    const inputList = this.state.inputList;
    inputList.length = 1;
    this.setState({
        inputList: inputList.concat(<Input key={inputList.length} />)
    });
  },

  handleSubmit: function(event) {
    var me = this;
    var title = $("#titlePage").val();
    var content =  window.CKEDITOR.instances['editor1'].getData();
    var titleTag = $("#titleTag").val();
    var metaKeyword = $("#metaKeyword").val();
    var metaDescription = $("#metaDescription").val();
    var summary = $("#editor2").val();
    
    const createPostQry = {
      "query": `
    mutation createPost($input: CreatePostInput!) {
        createPost(input: $input) {
          changedPost {
            title,
            content,
            titleTag
        }
      }
    }
    `,
      "variables": {
        "input": {
          "title": title,
          "content": content,
          "titleTag": titleTag,
          "type": "page",
          "author": localStorage.getItem('userID'),
          "slug": this.state.slug
        }
      }
    };

    request({
      url: Config.scapholdUrl,
      method: "POST",
      json: true,
      headers: {
        "content-type": "application/json",
        "Authorization": "Bearer " + localStorage.token
      },
      body: createPostQry
    }, (error, response, body) => {
      debugger;
      if (!error && !body.errors && response.statusCode === 200) {
        me.setState({btnText: "Save"});
      } else {
        if (body && body.errors) {
          me.setState({errorMsg: body.errors[0].message});
        } else {
          me.setState({errorMsg: error.toString()});
        }
      }
    });
    
    const createPostMetaQry = {
      "query": `
    mutation createPostMeta($input: CreatePostMetaInput!) {
        createPostMeta(input: $input) {
          changedPostMeta {
            metaKeyword,
            metaDescription,
            summary
        }
      }
    }
    `,
      "variables": {
        "input": {
          "metaKeyword": metaKeyword,
          "metaDescription": metaDescription,
          "summary": summary
        }
      }
    };

    request({
      url: Config.scapholdUrl,
      method: "POST",
      json: true,
      headers: {
        "content-type": "application/json",
        "Authorization": "Bearer " + localStorage.token
      },
      body: createPostMetaQry
    }, (error, response, body) => {

      if (!error && !body.errors && response.statusCode === 200) {
        me.setState({btnText: "Save"});
      } else {
        if (body && body.errors) {
          me.setState({errorMsg: body.errors[0].message});
        } else {
          me.setState({errorMsg: error.toString()});
        }
      }
    });

    event.preventDefault();
  },
  componentWillMount: function(){
    if (!this.props.postId) return;

    let list = [];
    let getPageQry = {"query": 
      '{getPost(id:"'+this.props.postId+'"){ id,title,content,slug,author{username},status,comments{edges{node{id}}},createdAt}}'
    };
    var me = this;
    request({
        url: Config.scapholdUrl,
        method: "POST",
        json: true,
        headers: {
          "content-type": "application/json",
          "Authorization": "Bearer " + localStorage.token
        },
        body: getPageQry
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
              <h1>Add New Page</h1>
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
                <h3 className="box-title">Smart Crawl</h3>         
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
                      <p><a href="#">My Title</a></p>
                      <p>Some descriptions...</p>
                      <p><span className="help-block"><a style={{color: 'green'}}>https://ussunah.org/temp-title/</a> - <a>Cache</a> - <a>Similar</a></span></p>
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
                        <input type="checkbox"/> I want to use post tags in addition to my keywords
                        <span className="help-block"><b>News keywords </b><a>(?)</a></span>
                      </div>
                    </div>
                  </div>
                </div> 
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
                      <div>
                      <div className="form-group">
                        <button type="button" className="btn btn-default">Save Draft</button>
                        <div className="pull-right box-tools">
                        <button type="button" className="btn btn-default">Preview</button>
                        </div>
                      </div>
                      </div>
                      <div className="form-inline">
                      <div className="form-group">
                        <p>
                          <span className="glyphicon glyphicon-pencil" style={{marginRight: 10}}></span>
                          Status: <b>Draft </b><a><u>Edit</u></a>
                        </p>
                        <p>
                          <span className="glyphicon glyphicon-sunglasses" style={{marginRight: 10}}></span>
                          Visibility: <b>Public </b><a><u>Edit</u></a>
                          </p>
                        <p>
                          <span className="glyphicon glyphicon-calendar" style={{marginRight: 10}}></span>
                          Publish <b>Immediately </b>
                          <a onClick={this.onAddBtnClick}><u>Edit</u></a>
                          {this.state.inputList.map(function(input, index) {
                            return input;
                          })}
                          </p>
                      </div>
                      </div> 
                    </div>
                    <div className="box-footer">        
                      <button type="button" className="btn btn-default">Clear Cache</button>
                      <div className="form-group" style={{marginTop: 10}}>
                        <a style={{color: 'red'}}><u>Move To Trash</u></a>
                        <div className="pull-right box-tools">
                        <button id="publishBtn" type="submit" className="btn btn-primary">{this.state.btnText}</button>
                        </div>
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