import React, { Component, PropTypes } from 'react';
import { DragSource } from 'react-dnd';
import _ from 'lodash';

export const ItemView = ({cid, item, type, isDragging}) => (
  <div className="ui item" style={{
    opacity: isDragging ? 0.5: 1,
    cursor:'move',
    width: '32px',
    height: '64px'
  }}>
    <div className="image">
      <i className={`cotwItem ${item.base.css}`} alt=""/>
    </div>
    <div className="content">
      <a className="header">{type}</a>
      <div className="meta">
        <span className="date"/>
      </div>
      <div className="description" style={{maxWidth:'7em'}}>
        {item.base.name}
      </div>
    </div>
  </div>
);

const ItemViewDraggable = ({ cid, item, type, connectDragSource, isDragging }) => (
  connectDragSource(
    <div>
      <ItemView cid={cid} item={item} type={type} isDragging={isDragging}/>
    </div>
  )
);

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging       : monitor.isDragging()
  }
}

const source = {
  beginDrag(props) {
    return _.extend({}, props);
  }
};

export default DragSource((props) => {
  return props.dragTargetType;
}, source, collect)(ItemViewDraggable);