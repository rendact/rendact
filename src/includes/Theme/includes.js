import React from 'react';
import map from 'lodash/map'
import get from 'lodash/get'
import truncate from 'lodash/truncate'
import {Menu} from '../Menu.js';
import AdminConfig from '../../admin/AdminConfig';
import {Link} from 'react-router'
import Loadable from 'react-loadable';
const path = require('path');

const InvalidTheme = Loadable({
  loader: () => import(/* webpackChunkName: "invalidTheme"*/'./InvalidTheme'),
  loading: () => null
})

window.config = AdminConfig;

/* Theme functions */


export function getTemplateComponent(type){
	//var c = window.config.theme;
	var c = JSON.parse(
		JSON.parse(localStorage.getItem("config")).activeTheme
	)
	
  const importing = (name) => (
    `${c.path}/layouts/${name}.js`
  )

  const themeMap = {
    home: importing('Home'),
    blog: importing('Blog'),
    single: importing('Single'),
    search: importing('Search')
  }
	
	if (c.name==null || c.path==null) {
		return InvalidTheme;
	}
  let x = themeMap[type]
  return x ? require("themes/"+x).default : InvalidTheme
}

export function theContent(content){
	return <div dangerouslySetInnerHTML={{__html: content}} />
}

export function theTitle(id, title, onClickHandler){
	return <Link to={"/post/"+id} onClick={onClickHandler} id={id}><h4>{title}</h4></Link>
}

export function theExcerpt(content){
	return <div dangerouslySetInnerHTML={{__html: truncate(content,{"length": 100})}} />
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
	var c = JSON.parse(
		JSON.parse(localStorage.getItem("config")).activeTheme
	)
	if(image!=null){
 			fImage=image.blobUrl;
 		}
 		else{
 			fImage=require('themes/'+c.path+'/images/logo.png');
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

  // add checking if the component has implemented with redux or not
  let listOfWidgets = this.props.listOfWidgets[widgetArea]?this.props.listOfWidgets[widgetArea]:[];
	
	let Widgets = map(listOfWidgets,function(item){
    return import("../DefaultWidgets/"+item.filePath).then(widgetFn => {
		
    return <div key={item.id} className="sidebar-box">
            <h3><span>{item.title}</span></h3>
              {widgetFn.default(item.id, item.widget)}
          </div>
  })
	});

  return Promise.all(Widgets).then(Widgets => <div className="widgets">{Widgets}</div>)
	
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

