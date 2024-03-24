import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import taskReducer from "./taskSlice";
import { Tasks } from "../mockData";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfig, taskReducer);

export const store = configureStore({
  reducer: { task: persistedReducer }, // Use "task" instead of "taskReducer"
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Dispatch an action to set initial state
store.dispatch({
  type: 'task/resetTask', // Assuming you have a resetTask action
  payload: Tasks, // Assuming Tasks is the initial data
});

export let persistor = persistStore(store);
