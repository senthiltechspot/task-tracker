import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Board from "./Board";
import {
  selectFilterd,
  selectTask,
  updateTaskOrder,
} from "../../../redux/taskSlice";
import { DndContext } from "@dnd-kit/core";

const Boards = () => {
  const listOfBoards = [
    {
      id: 1,
      title: "Pending",
      bgColor: "bg-slate-500",
    },
    {
      id: 2,
      title: "In-Progress",
      bgColor: "bg-orange-400",
    },
    {
      id: 3,
      title: "Completed",
      bgColor: "bg-green-600",
    },
    {
      id: 4,
      title: "Deployed",
      bgColor: "bg-blue-950",
    },
    {
      id: 5,
      title: "Delivered",
      bgColor: "bg-red-400",
    },
  ];
  const [isDragging, setIsDragging] = useState(false);
  const dispatch = useDispatch();
  function handleDragStart() {
    setIsDragging(true);
  }

  function handleDragEnd(data) {
    console.log(data);
    dispatch(updateTaskOrder({ taskId: data.active.id, status: data.over.id }));
    setIsDragging(false);
  }

  const tasks = useSelector(selectTask);
  const filteredTasks = useSelector(selectFilterd);
console.log(isDragging);
  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="flex gap-3 overflow-x-auto mt-3">
        {listOfBoards.map((board) => {
          // Determine which set of tasks to pass based on whether there are filtered tasks
          const tasksToPass = filteredTasks.length > 0 ? filteredTasks : tasks;

          // Filter tasks for current board
          const boardTasks = tasksToPass.filter(
            (task) => task.status === board.title
          );

          return (
            <Board
              key={board.id}
              isDragging={isDragging}
              {...board}
              tasks={boardTasks}
            />
          );
        })}
      </div>
    </DndContext>
  );
};

export default Boards;
