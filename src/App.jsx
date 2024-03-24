import React from "react";
import { Header } from "./components/common/Header";
import TaskBoard from "./components/TaskBoard";

const App = () => {
  return (
    <div className="flex flex-col  m-3 lg:m-10  ">
      <Header />
      <TaskBoard />
    </div>
  );
};

export default App;
