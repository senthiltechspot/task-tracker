import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask, resetTask, updateTask } from "../../../../redux/taskSlice";

const TaskForm = ({ setShowModal, task }) => {
  const dispatch = useDispatch();
  const [editedTask, setEditedTask] = useState(task);
  const validateForm = () => {
    if (!editedTask?.title) {
      alert("Title is required");
      return false;
    }
    if (!editedTask?.desc) {
      alert("Description is required");
      return false;
    }
    if (!editedTask?.assignTo) {
      alert("Assignee is required");
      return false;
    }
    if (!editedTask?.priority) {
      alert("Priority is required");
      return false;
    }
    if (!editedTask?.status) {
      alert("Status is required");
      return false;
    }
    return true;
  };

  const handleCreate = () => {
    if (!validateForm()) return;
    dispatch(addTask(editedTask));
    setShowModal(false);
  };

  const handleEdit = () => {
    if (!validateForm()) return;
    dispatch(updateTask(editedTask));
    setShowModal(false);
  };

  const handleReset = () => {
    setEditedTask(task);
    // dispatch(resetTask());
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTask({
      ...editedTask,
      [name]: value,
    });
  };

  return (
    <div className="p-3 bg-white rounded-md w-[500px]">
      <form className="flex flex-col gap-3">
        {/* title */}
        <div>
          <label htmlFor="title" className="block font-bold">
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={editedTask?.title}
            onChange={handleChange}
            className="w-full p-2 rounded-md border"
            disabled={task ? true : false}
          />
        </div>
        {/* Description */}
        <div>
          <label htmlFor="desc" className="block font-bold">
            Description
          </label>
          <textarea
            name="desc"
            id="desc"
            cols="30"
            value={editedTask?.desc}
            onChange={handleChange}
            rows="3"
            className="w-full p-2 rounded-md border"
            disabled={task ? true : false}
          ></textarea>
        </div>
        {/* Assign To */}
        <div>
          <label htmlFor="assignTo" className="block font-bold">
            Assign To
          </label>
          <input
            type="text"
            name="assignTo"
            id="assignTo"
            value={editedTask?.assignTo}
            onChange={handleChange}
            disabled={task ? true : false}
            className="w-full p-2 rounded-md border"
          />
        </div>
        <div className="flex gap-3">
          {/* Priority */}
          <div className="mb-3">
            <label htmlFor="priority" className=" font-bold">
              Priority
            </label>
            <select
              name="priority"
              id="priority"
              value={editedTask?.priority}
              onChange={handleChange}
              className="w-full p-2 rounded-md border"
            >
              <option value="">Select</option>
              <option value="0">P0</option>
              <option value="1">P1</option>
              <option value="2">P2</option>
              <option value="3">P3</option>
            </select>
          </div>
          {/* Status */}
          <div>
            <label htmlFor="status" className=" font-bold">
              Status
            </label>
            <select
              name="status"
              id="status"
              value={editedTask?.status}
              onChange={handleChange}
              className="w-full p-2 rounded-md border"
            >
              <option value="">Select</option>
              <option value="Pending">Pending</option>
              <option value="In-Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="Deployed">Deployed</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        </div>
        <div className="flex justify-end gap-3">
          <button
            type="button"
            className="bg-blue-500 text-white py-1 px-4 rounded-md"
            onClick={() => {
              task ? handleEdit() : handleCreate(false);
            }}
          >
            Save
          </button>
          {task && (
            <button
              type="button"
              className="bg-blue-500 text-white py-1 px-4 rounded-md"
              onClick={handleReset}
            >
              Reset
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
