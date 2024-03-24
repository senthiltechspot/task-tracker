import { createSlice } from "@reduxjs/toolkit";
import { Tasks } from "../mockData";

const initialState = {
  task: [...Tasks],
  filtered: [],
  sort: "",
};

export const taskSlice = createSlice({
  name: "taskSlice",
  initialState,
  reducers: {
    addTask: (state, action) => {
      let data = {
        id: state.task.length + 1,
        createdAt: Date.now(),
        ...action.payload,
      };
      state.task.push(data);
    },
    deleteTask: (state, action) => {
      state.task = state.task.filter((task) => task.id !== action.payload);
      if (state.filtered.length > 0) {
        state.filtered = state.filtered.filter(
          (task) => task.id !== action.payload
        );
      }
    },
    updateTask: (state, action) => {
      state.task = state.task.map((task) =>
        task.id === action.payload.id ? action.payload : task
      );
    },
    resetTask: (state) => {
      state.task = [];
    },
    filterTask: (state, action) => {
      const { assigneeName, taskStatus, startDate, endDate } = action.payload;

      // Filter tasks based on provided criteria
      const filteredArray = state.task.filter((task) => {
        // Filtering based on assigneeName (case-insensitive)
        if (
          assigneeName &&
          task.assignTo &&
          !task.assignTo.toLowerCase().includes(assigneeName.toLowerCase())
        ) {
          return false;
        }

        // Filtering based on taskStatus
        if (taskStatus !== "All" && task.status !== taskStatus) {
          return false;
        }

        // Filtering based on startDate and endDate
        if (
          startDate &&
          endDate &&
          (new Date(task.createdAt) < new Date(startDate) ||
            new Date(task.createdAt) > new Date(endDate))
        ) {
          return false;
        }

        return true;
      });

      // Update filtered state
      state.filtered = filteredArray.length > 0 ? filteredArray : [];

      // If no tasks are found and any filtering criteria are applied, show "No Task Found"
      if (
        (assigneeName || taskStatus !== "All" || (startDate && endDate)) &&
        filteredArray.length === 0
      ) {
        state.filtered = [
          {
            id: 0,
            title: "No Task Found",
            desc: "Please add new task",
            assignTo: "",
            status: "Pending",
            priority: 0,
          },
        ];
      }
    },

    resetFilter: (state) => {
      state.filtered = [];
    },

    addSortBy: (state, action) => {
      const { sortBy } = action.payload;
      state.sort = sortBy;
    },
    updateTaskOrder: (state, action) => {
      const { taskId, status } = action.payload;
      state.task = state.task.map((task) => {
        if (task.id === taskId) {
          task.status = status;
        }
        return task;
      })
    },
  },
});

export const {
  addTask,
  deleteTask,
  updateTask,
  resetTask,
  filterTask,
  resetFilter,
  addSortBy,
  updateTaskOrder,
} = taskSlice.actions;

export const selectTask = (state) => state.task.task;
export const selectFilterd = (state) => state.task.filtered;
export const selectSort = (state) => state.task.sort;

export default taskSlice.reducer;
