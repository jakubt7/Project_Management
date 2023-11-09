import React, { useRef, useState } from "react";

const AddEmployeeModal = ({ isOpen, onClose, onAddEmployee }) => {
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const positionRef = useRef();
  const emailRef = useRef();
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const firstName = firstNameRef.current.value;
    const lastName = lastNameRef.current.value;
    const position = positionRef.current.value;
    const email = emailRef.current.value;

    const employee = {
      name: firstName,
      lastname: lastName,
      position: position,
      email: email,
    };

    setIsPending(true);

    try {
      const response = await fetch("http://localhost:8080/employees", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(employee),
      });

      if (response.ok) {
        console.log("Employee added successfully");
        firstNameRef.current.value = "";
        lastNameRef.current.value = "";
        positionRef.current.value = "";
        emailRef.current.value = "";
        onAddEmployee();
      } else {
        console.error("Unable to add an employee");
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
            <h3 className="text-2xl font-semibold mb-4">Add a new employee</h3>
            <form onSubmit={handleSubmit}>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                First Name:
              </label>
              <input
                type="text"
                name="firstName"
                ref={firstNameRef}
                required
                className="w-full border rounded py-2 px-3 mb-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Last Name:
              </label>
              <input
                type="text"
                name="lastName"
                ref={lastNameRef}
                required
                className="w-full border rounded py-2 px-3 mb-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Position:
              </label>
              <select
                name="position"
                ref={positionRef}
                required
                className="w-full border rounded py-2 px-3 mb-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="2">Frontend Developer</option>
                <option value="3">Backend Developer</option>
              </select>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                E-mail:
              </label>
              <input
                type="text"
                name="email"
                ref={emailRef}
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
                    Add Employee
                  </button>
                )}
                {isPending && (
                  <button
                    disabled
                    className="btn bg-gray-300 text-gray-700 py-2 px-4 rounded-lg ml-4"
                  >
                    Adding employee...
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

export default AddEmployeeModal;
