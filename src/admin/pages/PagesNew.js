import React from 'react';
import CKEDITOR from 'ckeditor';

var NewPage = React.createClass({
	componenDidMount: function(){
		const script = document.createElement("script");

        script.src = "https://cdn.ckeditor.com/4.5.7/standard/ckeditor.js";
        script.async = true;

        document.body.appendChild(script);

		CKEDITOR.replace('editor1');
	},
	
	render: function(){
		return (
			<div className="content-wrapper">
			<div className="container-fluid">
				<div className="col-md-8">
				<section className="content-header">
			      <h1>
			        Add New Page
			      </h1>
			      <ol className="breadcrumb">
			        <li><a href="#"><i className="fa fa-dashboard"></i> Home</a></li>
			        <li>Pages</li>
			        <li className="active">Add New</li>
			      </ol>
			      <input style={{marginTop:'40'}} type="text" className="form-control" placeholder="Input Title Here"/>
			    </section>
			    <section className="content">
              		<form>
                    	<textarea id="editor1" name="editor1" rows="15" cols="107">
                            This is my textarea to be replaced with CKEditor.
                    	</textarea>
              		</form>		       					
			    </section>
			    </div>
			    <div className="col-md-4">
			    <section className="content">
			    	<div className="row">
        				<div className="col-md-12">
        					<div className="pull-right box-tools">
        					<div className="btn-group">
  								<button type="button" className="btn btn-default">Options</button>
  								<button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    								<span className="caret"></span>
    								<span className="sr-only">Toggle Dropdown</span>
  								</button>
  								<ul className="dropdown-menu">
  									<li><a href="#">Action</a></li>
    								<li><a href="#">Another action</a></li>
    								<li><a href="#">Something else here</a></li>
    								<li role="separator" className="divider"></li>
    								<li><a href="#">Separated link</a></li>
  								</ul>
							</div>
							<div className="btn-group" style={{marginLeft: '20'}}>
  								<button type="button" className="btn btn-default">Help</button>
  								<button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    								<span className="caret"></span>
    								<span className="sr-only">Toggle Dropdown</span>
  								</button>
  								<ul className="dropdown-menu">
  									<li><a href="#">Action</a></li>
    								<li><a href="#">Another action</a></li>
    								<li><a href="#">Something else here</a></li>
    								<li role="separator" className="divider"></li>
    								<li><a href="#">Separated link</a></li>
  								</ul>
							</div>
							</div>
        					<div className="box box-info" style={{marginTop:'70'}}>
            					<div className="box-header">
              						<h3 className="box-title">Publish
              						</h3>
              						<div className="pull-right box-tools">
                						<button type="button" data-widget="collapse" data-toggle="tooltip" title="Collapse">
                  						<i className="fa fa-minus"></i></button>
                						
              						</div>
            					</div>
            					<div className="box-body pad">
            						<form>
  										<div className="form-group">
    										<button type="submit" className="btn btn-default">Save Draft</button>
    										<button type="submit" className="btn btn-default" style={{marginLeft:'115'}}>Preview</button>
  										</div>
  									</form>
  									<form className="form-inline">
  										<div className="form-group">
    										<p style={{fontSize: '14'}}><span className="glyphicon glyphicon-pushpin" style={{marginRight:'10'}}></span>Status: <b>Draft </b><a href="#"><u>edit</u></a></p>
    										<p style={{fontSize: '14'}}><span className="glyphicon glyphicon-sunglasses" style={{marginRight:'10'}}></span>Visibility: <b>Public </b><a href="#"><u>edit</u></a></p>
    										<p style={{fontSize: '14'}}><span className="glyphicon glyphicon-calendar" style={{marginRight:'10'}}></span>Publish <b>immediately </b><a href="#"><u>edit</u></a></p>
  										</div>
  									</form>
  									<div className="box-footer">
  									<div className="pull-right box-tools">
              								<button className="btn btn-primary" href="#">Publish</button>
              						</div>
              						</div>         						
            					</div>
          					</div>
          					<div className="box box-info">
            					<div className="box-header">
              						<h3 className="box-title">Page Attributes
              						</h3>
              						<div className="pull-right box-tools">
                						<button type="button" data-widget="collapse" data-toggle="tooltip" title="Collapse">
                  						<i className="fa fa-minus"></i></button>
                						
              						</div>
            					</div>
            					<div className="box-body pad">
            						<form>
  										<div className="form-group">
    										<label>Parent</label>
    									</div>
  										<select>
  											<option value>(no parent)</option>
  											<option value="">Tentang</option>
  										</select>
  										<div className="form-group" style={{marginTop:'20'}}>
    										<label>Order</label>
    									</div>
  										<input type="text" placeholder="0" style={{width:'50'}} />
  										<hr/>
  										<p>Need help? Use the Help tab above the screen title.</p>	
  									</form>      						
            					</div>
          					</div>
          					<div className="box box-info">
            					<div className="box-header">
              						<h3 className="box-title">Featured Image
              						</h3>
              						<div className="pull-right box-tools">
                						<button type="button" data-widget="collapse" data-toggle="tooltip" title="Collapse">
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
			    </section>
			    </div>
			</div>
		    </div>
		)
	}
});

export default NewPage;