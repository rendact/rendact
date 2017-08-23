import React, { Component } from 'react';
require('./menu.css');
import Item from './Item';

function getDepth(item, childrenProperty) {
  // returns depth of item and children
  var depth = 0;

  if (item[childrenProperty]) {
    item[childrenProperty].forEach((d) => {
      var tmpDepth = getDepth(d, childrenProperty);
      
      if (tmpDepth > depth) {
        depth = tmpDepth;
      }
    });
  }

  return depth + 1;
}

class Container extends Component {
  render() {
    const {
      items,
      parentPosition,
      childrenProperty,
      childrenClassName,
      childrenStyle,
      topLevel
    } = this.props;

    return (
      <ol style={ topLevel ? {} : childrenStyle } className={topLevel ? '' : childrenClassName}>
        { items.map((item, i) => {
          const position = parentPosition.concat([i]);
          const children = item[childrenProperty];

          return (
            <Item
              id={ item.id }
              key={ item.id }
              item={ item }
              index={ i }
              siblings={ items }
              position={ position }
              depth={ getDepth(item, childrenProperty) }
            >
              { children && children.length
                ? <WrappedContainer 
                    items={ children }
                    parentPosition={ position }
                    childrenProperty={ childrenProperty }
                    childrenStyle={ childrenStyle }
                    childrenClassName={childrenClassName}
                  />
                : null
              }
            </Item>
          );
        }) }
      </ol>
    );
  }
}

var WrappedContainer = Container;

export default WrappedContainer;
