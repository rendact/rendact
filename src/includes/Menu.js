import React from 'react';
import {Link} from 'react-router';
import Query from '../admin/query';
import {riques, errorCallback} from '../utils';

const LinkMenu = (props) => {
    var item = props.item
    if (item.type === "url") {
        return <a href={item.target}>{item.title}</a>
    } else {
        return <Link to={"/post/"+item.target}>{item.title}</Link>
    }
    console.log(item)
    return null

}

const ChildMenuComponent = (props) => {
    var childMenuItem=  props.child.map((item, index) => (
            <Link to={"/post/"+item.target} key={index.toString()}>{item.title}</Link>
    ))
    var dropdownStyle = {
        backgroundColor: '#333',
        borderColor: ''
    }

    return <div className="dropdown-menu" aria-labelledby="dropdown-menu-link" style={dropdownStyle}>
            {childMenuItem}
            </div>

}

const ParentMenuComponent = (props) => {
    var item = props.menuItem;

    if (item.children) {
        /*
        return <li className="dropdown" key={props.parentIndex}>
                <a className="dropdown-toggle" onClick={props.onClick} href="#">{item.title}</a>
                <ChildMenuComponent onClick={props.onClick} child={item.children} />
                </li>
        */
        return <li className="dropdown" key={props.parentIndex}>
            <Link to={"/post/"+item.target}>{item.title}</Link>
            <ChildMenuComponent onClick={props.onClick} child={item.children} />
            </li>

    } else {
        /*
        console.log(item);
        return <li key={props.parentindex}><a onClick={props.onClick} target={item.target} href={item.target}>{item.title}</a></li>
        */

        return <li key={props.parentIndex}>
            <LinkMenu item={item} />
            </li>
    }
}

const MenuComponent = (props) => {
    var menuItems = props.menuItems.map((parentItem, parentIndex)=>(
        <ParentMenuComponent onClick={props.onClick} menuItem={parentItem} parentIndex={parentIndex} key={parentIndex.toString()}/>
    ))
    
    return <ul className="cl-effect-16">
        <li><a className="active" href="#" onClick={props.goHome}>Home</a></li>
        { menuItems }
    </ul>
}

export const Menu = React.createClass({
    getInitialState : function(){
        return {
            loadDone: false,
            menuItems: [],
        }
    },

	handlePostClick: function(e){
		e.preventDefault();
		var target = e.currentTarget.target;
        console.log(window.history);
        console.log(this.context.router)
        window.history.pushState("", "", "/"+target);
//		this._reactInternalInstance._context.history.push("/hello")
	},

    componentWillMount : function(){
        var me = this;

        riques(Query.getMenuQry('TWVudToxMzA='),
            (error, response, body) => {
                if (!error & !body.errors && response.statusCode === 200){
                    var menuItems = body.data.getMenu.items;
                    me.setState({menuItems: menuItems});
                } else {
                    errorCallback(error, body.errors?body.errors[0].message:null);
                }
                me.setState({loadDone: true});
            }
        );
/*
        riques(Query.updateMenu('TWVudToxMzA=', 'Demo', [
            {title: "Post", type: "post", target:"UG9zdDoxNDE=", children:[
                {title: "Page", type: "page", target:"UG9zdDoxNDI="},
                {title: "Page", type: "page", target:"UG9zdDoxNDI="},
                {title: "Page", type: "page", target:"UG9zdDoxNDI="},
                {title: "Page", type: "page", target:"UG9zdDoxNDI="}
            ]},
            {title: "Page", type: "page", target:"UG9zdDoxNDI="},
            {title: "Category", type: "category", target:"Q2F0ZWdvcnk6NA=="},
            {title: "Google.com", type: "url", target:"https://google.com"}
        ]),
        (error, response, body) => {
            console.log(body.data);
        }
        );
                */
    },

    render : function(){
        return <MenuComponent goHome={this.props.goHome} menuItems={this.state.menuItems} onClick={this.handlePostClick}/>
    }

});

