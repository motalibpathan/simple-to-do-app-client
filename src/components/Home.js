import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import auth from "../firebase.init";
import Loading from "./Loading";
import Task from "./Task";

const Home = () => {
  const [user, userLoading] = useAuthState(auth);
  const [loading, setLoading] = useState(false);

  const {
    data: tasks,
    isLoading,
    refetch,
  } = useQuery(["tasks", user.email], () =>
    fetch(
      `https://ancient-woodland-15731.herokuapp.com/task/${user.email}`
    ).then((res) => res.json())
  );

  const handleAddTask = (event) => {
    event.preventDefault();
    const taskName = event.target.taskName.value;
    const description = event.target.description.value;
    const task = { email: user.email, taskName, description };

    fetch(`https://ancient-woodland-15731.herokuapp.com/task`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(task),
    })
      .then((res) => res.json())
      .then((data) => {
        refetch();
        toast.success("Task added");
      });
    event.target.reset();
  };

  if (isLoading || userLoading) {
    return <Loading />;
  }

  return (
    <div className="w-full lg:w-3/5 mx-auto p-5">
      <h1 className="text-center text-2xl font-bold my-3">Add a task</h1>
      <form onSubmit={handleAddTask} className="w-full space-y-3">
        <input
          type="text"
          placeholder="Task name"
          className="input input-bordered w-full "
          name="taskName"
          required
        />
        <textarea
          className="textarea textarea-bordered w-full"
          placeholder="Description"
          name="description"
          required
        ></textarea>
        <button className="btn btn-success">Add Task</button>
      </form>
      <div>
        <h1 className="my-5 text-2xl font-bold"> Task List: </h1>
        {loading && <Loading />}
        {!loading && (
          <>
            {tasks?.map((task) => (
              <Task
                key={task._id}
                task={task}
                refetch={refetch}
                setLoading={setLoading}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
