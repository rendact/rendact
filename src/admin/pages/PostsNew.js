import React from 'react';
import $ from 'jquery';
window.jQuery = $;
//window.CKEDITOR_BASEPATH = '/ckeditor/';
//require('ckeditor');

var NewPost = React.createClass({
  componentDidMount: function(){
    $.getScript("https://cdn.ckeditor.com/4.6.2/standard/ckeditor.js", function(data, status, xhr){
      window.CKEDITOR.replace('editor1', {
        height: 400
      });
    });

    $(document).ready(function(){
      $("#hide").click(function(){
          $("j").hide(1000);
      });
      $("#show").click(function(){
          $("j").show(1000);
      });
    });
  },
  
  render: function(){
    return (
    <div className="content-wrapper">
      <div className="container-fluid">
          <section className="content-header"  style={{marginBottom:20}}>
            <h1>
              Add New Post
            </h1>
            <ol className="breadcrumb">
              <li><a href="#"><i className="fa fa-dashboard"></i> Home</a></li>
              <li>Posts</li>
              <li className="active">Add New</li>
            </ol>
          </section>
            <div className="col-md-8">

              <div className="form-group"  style={{marginBottom:30}}>
                <input style={{marginBottom:10}} type="text" className="form-control" placeholder="Input title here"/>
                <p>Permalink : <a href="#">https://ussunnah.org/title </a> <button className="btn btn-default btn-sm btn-flat">Edit</button></p>
                <form>
                  <textarea id="editor1" name="editor1" rows="25" style={{width: "100%"}} wrap="hard">
                    This is my textarea to be replaced with CKEditor.
                  </textarea>
                </form> 
              </div>
              <div className="form-group">
                <div className="box box-info">
                    <div className="box-header with-border">
                      <h3 className="box-title">Summary</h3>
                      <div className="pull-right box-tools">
                      <button type="button" data-widget="collapse" data-toggle="tooltip" title="Collapse" className="btn btn-box-tool">
                      <i className="fa fa-minus"></i></button>
                    </div>
                    </div>
                    <div className="box-body pad">
                     <textarea className="form-control" id="editor1" name="editor1" wrap="hard" rows="3" style={{width: '100%'}}>
                     </textarea>
                     <p className="help-block">Summaries of your content that sometimes will show up in your homepages or contents list</p>
                    </div>
                  </div>
              </div>

              <div className="form-group">
                <div className="box box-info">
                    <div className="box-header with-border">
                      <h4 className="box-title"><b>SmartCrawl</b></h4>
                      <div className="pull-right box-tools">
                      <button type="button" data-widget="collapse" data-toggle="tooltip" title="Collapse" className="btn btn-box-tool">
                      <i className="fa fa-minus"></i></button>
                    </div>
                    </div>
                    <div className="box-body pad">
                      <div className="row">
                        <div className="form-group">
                          <div className="col-md-3">
                            <p className="" style={{marginTop:35}}>Preview :</p>
                          </div>
                          <div className="col-md-9">
                            <p><h4><a href="#">temp title</a></h4></p>
                            <p>.......</p>
                            <p><h5><a href="#">https://ussunnah.org/temp-title/</a><a href="#">-Cached</a><a href="#">Similar</a></h5></p>
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="col-md-3">
                            <p style={{marginTop:15}}>Title Tag :</p>
                          </div>
                          <div className="col-md-9">
                            <input className="form-control" placeholder="query"></input>
                            <p><h5>Up to 65 characters recomended</h5></p>
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="col-md-3">
                            <p style={{marginTop:55}}>Meta Description :</p>
                          </div>
                          <div className="col-md-9">
                            <p><h5>65 characters left</h5></p>
                            <textarea className="form-control" placeholder="Text"  rows="2"></textarea>
                            <p><h5>160 characters minimum</h5></p>
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="col-md-3">
                            <p style={{marginTop:42}}>Meta Keywords :</p>
                          </div>
                          <div className="col-md-9">
                            <p><h5>160 characters left</h5></p>
                            <input className="form-control" placeholder="query"></input>
                            <div><h5>I want to use post tags in addition to my keywords</h5><input type="checkbox"></input></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
              </div>
            </div>
         
            <div className="col-md-4">
              <div className="row">
                <div className="col-md-12">
                  <div className="box box-info" >
                      <div className="box-header with-border">
                          <h3 className="box-title">Publish</h3>
                          <div className="pull-right box-tools">
                            <button type="button" data-widget="collapse" data-toggle="tooltip" title="Collapse" className="btn btn-box-tool ">
                              <i className="fa fa-minus"></i></button>
                          </div>
                      </div>
                      <div className="box-body pad">
                        
                        <div className="form-group">
                          <p style={{fontSize: 14}}><span className="glyphicon glyphicon-pushpin" style={{marginRight:'10'}}></span>Status: <b>Draft </b><a href="#"><u>edit</u></a></p>
                        </div>
                        <div className="form-group">
                          <p style={{fontSize: 14}}><span className="glyphicon glyphicon-sunglasses" style={{marginRight:'10'}}></span>Visibility: <b>Public </b><a href="#"><u>edit</u></a></p>
                        </div>
                        <div className="form-group">
                          <p style={{fontSize: 14}}><span className="glyphicon glyphicon-calendar" style={{marginRight:'10'}}></span>Publish <b>immediately </b><button id="show">Show</button></p>
                <j>If you click on the "Hide" button, I will disappear.
                <button id="hide">Hide</button></j>
                        </div>

                      </div>
                      <div className="box-footer">
                          <div className="form-group pull-right">
                            <button type="submit" className="btn btn-default btn-flat disabled" >Preview</button> 
                            <div className="btn-group">
                              <button type="button" className="btn btn-primary btn-flat disabled">Publish</button>
                              <button type="button" className="btn btn-primary btn-flat disabled dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                                <span className="caret"></span>
                                <span className="sr-only">Toggle Dropdown</span>
                              </button>
                              <ul className="dropdown-menu" role="menu">
                                <li><a href="#">Publish</a></li>
                                <li><a href="#">Save as draft</a></li>
                              </ul>
                            </div>
                          </div>
                      </div>                    
                  </div>

                <div className="box box-info">
                  <div className="box-header with-border">
                    <h3 className="box-title">Categories</h3>
                    <div className="pull-right box-tools">
                      <button type="button" data-widget="collapse" data-toggle="tooltip" title="Collapse" className="btn btn-box-tool">
                      <i className="fa fa-minus"></i></button>
                    </div>
                  </div>
                  <div className="box-body pad">
                    <div className="nav-tabs-custom">
                      <ul className="nav nav-tabs">
                        <li className="active"><a href="#tab_1" data-toggle="tab" aria-expanded="true">All categories</a></li>
                        <li className=""><a href="#tab_2" data-toggle="tab" aria-expanded="false">Most used</a></li>
                      </ul>
                      <div className="tab-content">
                        <div className="tab-pane active" id="tab_1">
                          <div className="form-group">
                            <div className="checkbox">
                              <label>
                                <input type="checkbox" /> Breaking News
                              </label>
                            </div>
                            <div className="checkbox">
                              <label>
                                <input type="checkbox" /> Entertainment
                              </label>
                            </div>
                            <div className="checkbox">
                              <label>
                                <input type="checkbox" /> Science
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="tab-pane" id="tab_2">
                          <div className="form-group">
                            <div className="checkbox">
                              <label>
                                <input type="checkbox" /> Breaking News
                              </label>
                            </div>
                            <div className="checkbox">
                              <label>
                                <input type="checkbox" /> Entertainment
                              </label>
                            </div>
                            <div className="checkbox">
                              <label>
                                <input type="checkbox" /> Science
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="box-footer">
                    <p>
                      <a href="#"><b>+ Add New Category </b></a>
                    </p> 
                  </div>
                </div>

                 <div className="box box-info">
                  <div className="box-header with-border">
                    <h3 className="box-title">Tags</h3>
                    <div className="pull-right box-tools">
                      <button type="button" data-widget="collapse" data-toggle="tooltip" title="Collapse" className="btn btn-box-tool">
                      <i className="fa fa-minus"></i></button>
                    </div>
                  </div>
                  <div className="box-body pad">
                    <form>
                      <form action="#" method="post" style={{marginBottom:10}}>
                              <div className="input-group">
                                <input type="text" name="message" placeholder="Type Message ..." className="form-control" />
                                  <span className="input-group-btn">
                                    <button type="submit" className="btn btn-primary btn-flat disabled">Send</button>
                                  </span>
                              </div>
                        </form> 
                        <p style={{marginBottom:10}}>
                          <i>Separate tags with commas</i> 
                        </p>    
                    </form>                 
                  </div>
                  <div className="box-footer">
                    <p>
                      <a href="#"><b>Choose from the most used tags</b></a>
                    </p> 
                  </div>
                </div>
                <div className="box box-info">
                    <div className="box-header with-border">
                      <h3 className="box-title">Featured Image</h3>
                      <div className="pull-right box-tools">
                        <button type="button" data-widget="collapse" data-toggle="tooltip" title="Collapse" className="btn btn-box-tool">
                        <i className="fa fa-minus"></i></button>
                      </div>
                    </div>
                    <div className="box-body pad">
                      <form>
                        <div className="form-group">
                          <input type="file" />
                        </div>
                      </form>                 
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

export default NewPost;