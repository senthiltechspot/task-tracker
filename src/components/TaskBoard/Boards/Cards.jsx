import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Modal from "./Modal";
import TaskForm from "./Forms/TaskForm";
import { deleteTask } from "../../../redux/taskSlice";
import Draggable from "../../DND/Draggable";

const Cards = ({ task, bgColor }) => {
  const [showdrop, setShowdrop] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  return (
    <div
      className="p-3 bg-white rounded-md mb-2 z-50"
      key={task.id}
      id={task.id}
    >
      <div className="flex items-center justify-between border-b pb-2">
        <h1 className="text-xl font-bold ">{task.title}</h1>
        <p className="text-sm font-bold py-1 px-3 rounded-md bg-blue-900 text-white">
          P{task.priority}
        </p>
      </div>
      <p>{task.desc}</p>
      <div className="flex items-center justify-between mt-3">
        <p>Assigned to: {task.assignTo}</p>
        <div className=" relative flex items-center gap-3">
          <i
            onClick={() => setShowdrop(!showdrop)}
            className="bi bi-three-dots-vertical px-2 py-1 bg-blue-900 text-white rounded-md"
          ></i>
          {showdrop && (
            <div className="absolute top-10 right-0 bg-slate-500 py-1 text-white rounded-md">
              <h3
                onClick={() => {
                  setShowModal(true);
                  setShowdrop(false);
                }}
                className="border-b  text-center px-3 cursor-pointer"
              >
                Edit
              </h3>
              <h3
                onClick={() => {
                  dispatch(deleteTask(task.id));
                }}
                className="px-3 text-center cursor-pointer"
              >
                Delete
              </h3>
            </div>
          )}
        </div>
      </div>
      <button
        disabled
        className={`border  text-white border-black py-1 px-5 rounded-md mt-3 ${bgColor}`}
      >
        {task.status}
      </button>
      {showModal && (
        <Modal
          title={"Edit"}
          children={<TaskForm setShowModal={setShowModal} task={task} />}
          onClose={() => setShowModal(false)}
        ></Modal>
      )}
    </div>
  );
};

export default Cards;
