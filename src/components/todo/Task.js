import React from "react";

import APIRequests from "../../requests/api.requests";

function Task({ task, setTasks, authToken }) {
  const checkBox = task.done ? "./checked-box.png" : "./unchecked-box.png";
  const completed = task.done ? "taskCompleted" : "";
  const taskClasses = `taskContent ${completed}`;

  const handleCheckboxToggle = async () => {
    try {
      const data = await APIRequests(authToken).toggleTaskStatus(task);

      setTasks(previousTasks => {
        const taskIndex = previousTasks.findIndex(t => t.id === task.id),
          newTaskList = previousTasks.slice();

        newTaskList[taskIndex].done = data.done;
        return newTaskList;
      });
    } catch (errors) {
      console.log(errors);
    }
  };

  const handleDelete = async () => {
    try {
      const data = await APIRequests(authToken).deleteTask(task);

      setTasks(previousTasks => {
        console.log(data);
        const taskIndex = previousTasks.findIndex(t => t.id === task.id),
          newTaskList = previousTasks.slice();

        newTaskList.splice(taskIndex, 1);

        return newTaskList;
      });
    } catch (errors) {
      console.log(errors);
    }
  };

  return (
    <div className="taskWrapper">
      <span className="taskCheckBox" onClick={handleCheckboxToggle}>
        <img src={checkBox} alt="checkbox" />
      </span>

      <span className={taskClasses}>{task.title}</span>

      <span className="taskDeleteButton" onClick={handleDelete}>
        <img src="./delete-button.png" alt="delete" />
      </span>
    </div>
  );
}

export default Task;
