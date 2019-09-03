import React from "react";

import Task from "./Task";

function TaskList({ tasks, setTasks, authToken }) {
  return (
    <div className="taskListWrapper">
      {tasks.map(task => {
        return (
          <Task
            task={task}
            key={task.id}
            setTasks={setTasks}
            authToken={authToken}
          />
        );
      })}
    </div>
  );
}

export default TaskList;
