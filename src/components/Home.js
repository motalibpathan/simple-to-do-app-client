import React from "react";

const Home = () => {
  const handleAddTask = (event) => {
    event.preventDefault();
    const taskName = event.target.taskName.value;
    const description = event.target.taskName.value;
    const task = { email: "motalibpathan11@gmail.com", taskName, description };

    fetch(`http://localhost:5000/task`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(task),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  return (
    <div className="w-full lg:w-3/5 mx-auto">
      <h1 className="text-center text-2xl font-bold my-3">Add a task</h1>
      <form onSubmit={handleAddTask} className="w-full space-y-3">
        <input
          type="text"
          placeholder="Task name"
          class="input input-bordered w-full "
          name="taskName"
        />
        <textarea
          class="textarea textarea-bordered w-full"
          placeholder="Description"
          name="description"
        ></textarea>
        <button class="btn btn-success">Add Task</button>
      </form>
    </div>
  );
};

export default Home;
