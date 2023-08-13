import React, { useRef, useState } from "react";
import "./CreateEmployee.scss";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";

const CreateEmployee = () => {
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
    <div className="createEmployee">
      <Sidebar />
      <div className="mainContainer">
        <Navbar />
        <h2>Add a new employee</h2>
        <form onSubmit={handleSubmit}>
          <label>First Name:</label>
          <input type="text" name="firstName" ref={firstNameRef} />
          <label>Last name:</label>
          <input type="text" name="lastName" ref={lastNameRef} />
          <label>Position:</label>
          <select name="position" ref={ positionRef }>
          <option value="2">Frontend Developer</option>
          <option value="3">Backend Developer</option>
          </select>
          <label>E-mail:</label>
          <input type="text" name="email" ref={emailRef} />
          {!isPending && <button type="submit">Add Employee</button>}
          {isPending && <button disabled>Adding employee...</button>}
        </form>
      </div>
    </div>
  );
};

export default CreateEmployee;
