import React, { useState, useEffect } from "react";
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
          const responseData = await teamsData.json();
        
          const dataArray = Array.isArray(responseData) ? responseData : [responseData];
          setData(dataArray);
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
          <h2>Team Members</h2>
            <ul>
            {data.map((member) => (
            <li key={member.team_member_id}>
            Employee ID: {member.employee_name} {member.employee_lastname}
          </li>
        ))}
      </ul>
        </div>
      </div>
    </div>
  );
};

export default TeamMembers;