import React from 'react';
import {Link} from 'react-router';

const LinkMenu = (props) => {
    var item = props.item
    if (item.type === "url") {
      return <a href={item.url} target="_blank">{item.label}</a>
    } else {
      return <Link to={ "/" + item.type + "/" + item.target }>{item.label}</Link>
    }

}

const Item = (props) => {
  return <li className="dropdown" >
    <LinkMenu item={props.item} />
    {props.children}
  </li>
}

class List extends React.Component{
  constructor(props){
    super(props)
    this.list = this.list.bind(this)
  }

  list(data){
    var dropdownStyle = {
        backgroundColor: '#333',
        borderColor: ''
    }
    const children = (items) => {
      if(items && items.length){
        return <ul className="dropdown-menu" style={dropdownStyle}>{ this.list(items) }</ul>
      }
    }

      return data.map((node, index) => {
        return <Item item={node} key={index}>
            { children(node.children) }
        </Item>
      });
  }

  render(){
    return <ul className="cl-effec-16">
      {this.list(this.props.items)}
    </ul>
  }
}
  

export const Menu = ({menuItems}) => (
  <List items={menuItems||[]}/>
)

