import React, { Component, PropTypes } from 'react';
import { DragSource } from 'react-dnd';
import _ from 'lodash';
import * as cotw from '/core/cotwContent.js';

export const ItemView = ({cid, item, isDragging}) => (
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
      <a className="header">{item.base.type}</a>
      <div className="meta">
        <span className="date"/>
      </div>
      <div className="description" style={{maxWidth:'7em'}}>
        {item.base.name}
      </div>
    </div>
  </div>
);

const ItemViewDraggable = ({ cid, item, connectDragSource, isDragging }) => {
  return connectDragSource(
    <div>
      <ItemView cid={cid} item={item} isDragging={isDragging}/>
    </div>
  )
};

ItemViewDraggable.propTypes = {
  cid              : PropTypes.string.isRequired,
  item             : PropTypes.object.isRequired,
  isDragging       : PropTypes.bool.isRequired,
  connectDragSource: PropTypes.func.isRequired
};

const collect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging       : monitor.isDragging()
});

const source = {
  beginDrag(props) {
    return _.extend({}, props);
  }
};

export const dragTargets = props => {
  if (_.includes(cotw.ItemType, props.item.base.type))
    return props.item.base.type;
  else
    throw `Drag target does not have a valid type! Props(${props})`
};

const dragSource = DragSource(dragTargets, source, collect)(ItemViewDraggable);

//export default ItemView;

export default dragSource;