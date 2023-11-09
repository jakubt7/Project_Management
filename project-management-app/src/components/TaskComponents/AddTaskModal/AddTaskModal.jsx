import React, { useRef, useState } from "react";
import Select from "../../Select/Select";

const AddTaskModal = (isOpen, onClose, onAddTask) => {
  const nameRef = useRef();
  const descriptionRef = useRef();
  const projectRef = useRef();
  const teamRef = useRef();
  const assigneeRef = useRef();
  const statusRef = useRef();
  const startRef = useRef();
  const endRef = useRef();
  const employeeRef = useRef();
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const name = nameRef.current.value;
    const description = descriptionRef.current.value;
    const project = projectRef.current.value;
    const team = teamRef.current.value;
    const assignee = assigneeRef.current.value;
    const status = statusRef.current.value;
    const start = startRef.current.value;
    const end = endRef.current.value;
    const employee = employeeRef.current.value;

    const task = {
      name: name,
      description: description,
      project: project,
      team: team,
      assignee: assignee,
      status: status,
      start_date: start,
      end_date: end,
      employee: employee,
    };

    setIsPending(true);

    try {
      const response = await fetch("http://localhost:8080/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });

      if (response.ok) {
        console.log("Task added successfully");
        nameRef.current.value = "";
        descriptionRef.current.value = "";
        projectRef.current.value = "";
        teamRef.current.value = "";
        assigneeRef.current.value = "";
        statusRef.current.value = "";
        startRef.current.value = "";
        endRef.current.value = "";
        employeeRef.current.value = "";
        onAddTask();
      } else {
        console.error("Unable to add a task");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div
      className={
        isOpen
          ? "fixed inset-0 flex items-center justify-center z-50"
          : "hidden"
      }
    >
      <div className=" bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto border border-black">
        <div className="py-4 text-left px-6 flex flex-col justify-between h-full">
          <div>
            <h3 className="text-2xl font-semibold mb-4">Add a new task</h3>
            <form onSubmit={handleSubmit}>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Task name:
              </label>
              <input
                type="text"
                name="name"
                ref={nameRef}
                className="w-full border rounded py-2 px-3 mb-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Description:
              </label>
              <textarea
                name="description"
                ref={descriptionRef}
                className="w-full border rounded py-2 px-3 mb-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              ></textarea>
              <Select
                api="http://localhost:8080/projects"
                label="Associated project"
                column="project_name"
                id="project_id"
              />
              <Select
                api="http://localhost:8080/teams"
                label="Assign a team"
                column="team_name"
                id="team_id"
              />
              <Select
                api="http://localhost:8080/employees"
                label="Assignee"
                column="employee_name"
                id="employee_id"
              />
              <Select
                api="http://localhost:8080/taskstatus"
                label="Status"
                column="task_status_name"
                id="task_status_id"
              />
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Starting date:
              </label>
              <input
                type="date"
                name="startDate"
                ref={startRef}
                className="w-full border rounded py-2 px-3 mb-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Ending date:
              </label>
              <input
                type="date"
                name="endDate"
                ref={endRef}
                className="w-full border rounded py-2 px-3 mb-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <div className="flex justify-center gap-6 mt-4">
                <button
                  onClick={onClose}
                  className="btn bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-lg w-2/5"
                >
                  Close
                </button>
                {!isPending && (
                  <button
                    type="submit"
                    className="btn bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg self-end w-2/5"
                  >
                    Add Task
                  </button>
                )}
                {isPending && (
                  <button
                    disabled
                    className="btn bg-gray-300 text-gray-700 py-2 px-4 rounded-lg ml-4"
                  >
                    Adding task...
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTaskModal;
