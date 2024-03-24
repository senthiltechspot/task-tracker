
import React from 'react';
import {useDroppable} from '@dnd-kit/core';

export function Droppable(props) {
    // console.log(props.id);
  const {isOver, setNodeRef} = useDroppable({
    id: props.id,
  });
  const style = {
    opacity: isOver ? 1 : 0.5,
  };

  return (
    <div ref={setNodeRef} className={props.className}>
      {props.children}
    </div>
  );
}
  