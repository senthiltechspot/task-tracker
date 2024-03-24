import React from "react";

const Modal = ({ title, children, onClose }) => {
  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen">
        <div className="fixed inset-0 bg-black opacity-50"></div>
        <div className="relative bg-white rounded-lg">
          <div className="flex justify-between items-center px-4 py-2 bg-gray-200 rounded-t-lg">
            <h5 className="text-lg font-semibold">{title ? title : ""}</h5>
            <button
              type="button"
              className="p-2 text-gray-600 hover:text-gray-900 focus:outline-none focus:text-gray-900"
              aria-label="Close"
              onClick={onClose}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="p-4">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
