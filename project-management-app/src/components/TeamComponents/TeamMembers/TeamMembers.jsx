import React, { useState, useEffect } from "react";
import Sidebar from "../../Sidebar/Sidebar";
import Navbar from "../../Navbar/Navbar";
import { useParams } from "react-router-dom";
import './TeamMembers.scss';

const TeamMembers = () => {
  const { teamId } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const teamsData = await fetch(
          `http://localhost:8080/teammembers/${teamId}`
        );

        if (!teamsData.ok) {
        } else {
          const data = await teamsData.json();
          setData(data);
        }
      } catch (error) {
        console.error(error.message);
      }
    }
    fetchData();
  }, [teamId]);


  return (
    <div className="teamMembers">
      <Sidebar />
      <div className="membersContainer">
        <Navbar />
        <div className="membersList">
            <ul>
            {data.map((member) => (
            <li key={member.team_member_id}>
            Employee ID: {member.employee_id}
          </li>
        ))}
      </ul>
        </div>
      </div>
    </div>
  );
};

export default TeamMembers;
