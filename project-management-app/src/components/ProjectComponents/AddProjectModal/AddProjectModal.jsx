import React, { useRef, useState } from "react";
import Select from "../../Select/Select";

const AddProjectModal = ({ isOpen, onClose, onAddProject }) => {
  const nameRef = useRef();
  const startRef = useRef();
  const endRef = useRef();
  const statusRef = useRef();
  const descriptionRef = useRef();
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const name = nameRef.current.value;
    const start = startRef.current.value;
    const end = endRef.current.value;
    const status = statusRef.current.value;
    const description = descriptionRef.current.value;

    const project = {
      name: name,
      start_date: start,
      end_date: end,
      status: status,
      description: description,
    };

    setIsPending(true);

    try {
      const response = await fetch("http://localhost:8080/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(project),
      });

      if (response.ok) {
        console.log("Project added successfully");
        nameRef.current.value = "";
        startRef.current.value = "";
        endRef.current.value = "";
        statusRef.current.value = "";
        descriptionRef.current.value = "";
        onAddProject();
      } else {
        console.error("Unable to add a project");
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
            <h3 className="text-2xl font-semibold mb-4">Add a new project</h3>
            <form onSubmit={handleSubmit}>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Project name:
              </label>
              <input
                type="text"
                name="name"
                ref={nameRef}
                required
                className="w-full border rounded py-2 px-3 mb-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Starting date:
              </label>
              <input
                type="date"
                name="startDate"
                ref={startRef}
                required
                className="w-full border rounded py-2 px-3 mb-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Ending date:
              </label>
              <input
                type="date"
                name="endDate"
                ref={endRef}
                required
                className="w-full border rounded py-2 px-3 mb-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <Select
                api="http://localhost:8080/projectstatus"
                label="Status"
                column="project_status_name"
                id="project_status_id"
                required
                ref={statusRef}
                className="w-full border rounded py-2 px-3 mb-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Description:
              </label>
              <textarea
                name="description"
                ref={descriptionRef}
                required
                className="w-full border rounded py-2 px-3 mb-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              ></textarea>
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
                    Add Project
                  </button>
                )}
                {isPending && (
                  <button
                    disabled
                    className="btn bg-gray-300 text-gray-700 py-2 px-4 rounded-lg ml-4"
                  >
                    Adding project...
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
export default AddProjectModal;
