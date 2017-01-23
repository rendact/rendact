import React from 'react';
import $ from 'jquery';
window.jQuery = $;
//window.CKEDITOR_BASEPATH = '/ckeditor/';
//require('ckeditor');


var NewPage = React.createClass({
  componentDidMount: function(){
    $.getScript("https://cdn.ckeditor.com/4.6.2/standard/ckeditor.js", function(data, status, xhr){
      window.CKEDITOR.replace('editor1');
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
                <textarea id="editor1" name="editor1" style={{width: '100%'}} wrap="hard">
                </textarea>
              </form>
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
                        <button type="submit" className="btn btn-default">Preview</button>
                        <div className="pull-right box-tools">
                        <button type="submit" className="btn btn-primary">Publish</button>
                        </div>
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