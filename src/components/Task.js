import React from "react";
import { toast } from "react-toastify";

const TaskList = ({ task, refetch, setLoading }) => {
  const { _id, taskName, description } = task;
  const handleDeleteTask = (id) => {
    setLoading(true);
    fetch(`http://localhost:5000/task/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        refetch();
        toast.success(`${taskName} Task deleted successful`);
        setLoading(false);
      });
  };
  const handleCompleteTask = (id) => {
    setLoading(true);
    fetch(`http://localhost:5000/task/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ completed: true }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          refetch();
          setLoading(false);
          toast.success(taskName + "Task Complete");
        }
      });
  };

  return (
    <div className="w-full rounded-md border-2 p-3 my-3 flex justify-between">
      <div>
        <h1
          className={`text-xl font-bold ${task?.completed && "line-through"}`}
        >
          Task: {taskName}
        </h1>
        <p className="my-2">{description}</p>
      </div>
      <div className="flex flex-col">
        <button
          disabled={task?.completed}
          onClick={() => handleCompleteTask(_id)}
          className="btn btn-sm btn-success mb-2"
        >
          Complete
        </button>
        <button
          onClick={() => handleDeleteTask(_id)}
          className="btn btn-sm btn-error"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskList;
