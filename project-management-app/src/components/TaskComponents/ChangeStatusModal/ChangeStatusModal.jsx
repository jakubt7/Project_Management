import React, { useRef, useState } from "react";
import Select from "../../Select/Select";

const ChangeStatusModal = ({ isOpen, onClose, taskId, onChangeStatus }) => {
  const statusRef = useRef();
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newStatus = statusRef.current.value;

    const updatedStatus = {
      status: newStatus,
    };

    setIsPending(true);

    try {
      const response = await fetch(
        `http://localhost:8080/tasks/update/status/${taskId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedStatus),
        }
      );

      if (response.ok) {
        console.log("Task status updated successfully");
        onChangeStatus();
      } else {
        console.error("Unable to update task status");
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
      <div className="bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto border border-black">
        <div className="py-4 text-left px-6 flex flex-col justify-between h-full">
          <div>
            <h3 className="text-2xl font-semibold mb-4">Change Task Status</h3>
            <form onSubmit={handleSubmit}>
              <Select
                api="http://localhost:8080/taskstatus"
                label="Select New Status"
                column="task_status_name"
                id="task_status_id"
                required
                ref={statusRef}
              />
              <div className="flex justify-center mt-4">
                <div className="mr-5">
                  <button
                    onClick={onClose}
                    className="btn bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-lg w-30 mr-7"
                  >
                    Close
                  </button>
                  {!isPending && (
                    <button
                      type="submit"
                      className="btn bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg w-30"
                    >
                      Update Status
                    </button>
                  )}
                  {isPending && (
                    <button
                      disabled
                      className="btn bg-gray-300 text-gray-700 py-2 px-4 rounded-lg ml-4"
                    >
                      Updating status...
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangeStatusModal;
