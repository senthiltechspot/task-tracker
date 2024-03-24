import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Modal from "../Boards/Modal";
import TaskForm from "../Boards/Forms/TaskForm";
import { filterTask, resetFilter } from "../../../redux/taskSlice";

const Filters = () => {
  const [showModal, setShowModal] = useState(false);
  const [assigneeName, setAssigneeName] = useState("");
  const [taskStatus, setTaskStatus] = useState("All");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [sortBy, setSortBy] = useState("");

  const dispatch = useDispatch();

  const handleApplyFilters = () => {
    // Dispatch filterTask action with current filter criteria
    dispatch(
      filterTask({
        assigneeName,
        taskStatus,
        startDate,
        endDate,
        sortBy,
      })
    );
  };

  return (
    <div className="p-3 lg:p-5 border border-black rounded-xl">
      <div className="flex flex-col gap-3 mb-3">
        <button
          onClick={() => setShowModal(true)}
          className="border bg-green-700 text-white border-black p-2 px-4 rounded-md"
        >
          Add Task
        </button>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <h1 className="text-xl font-bold mt-5">Filters By :</h1>
        <div className="flex items-center gap-3 mt-6">
          <input
            type="text"
            placeholder="Assignee Name"
            className="border border-black p-1 rounded-md"
            value={assigneeName}
            onChange={(e) => setAssigneeName(e.target.value)}
          />
          {/* Dropdown */}
          <select
            className="border border-black p-1 rounded-md"
            value={taskStatus}
            onChange={(e) => setTaskStatus(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Pending">Pending</option>
            <option value="In-Progress">In-Progress</option>
            <option value="Completed">Completed</option>
            <option value="Delivered">Delivered</option>
            <option value="Deployed">Deployed</option>
          </select>
          {/* Date start to end */}
        </div>
        <div className="flex gap-3">
          <div>
            <label htmlFor="start" className="block font-bold">
              Start :
            </label>
            <input
              type="date"
              id="start"
              name="start"
              className="border border-black p-1  rounded-md"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="end" className="block font-bold">
              End :
            </label>

            <input
              type="date"
              id="end"
              name="end"
              className="border border-black p-1  rounded-md"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="flex items-center flex-wrap gap-3 mt-5">
        <div className="flex gap-3">
          <h1 className="text-xl font-bold">Sort By :</h1>
          {/* Dropdown */}
          <select
            className="border border-black p-1 rounded-md"
            value={sortBy}
            onChange={(e) => {
              setSortBy(e.target.value);
            }}
          >
            <option value="">Priority</option>
            <option value="asc">Low To High</option>
            <option value="desc">High To Low</option>
          </select>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleApplyFilters}
            className="border bg-blue-700 text-white border-black p-2 px-4 rounded-md"
          >
            Apply Filters
          </button>
          <button
            onClick={() => {
              setAssigneeName("");
              setTaskStatus("All");
              setStartDate("");
              setEndDate("");
              dispatch(resetFilter());
            }}
            className="border bg-red-700 text-white border-black p-2 px-4 rounded-md"
          >
            Reset Filters
          </button>
        </div>
      </div>
      {showModal && (
        <Modal
          title={"Create Task"}
          children={<TaskForm setShowModal={setShowModal} />}
          onClose={() => setShowModal(false)}
        ></Modal>
      )}
    </div>
  );
};

export default Filters;
