import React from 'react';
import {Link} from 'react-router';

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
        <div className="dropdown-item"  key={index.toString()}>
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
        return <li className="dropdown"  key={props.parentIndex}>
            <Link to={"/post/"+item.target}>{item.title}</Link>
            <ChildMenuComponent  child={item.children} />
            </li>

    } else {

        return <li key={props.parentIndex}>
            <LinkMenu item={item} />
            </li>
    }
}

const MenuComponent = (props) => {
    var menuItems = props.menuItems.map((parentItem, parentIndex)=>(
        <ParentMenuComponent  menuItem={parentItem} parentIndex={parentIndex} key={parentIndex.toString()}/>
    ))
    
    return <ul className="cl-effect-16">
        { menuItems }
    </ul>
}

export class Menu extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            loadDone: false,
            menuItems: [],
        }
    }


    render (){
        return <MenuComponent goHome={this.props.goHome} menuItems={this.props.menuItems} />
    }

}

