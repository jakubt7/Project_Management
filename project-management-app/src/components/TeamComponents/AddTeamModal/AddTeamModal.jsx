import React, { useRef, useState } from "react";

const AddTeamModal = ({ isOpen, onClose, onAddTeam }) => {
  const nameRef = useRef();
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const name = nameRef.current.value;

    const team = {
      name: name,
    };

    setIsPending(true);

    try {
      const response = await fetch("http://localhost:8080/teams", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(team),
      });

      if (response.ok) {
        console.log("Team added successfully");
        nameRef.current.value = "";
        onAddTeam();
      } else {
        console.error("Unable to add a team");
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
            <h3 className="text-2xl font-semibold mb-4">Add a new team</h3>
            <form onSubmit={handleSubmit}>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Team name:
              </label>
              <input
                type="text"
                name="name"
                ref={nameRef}
                required
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
                    Add Team
                  </button>
                )}
                {isPending && (
                  <button
                    disabled
                    className="btn bg-gray-300 text-gray-700 py-2 px-4 rounded-lg ml-4"
                  >
                    Adding team...
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
export default AddTeamModal;
