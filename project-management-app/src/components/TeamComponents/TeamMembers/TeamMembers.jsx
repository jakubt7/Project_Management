import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AppHeader from "../../AppHeader/AppHeader";
import { Link, useNavigate } from "react-router-dom";
import AddMemberModal from "../AddMemberModal/AddMemberModal";
import CloseIcon from "@mui/icons-material/Close";

const TeamMembers = () => {
  const { teamId } = useParams();
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

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

  useEffect(() => {
    fetchData();
  }, [teamId]);

  const handleDeleteTeam = async () => {
    if (
      confirm(
        "Deleting this team is irreversible. Do you want to confirm the deletion?"
      ) === true
    ) {
      try {
        const response = await fetch(
          `http://localhost:8080/teams/delete/${teamId}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          console.log("Team deleted successfully");
          navigate("/teams");
        } else {
          console.log("Error encountered while deleting the team");
        }
      } catch (error) {
        console.error(error.message);
      }
    } else {
      return false;
    }
  };

  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user && user.role === "admin";

  const handleDelete = async (id) => {
    if (
      confirm(
        "Deleting this member is irreversible. Do you want to confirm the deletion?"
      ) == true
    ) {
      try {
        const response = await fetch(
          `http://localhost:8080/teammembers/delete/${id}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          console.log("Member deleted successfully");
        } else {
          console.log("Error encountered while deleting the task");
        }
      } catch (error) {
        console.error(error.message);
      }
    } else {
      return false;
    }

    fetchData();
  };

  const handleAddMember = async () => {
    fetchData();
    setIsModalOpen(false);
  };

  return (
    <div className="teamMembers">
      <div className="">
        <AppHeader />
        <div className="w-5/6 mx-auto">
          <div className="teamDetails mb-8">
            <div className="bg-white rounded-xl p-6 shadow-md mb-4">
              <div className="text-right">
                {isAdmin && (
                  <div className="text-right">
                    <button onClick={handleDeleteTeam}>
                      <CloseIcon />
                    </button>
                  </div>
                )}
              </div>
              <img
                src="https://picsum.photos/200/200"
                alt="Team picture"
                className="rounded-full h-32 w-32 object-cover mx-auto mb-4"
              />
              <div className="text-center">
                <h2 className="font-medium text-gray-800 text-xl">
                  {/* {data.team_name} */}
                </h2>
              </div>
              <div className="membersList flex justify-center items-center mt-2">
                <div className="p-3 rounded-md">
                  {data.map((member) => (
                    <div
                      key={member.team_member_id}
                      className="flex items-center justify-between mb-4"
                    >
                      <Link
                        to={`/employees/${member.employee_id}`}
                        className="flex items-center w-full"
                      >
                        <div className="bg-gray-200 hover:bg-slate-300 rounded-xl p-5 shadow-md flex">
                          <img
                            src="https://picsum.photos/100/100"
                            alt={`${data.team_name}`}
                            className="rounded-full h-12 w-12 object-cover mr-8 content-center"
                          />
                          <div className="text-center self-center w-40">
                            <div className="font-medium text-gray-800">
                              <div className="text-lg">
                                {member.employee_name}{" "}
                                {member.employee_lastname}
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                      {isAdmin && (
                        <CloseIcon
                          className="bg-red-500 hover:bg-red-600 text-white m-2 rounded"
                          onClick={() => handleDelete(member.team_member_id)}
                        />
                      )}
                    </div>
                  ))}
                  {isAdmin && (
                    <div className="flex justify-center">
                      <button
                        onClick={() => setIsModalOpen(true)}
                        className="btn bg-blue-500 hover:bg-blue-600 text-white py-4 px-6 rounded-lg mx-auto"
                      >
                        +
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AddMemberModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddMember={handleAddMember}
        teamId={teamId}
      />
    </div>
  );
};

export default TeamMembers;
