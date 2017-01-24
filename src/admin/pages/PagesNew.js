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

var NewPost = React.createClass({
  componentDidMount: function(){
    $.getScript("https://cdn.ckeditor.com/4.6.2/standard/ckeditor.js", function(data, status, xhr){
      window.CKEDITOR.replace('editor1', {
        height: 400
      });
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
        <div className="container-fluid">
          <section className="content-header"  style={{marginBottom:20}}>
              <h1>Add New Page</h1>
                <ol className="breadcrumb">
                  <li><a href="#"><i className="fa fa-dashboard"></i> Home</a></li>
                  <li>Pages</li>
                  <li className="active">Add New</li>
                </ol>
          </section>
          <div className="col-md-8">
            <div className="form-group"  style={{marginBottom:30}}>
              <form>
                <input style={{marginBottom: 20}} type="text" className="form-control" placeholder="Input Title Here"/>
                  <form className="form-inline">
                    <p>Permalink: <a>https://ussunnah.org/title</a>
                    <button className="btn btn-default" style={{height:25, marginLeft: 5, padding: "2px 5px"}}>
                      <span style={{fontSize: 12}}>Edit</span>
                    </button></p>
                  </form>
                  <textarea id="editor1" name="editor1" rows="25" style={{width: "100%"}} wrap="hard"></textarea>
              </form>
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
                <form className="form-horizonral">
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
                      <input type="text" style={{width: '100%'}}/>
                        <span className="help-block">Up to 65 characters recommended</span>
                        <span className="help-block">65 characters left</span>                     
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="col-md-4"><p>Meta Description</p></div>
                    <div className="col-md-8">
                      <textarea rows='2' style={{width:'100%'}}></textarea>
                      <span className="help-block">160 characters maximum</span>
                      <span className="help-block">160 characters left</span>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="col-md-4"><p>Meta Keywords</p></div>
                    <div className="col-md-8">
                      <div className="form-group">
                        <input type="text" style={{width: '100%'}}/>
                        <input type="checkbox"/> I want to use post tags in addition to my keywords
                        <span className="help-block"><b>News keywords </b><a>(?)</a></span>
                      </div>
                    </div>
                  </div>
                </form> 
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
                  <div className="box box-info" style={{marginTop:20}}>
                    <div className="box-header with-border">
                      <h3 className="box-title">Publish</h3>         
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
                    <div className="box-header with-border">
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

              </div>
            </div>
          </div>
        
        </div>
      </div>
  )
}
});

export default NewPost;