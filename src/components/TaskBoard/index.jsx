import React from "react";
import Filters from "./Filters"
import Boards from "./Boards"

const TaskBoard = () => {
  return (
    <div className="bg-white p-3 lg:p-7 rounded-xl border border-black min-h-[80vh]">
      <Filters />
      <Boards />
    </div>
  );
};

export default TaskBoard;
