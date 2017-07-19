import React from 'react';
import Query from '../admin/query';
import {riques, errorCallback} from '../utils';

const ChildMenuComponent = (props) => {
    var childMenuItem=  props.child.map((item, index) => (
        <a className="dropdown-item" href={item.target} key={index.toString()}>{item.title}</a>
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
        return <li className="dropdown" key={props.parentIndex}>
                <a className="dropdown-toggle" data-toggle="dropdown"  href={item.target}>{item.title}</a>
                <ChildMenuComponent child={item.children} />
                </li>

    } else {
        return <li key={props.parentIndex}><a href={item.target}>{item.title}</a></li>
    }
}

const MenuComponent = (props) => {
    var menuItems = props.menuItems.map((parentItem, parentIndex)=>(
        <ParentMenuComponent menuItem={parentItem} parentIndex={parentIndex} key={parentIndex.toString()}/>
    ))
    
    return <ul className="cl-effect-16">
        <li><a className="active" href="#" onClick={props.goHome}>Home</a></li>
        <li><a href="blogs">Blogs</a></li>
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
        return <MenuComponent goHome={this.props.goHome} menuItems={this.state.menuItems}/>
    }

});

