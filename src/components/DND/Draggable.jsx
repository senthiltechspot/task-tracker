import React from 'react';
import {useDraggable} from '@dnd-kit/core';
import {CSS} from '@dnd-kit/utilities';

function Draggable(props) {
  const Element = props.element || 'div';
  const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id: props.id,
  });
  const style = {
    // Outputs `translate3d(x, y, 0)`
    transform: CSS.Translate.toString(transform),
  };
  return (
    <Element ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {props.children}
    </Element>
  );
}

export default Draggable