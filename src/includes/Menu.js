import React from 'react';
import {Link} from 'react-router';

const LinkMenu = (props) => {
    var item = props.item
    if (item.type === "url") {
      return <a href={item.url} target="_blank">{item.title}</a>
    } else {
      return <Link to={ "/" + item.type + "/" + item.target }>{item.title}</Link>
    }

}


export class Menu extends React.Component{
  render (){

    var dropdownStyle = {
        backgroundColor: '#333',
        borderColor: ''
    }

    return <ul className="cl-effec-16">
      {this.props.menuItems && this.props.menuItems.map((item, index) => {
        if (item.children[0]) {
          return (
            <li key={index} className="dropdown">
              <LinkMenu item={item} />
              <div className="dropdown-menu" aria-labelledby="dropdown-menu-link" style={dropdownStyle}>
              {item.children.map((child, index) => {
                return(
                <div className="dropdown-item" key={index}>
                  <LinkMenu item={child}/>
                </div>
                )
              })
              }
            </div>

            </li>
          )
        } else {
          return (
          <li key={index}>
            <LinkMenu item={item} />
          </li>
          )
        }
        })
      }
    </ul>

    }

}

