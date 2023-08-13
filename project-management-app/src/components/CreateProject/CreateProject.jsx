import React, { useRef, useState } from "react";
import './CreateProject.scss';
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";

function CreateProject() {
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
      description: description
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
    <div className="createProject">
      <Sidebar />
      <div className="mainContainer">
        <Navbar />
        <h2>Add a new project</h2>
        <form onSubmit={handleSubmit}>
          <label>Name:</label>
          <input type="text" name="name" ref={nameRef} />
          <label>Starting date:</label>
          <input type="date" name="startDate" ref={startRef} />
          <label>Ending date:</label>
          <input type="date" name="endDate" ref={endRef} />
          <label>Status:</label>
          <select name="status" ref={ statusRef }>
          <option value="1">Active</option>
          <option value="2">Completed</option>
          </select>
          <label>Description</label>
          <textarea name="description" rows="5" cols="33" ref={descriptionRef}>
          </textarea>
          {!isPending && <button type="submit">Add Project</button>}
          {isPending && <button disabled>Adding project...</button>}
        </form>
      </div>
    </div>
  );
};


export default CreateProject



  
