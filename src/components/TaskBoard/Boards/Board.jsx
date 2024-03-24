import React from "react";
import { useSelector } from "react-redux";
import Cards from "./Cards";
import { selectSort } from "../../../redux/taskSlice";
import { Droppable } from "../../DND/Droppable";

import { DragOverlay } from "@dnd-kit/core";
import Draggable from "../../DND/Draggable";

const Board = ({ id, title, bgColor, tasks, isDragging, activeId }) => {
  const sortBy = useSelector(selectSort); // Using useSelector to select data from Redux store

  return (
    <Droppable
      className="min-w-[250px] lg:w-1/4 bg-slate-300 rounded-md"
      key={id}
      id={title}
    >
      <h1 className={`${bgColor} text-white p-2 text-center rounded-t-md`}>
        {title}
      </h1>
      <div className="p-3 overflow-y-auto h-[70vh]">
        {tasks &&
          tasks
            .sort((a, b) => {
              // Sorting logic based on sortBy
              if (sortBy === "asc") {
                // Sorting in ascending order
                return a.priority - b.priority;
              } else if (sortBy === "desc") {
                // Sorting in descending order
                return b.priority - a.priority;
              }
              // Default: no sorting
              return 0;
            })
            .map((task, index) => (
              <div key={index}>
                <Draggable id={task.id}>
                  <Cards key={index} task={task} bgColor={bgColor} />
                </Draggable>
                {isDragging && (
                  <DragOverlay>
                    {activeId === task.id && (
                      <Cards key={task.id} task={task} bgColor={bgColor} />
                    )}
                  </DragOverlay>
                )}
              </div>
            ))}
      </div>
    </Droppable>
  );
};

export default Board;
