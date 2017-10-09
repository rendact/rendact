import React from 'react';
import _ from 'lodash';
import {Menu} from '../Menu.js';
//import Query from '../../admin/query';
import AdminConfig from '../../admin/AdminConfig';
import {Link} from 'react-router'

window.config = AdminConfig;

/* Theme functions */

export class InvalidTheme extends React.Component{
	componentDidMount(){
		require ('../../css/AdminLTE.css');
		require ('../../css/skins/_all-skins.css');	
		require ('font-awesome/css/font-awesome.css');
		require ('../../css/ionicons.min.css');
	}
	render() {
		return (
			<div className="content-wrapper" style={{minHeight: 1126}}>
			    <section className="content-header">
			      <h1>Error Page</h1>
			    </section>

			    <section className="content">
			      <div className="error-page">
			        <div className="error-content">
			          <h3><i className="fa fa-warning text-red"></i> Oops! Something went wrong.</h3>
			          <p>We will work on fixing that right away.</p>
			        </div>
			      </div>
			    </section>
			  </div>
		)
	}
}

export function getTemplateComponent(type){
	var c = window.config.theme;
	
	if (c.name==null || c.path==null) {
		return InvalidTheme;
	}

	try {
		let Component = require('../../theme/'+c.path+'/layouts/Home.js').default;
		if (type==="home") {
			// pass
		} else if (type==="blog") {
			Component = require('../../theme/'+c.path+'/layouts/Blog.js').default;			
		} else if (type==="single") {
			Component = require('../../theme/'+c.path+'/layouts/Single.js').default;			
    } else if (type==="search") {
      Component = require('../../theme/'+c.path+'/layouts/Search.js').default;
    }

		return Component;
	} catch(e) {
		return InvalidTheme;
	}
}

export function theContent(content){
	return <div dangerouslySetInnerHTML={{__html: content}} />
}

export function theTitle(id, title, onClickHandler){
	return <Link to={"/post/"+id} onClick={onClickHandler} id={id}><h4>{title}</h4></Link>
}

export function theExcerpt(content){
	return <div dangerouslySetInnerHTML={{__html: _.truncate(content,{"length": 100})}} />
}

export function theMenu(items, onClickHandler){
  return <Menu menuItems={items&&items.items?items.items:[]} goHome={goHome}/>
}

export function theLogo(onClickHandler){
	return <div className="logo">
		<Link to="/"><h1>Rend<span>act</span></h1></Link>
	</div>
}

export function theImage(image, pageCount, activePage, handlePageClick){
	var fImage="";
	if(image!=null){
 			fImage=image.blobUrl;
 		}
 		else{
 			fImage=require('../../theme/default/images/logo.png');
 		}
	return <a href="article" className="mask"><img src={fImage} alt="" className="img-responsive img-thumbnail" /></a>
}

export function thePagination(pageCount, activePage, handlePageClick){
	let pages = [<li key="998" ><a href="#" onClick={handlePageClick}>«</a></li>];
	for(var i=0;i<pageCount;i++){
		if (activePage===i+1)
			pages.push(<li key={i}><a href="#" onClick={handlePageClick} disabled="true">{i+1}</a></li>)
		else 
			pages.push(<li key={i}><a href="#" onClick={handlePageClick}>{i+1}</a></li>)
	}
	pages.push(<li key="999"><a href="#" onClick={handlePageClick}>»</a></li>);
	return <div className="box-tools">
          <ul className="pagination pagination-sm no-margin">
          {pages}  
          </ul>
        </div>
}

export function theBreadcrumb(onClickHandler){
	return <h2><a href="#" onClick={onClickHandler}><h5>Home </h5></a> / PAGE</h2>
}

export function goHome(e){
	e.preventDefault();
	this._reactInternalInstance._context.history.push('/')
}

export function getWidgets(widgetArea){
	let Widgets = [];

  // add checking if the component has implemented with redux or not
  let listOfWidgets = this.props.listOfWidgets[widgetArea]?this.props.listOfWidgets[widgetArea]:[];
	
	_.map(listOfWidgets,function(item){
		var widgetFn = require("../DefaultWidgets/"+item.filePath).default;
		
		Widgets.push(<div key={item.id} className="sidebar-box">
				<h3><span>{item.title}</span></h3>
					{widgetFn(item.id, item.widget)}
			</div>);
	});
	
	return <div className="widgets">{Widgets}</div>;
}

export const getTemplates = function(){
	var template = [{
			id: "default",
			name: "Default Template"
		}];
	//var c = window.config.theme;
	try {
		//let Component = require('../theme/'+c.path+'/layouts/Template.js').default;
		template = [{
			id: "default",
			name: "Default Template"
		}]
	} catch(e) {
		
	}
	return template;
}

