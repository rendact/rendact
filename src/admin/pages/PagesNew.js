import React from 'react';
import $ from 'jquery';
window.jQuery = $;
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
          <button className="btn btn-default" style={{marginRight: 10}}>OK</button>
          <a><u>Cancel</u></a>
        </form>
      </div>
      )
  }
});

var NewPage = React.createClass({
  componentDidMount: function(){
    $.getScript("https://cdn.ckeditor.com/4.6.2/standard/ckeditor.js", function(data, status, xhr){
      window.CKEDITOR.replace('editor1');
    });
  },

  getInitialState : function() {
      return this.state = {inputList: []};
        this.onAddBtnClick = this.onAddBtnClick.bind(this);
    },

  onAddBtnClick: function(event) {
        const inputList = this.state.inputList;
        inputList.length = 1;
        this.setState({
            inputList: inputList.concat(<Input key={inputList.length} />)
        });
    },

  render: function(){
    return (
      <div className="content-wrapper">
        <section className="content-header">
          <h1>
            Add New Page
          </h1>
          <ol className="breadcrumb">
            <li><a href="#"><i className="fa fa-dashboard"></i> Home</a></li>
            <li>Pages</li>
            <li className="active">Add New</li>
          </ol>
        </section>
        <section className="content">
        <div className="row">
            <div className="col-md-8 col-sm-6 col-xs-12">
              <form>
                <input style={{marginTop: 20, marginBottom: 20}} type="text" className="form-control" placeholder="Input Title Here"/>
                <div>
                <form className="form-inline">
                  <p><b>Permalink: </b><a>https:"//ussunnah.org/title"</a></p>
                  <button className="btn btn-default" style={{marginBottom:10}}>Edit</button>
                </form>
                </div>
                <textarea id="editor1" name="editor1" style={{width: '100%'}} wrap="hard">
                </textarea>
              </form>
              <div className="box box-info" style={{marginTop:20}}>
                <div className="box-header">
                  <h3 className="box-title">Smart Crawl</h3>         
                  <div className="pull-right box-tools">
                    <button type="button" className="btn btn-box-tool" data-widget="collapse" data-toggle="tooltip" title="Collapse">
                    <i className="fa fa-minus"></i></button>
                  </div>
                </div>
                <div className="box-body pad">
                <form className="form-inline">
                    <div className="col-md-4">
                    <label></label>
                    </div>
                    <div className="col-md-8">
                    <a><b><u>temp title</u></b></a>
                    </div>
                </form>
                <form className="form-inline">
                    <div className="col-md-4">
                    <p>Preview:</p>
                    </div>
                    <div className="col-md-8">
                      <div className="form-group">
                        <p>aaaaaaaaaaaaaaaaaaaaaa</p>
                        <span className="help-block"><a style={{color: 'green'}}>https://ussunah.org/temp-title/</a> - <a>Cache</a> - <a>Similar</a></span>
                      </div>
                    </div>
                </form>
                <form className="form-inline">
                    <div className="col-md-4">
                    <p>Title Tag</p>
                    </div>
                    <div className="col-md-8">
                        <input type="text" style={{width: '100%'}}/>
                        <span className="help-block">Up to 65 characters recommended</span>
                        <span className="help-block">65 characters left</span>                     
                    </div>
                </form>
                <form className="form-inline">
                    <div className="col-md-4">
                    <p>Meta Description</p>
                    </div>
                    <div className="col-md-8">
                        <textarea rows='2' style={{width:'100%'}}></textarea>
                        <span className="help-block">160 characters maximum</span>
                        <span className="help-block">160 characters left</span>
                    </div>
                </form>
                <form className="form-inline">
                    <div className="col-md-4">
                    <p>Meta Keywords</p>
                    </div>
                    <div className="col-md-8">
                      <div className="form-group">
                        <input type="text" style={{width: '100%'}}/>
                        <input type="checkbox"/> I want to use post tags in addition to my keywords
                        <span className="help-block"><b>News keywords </b><a>(?)</a></span>
                      </div>
                    </div>
                </form> 
                </div>
              </div> 
              <div className="box box-info" style={{marginTop:20}}>
                <div className="box-header">
                  <h3 className="box-title">Summary</h3>         
                  <div className="pull-right box-tools">
                    <button type="button" className="btn btn-box-tool" data-widget="collapse" data-toggle="tooltip" title="Collapse">
                    <i className="fa fa-minus"></i></button>
                  </div>
                </div>
                <div className="box-body pad">
                <textarea id="editor2" name="editor2" wrap="hard" rows="10" style={{width: '100%'}}>
                </textarea>                 
                </div>
              </div>                  
            </div>
            <div className="col-md-4 col-sm-6 col-xs-12">
              <div className="row">
                <div className="col-md-12">  
                  <div className="box box-info" style={{marginTop:20}}>
                    <div className="box-header">
                      <h3 className="box-title">Publish</h3>         
                      <div className="pull-right box-tools">
                        <button type="button" className="btn btn-box-tool" data-widget="collapse" title="Collapse">
                        <i className="fa fa-minus"></i></button>
                      </div>
                    </div>
                    <div className="box-body pad">
                      <form>
                      <div className="form-group">
                        <button className="btn btn-default">Save Draft</button>
                        <div className="pull-right box-tools">
                        <button className="btn btn-default">Preview</button>
                        </div>
                      </div>
                      </form>
                      <form className="form-inline">
                      <div className="form-group">
                        <p><span className="glyphicon glyphicon-pencil" style={{marginRight: 10}}></span>Status: <b>Draft </b><a><u>Edit</u></a></p>
                        <p><span className="glyphicon glyphicon-sunglasses" style={{marginRight: 10}}></span>Visibility: <b>Public </b><a><u>Edit</u></a></p>
                        <p><span className="glyphicon glyphicon-calendar" style={{marginRight: 10}}></span>Publish <b>Immediately </b><a onClick={this.onAddBtnClick}><u>Edit</u></a>{this.state.inputList.map(function(input, index) {
  return input;
})}</p>
                      </div>
                      </form>                  
                    </div>
                    <div className="box-footer">        
                      <button type="submit" className="btn btn-default">Clear Cache</button>
                      <div className="form-group" style={{marginTop: 10}}>
                        <a style={{color: 'red'}}><u>Move To Trash</u></a>
                        <div className="pull-right box-tools">
                        <button type="submit" className="btn btn-primary">Publish</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="box box-info" style={{marginTop:20}}>
                    <div className="box-header">
                      <h3 className="box-title">Page Attributes</h3>         
                      <div className="pull-right box-tools">
                        <button type="button" className="btn btn-box-tool" data-widget="collapse" title="Collapse">
                        <i className="fa fa-minus"></i></button>
                      </div>
                    </div>
                    <div className="box-body pad">
                      <form>
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
                      </form>                  
                    </div>
                  </div>
                  <div className="box box-info" style={{marginTop:20}}>
                    <div className="box-header">
                      <h3 className="box-title">Cache Options</h3>         
                      <div className="pull-right box-tools">
                        <button type="button" className="btn btn-box-tool" data-widget="collapse" title="Collapse">
                        <i className="fa fa-minus"></i></button>
                      </div>
                    </div>
                    <div className="box-body pad">
                    <input type="checkbox" style={{width:15, height:15, background: '#fcfff4'}}/> Never cache this page
                    <hr/>
                      <form>
                      <div className="form-group">
                        <p>Activate these options on this post:</p>
                        <div>
                        <input type="checkbox" style={{width:15, height:15, background: '#fcfff4'}}/> Images LazyLoad
                        </div>
                        <div>
                        <input type="checkbox" style={{width:15, height:15, background: '#fcfff4'}}/> iFrames & Videos LazyLoad
                        </div>
                        <div>
                        <input type="checkbox" style={{width:15, height:15, background: '#fcfff4'}}/> HTML Minification
                        </div>
                        <div>
                        <input type="checkbox" style={{width:15, height:15, background: '#fcfff4'}}/> JS Minification
                        </div>
                        <div>
                        <input type="checkbox" style={{width:15, height:15, background: '#fcfff4'}} disabled/> CDN
                        </div>
                        <p><b><i>Note: These options are not applied if you added this post in the "Never change the following pages" option</i></b></p>
                      </div>
                      </form>                  
                    </div>
                  </div>
                  <div className="box box-info" style={{marginTop:20}}>
                    <div className="box-header">
                      <h3 className="box-title">Tags</h3>         
                      <div className="pull-right box-tools">
                        <button type="button" className="btn btn-box-tool" data-widget="collapse" title="Collapse">
                        <i className="fa fa-minus"></i></button>
                      </div>
                    </div>
                    <div className="box-body pad">
                      <form className="form-inline">
                      <div className="form-group">
                        <input type="text" style={{marginRight: 10}}/>
                        <button className="btn btn-default">Add</button>
                      </div>
                      </form>
                      <form>
                      <div className="form-group">
                        <p><i>Separate tags with commas</i></p>
                        <br/>
                        <a><u>Choose from the most used tags</u></a>
                      </div>
                      </form>                   
                    </div>
                  </div>
                  <div className="box box-info">
                    <div className="box-header">
                      <h3 className="box-title">Featured Image</h3>
                      <div className="pull-right box-tools">
                        <button type="button" className="btn btn-box-tool" data-widget="collapse" title="Collapse">
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
        </section>
        
      </div>
    )
  }
});

export default NewPage;