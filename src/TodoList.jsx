import { useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
export const TodoList = () => {
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editInput, setEditInput] = useState("");
  const [activeTab, setActiveTab] = useState("All");
  const [priority, setPriority] = useState("Medium");
  const addTask = () => {
    if (!input.trim()) return;
    const newArray = {
      id: Date.now(),
      name: input.trim(),
      done: false,
      priority: priority,
    };
    setTasks([...tasks, newArray]);

    setInput("");
    setPriority("Medium");
  };
  const toggleDone = (id) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          return { ...task, done: !task.done };
        }
        return task;
      }),
    );
  };
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };
  const progress = Number(
    tasks.length > 0 ?
      (
        (tasks.filter((task) => task.done === true).length / tasks.length) *
        100
      ).toFixed(0)
    : 0,
  );

  const startEdit = (id) => {
    const task = tasks.find((task) => task.id === id);
    if (task) {
      setEditId(id);
      setEditInput(task.name);
      setPriority(task.priority);
    }
  };
  const saveEdit = () => {
    if (editInput.trim() === "") return;
    setTasks(
      tasks.map((task) => {
        if (task.id === editId) {
          return { ...task, name: editInput.trim(), priority: priority };
        }
        return task;
      }),
    );
    setEditId(null);
    setEditInput("");
  };
  const priorityOrder = {
    High: 1,
    Medium: 2,
    Low: 3,
  };
  const filteredTasks = tasks
    .filter((task) => {
      return (
        activeTab === "All" ||
        (activeTab === "Completed" && task.done === true) ||
        (activeTab === "Pending" && task.done === false)
      );
    })
    .sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);

  return (
    <div className=" min-h-screen  bg-gray-100 flex flex-col items-center justify-center p-4 md:p-6 ">
      <h1 className="text-2xl md:text-6xl font-bold text-center mb-6">
        Todo List
      </h1>
      <div className=" w-full max-w-xl mb-6 grid grid-cols-1 sm:grid-cols-3 gap-4 items-stretch">
        <div className="bg-white p-5 rounded-2xl  border border-gray-100 shadow-md  hover:shadow-lg transition-shadow duration-200 text-center">
          <h2 className="text-sm font-medium text-gray-600">Total tasks</h2>
          <h2 className="text-2xl font-bold md:text-4xl text-blue-600">
            {tasks.length}
          </h2>
        </div>
        <div className="bg-white p-5 rounded-2xl  border border-gray-100 shadow-md  hover:shadow-lg transition-shadow duration-200 text-center">
          <h2 className="text-sm font-medium text-gray-600">Completed tasks</h2>
          <h2 className="text-2xl font-bold md:text-4xl text-green-600 ">
            {tasks.filter((task) => task.done === true).length}
          </h2>
        </div>
        <div className="bg-white p-5 rounded-2xl  border border-gray-100 shadow-md  hover:shadow-lg transition-shadow duration-200 text-center">
          <h2 className="text-sm font-medium text-gray-600">Pending tasks</h2>
          <h2 className="text-2xl font-bold md:text-4xl text-red-600">
            {tasks.filter((task) => task.done === false).length}
          </h2>
        </div>
      </div>
      <div className=" w-full max-w-xl  mb-6 ">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-medium text-gray-600">
            Task Progress:{tasks.filter((task) => task.done === true).length} of{" "}
            {tasks.length}
          </p>
          <p className="text-sm font-bold text-green-600">{progress}%</p>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div
            className="h-full  bg-green-600 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}></div>
        </div>
        {progress === 0 ?
          <p className="mt-2 text-sm text-gray-600 text-center">
            No progress yet! let's get started
          </p>
        : progress < 50 ?
          <p className="mt-2 text-sm text-gray-600 text-center">
            Good start! keep going
          </p>
        : progress < 100 ?
          <p className="mt-2 text-sm text-gray-600 text-center">
            You're doing great!
          </p>
        : <p className="mt-2 text-sm text-gray-600 text-center">
            All tasks completed! Excellent work
          </p>
        }
      </div>
      <div className="w-full max-w-xl bg-white border rounded-lg space-y-2 shadow-lg px-4 py-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter your Task to add"
            className=" w-full flex-1 border rounded-xl p-2 focus-visible:ring-2 focus-visible:ring-green-600 focus:border-green-600 outline-none"
          />
          <select
            className="w-full sm:w-32 rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-700 outline-none transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 cursor-pointer"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          <button
            className=" w-full sm:w-auto rounded-full px-4 py-2 bg-blue-600 text-white whitespace-nowrap 
            hover:bg-blue-700 transition-colors duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-offset-2"
            onClick={addTask}>
            Add Task
          </button>
        </div>

        <div className=" mt-4 p-4 flex flex-col gap-4 bg-gray-200 rounded-lg min-h-64">
          <div className="flex gap-2 bg-white p-1 rounded-xl border">
            <button
              className={`flex-1 px-3 py-2  text-sm font-medium transition-all ease-in-out duration-300  ${
                activeTab === "All" ?
                  "border-b-2 border-blue-600 text-blue-600"
                : "border-b-2 border-transparent text-gray-500 hover:text-gray-800"
              } cursor-pointer focus-visible:ring-2 focus-visible:ring-blue-500`}
              onClick={() => setActiveTab("All")}>
              All
            </button>
            <button
              className={`flex-1 px-3 py-2  text-sm font-medium transition-all ease-in-out duration-300  cursor-pointer ${
                activeTab === "Completed" ?
                  "border-b-2 border-blue-600 text-blue-600"
                : "border-b-2 border-transparent text-gray-500 hover:text-gray-800"
              } focus-visible:ring-2 focus-visible:ring-blue-500`}
              onClick={() => setActiveTab("Completed")}>
              Completed
            </button>
            <button
              className={`flex-1 px-3 py-2  text-sm font-medium transition-all ease-in-out duration-300 cursor-pointer ${
                activeTab === "Pending" ?
                  "border-b-2 border-blue-600 text-blue-600"
                : "border-b-2 border-transparent text-gray-500 hover:text-gray-800"
              } focus-visible:ring-2 focus-visible:ring-blue-500`}
              onClick={() => setActiveTab("Pending")}>
              Pending
            </button>
          </div>
          {tasks.length === 0 ?
            <p className="text-sm  text-gray-400 p-4 font-semibold text-center">
              No task yet.Add your first task!
            </p>
          : filteredTasks.map((task) => (
              <div
                key={task.id}
                className="bg-gray-50 p-3 rounded-lg shadow-sm flex items-center  gap-3">
                <input
                  type="checkbox"
                  checked={task.done}
                  onChange={() => toggleDone(task.id)}
                  className="w-5 h-5 accent-green-600 cursor-pointer "
                />
                {editId === task.id ?
                  <>
                    <input
                      type="text"
                      value={editInput}
                      onChange={(e) => setEditInput(e.target.value)}
                      className="flex-1 border min-w-0 rounded-xl p-2 focus-visible:ring-2 focus-visible:ring-green-600 focus:border-green-600 outline-none "
                    />
                    <select
                      className="w-28 shrink-0 rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-700 outline-none transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 cursor-pointer"
                      value={priority}
                      onChange={(e) => setPriority(e.target.value)}>
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </select>
                    <button
                      onClick={saveEdit}
                      className="bg-green-600 text-white rounded-full px-2 py-1 hover:bg-green-700 transition-colors duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-offset-2">
                      save
                    </button>
                    <button
                      onClick={() => {
                        setEditId(null);
                        setEditInput("");
                      }}
                      className="bg-gray-200 text-gray-800 rounded-full px-2 py-1 hover:bg-gray-300 hover:text-gray-800 transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-offset-2 cursor-pointer">
                      cancel
                    </button>
                  </>
                : <div className="flex-1 min-w-0 flex items-center gap-2">
                    <p
                      className={`${task.done === true ? "line-through text-gray-400" : "text-gray-800"} flex-1 min-w-0  text-xl wrap-break-word`}>
                      {task.name}
                    </p>
                    <span
                      className={` px-2 py-1 rounded-md text-xs font-medium shrink-0 mr-4 ${
                        task.priority === "High" ? "text-red-700 bg-red-100"
                        : task.priority === "Medium" ?
                          "text-amber-700 bg-amber-100"
                        : "text-blue-700 bg-blue-100"
                      }`}>
                      {task.priority}
                    </span>
                  </div>
                }
                {editId !== task.id && (
                  <>
                    <button
                      onClick={() => deleteTask(task.id)}
                      aria-label="Delete task"
                      className="rounded-full p-2 text-red-600 hover:text-red-700 transition-colors duration-200 hover:scale-105 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500 cursor-pointer ">
                      <FaTrash size={16} />
                    </button>

                    <button
                      onClick={() => startEdit(task.id)}
                      aria-label="Edit task"
                      className="rounded-full p-2 text-gray-700 hover:text-gray-800 transition-colors duration-200 hover:scale-105 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-500 cursor-pointer ">
                      <FaEdit size={16} />
                    </button>
                  </>
                )}
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
};
