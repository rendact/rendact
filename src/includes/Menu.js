import React from 'react';
import {Link} from 'react-router';
import Query from '../admin/query';
import {riques, errorCallback} from '../utils';

const LinkMenu = (props) => {
    var item = props.item
    if (item.type === "url") {
        return <a href={item.target} target="_blank">{item.title}</a>
    } else {
        if (item.type === "post") {
            return <Link to={"/post/"+item.target}>{item.title}</Link>
        } else if (item.type === "page"){
            return <Link to={"/page/"+item.target}>{item.title}</Link>
        } else if (item.type === "category") {
            return <Link to={"/category/"+item.target}>{item.title}</Link>
        }
    }
    return null

}

const ChildMenuComponent = (props) => {
    var childMenuItem=  props.child.map((item, index) => (
        <div className="dropdown-item"  onClick={props.onClick} key={index.toString()}>
            <LinkMenu item={item}/>
        </div>
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
        return <li className="dropdown" onClick={props.onClick} key={props.parentIndex}>
            <Link to={"/post/"+item.target}>{item.title}</Link>
            <ChildMenuComponent onClick={props.onClick} child={item.children} />
            </li>

    } else {

        return <li key={props.parentIndex}>
            <LinkMenu item={item} onClick={props.onClick}/>
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

    handlePostClick: function(){
        console.log(this.props);
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
    },

    render : function(){
        return <MenuComponent goHome={this.props.goHome} menuItems={this.state.menuItems} onClick={this.props.getPost}/>
    }

});

