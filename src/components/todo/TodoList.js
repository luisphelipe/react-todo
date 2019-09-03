import React, { useState, useEffect } from "react";

import APIRequests from "../../requests/api.requests";
import TaskList from "./TaskList";
import TaskForm from "./TaskForm";

function TodoList({ authToken }) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const data = await APIRequests(authToken).getAllTasks();

        setTasks(data);
      } catch (errors) {
        console.log(errors);
      }
    })();
  }, [authToken]);

  return (
    <div id="todoWrapper">
      <TaskForm setTasks={setTasks} authToken={authToken} />
      <TaskList tasks={tasks} setTasks={setTasks} authToken={authToken} />
    </div>
  );
}

export default TodoList;
