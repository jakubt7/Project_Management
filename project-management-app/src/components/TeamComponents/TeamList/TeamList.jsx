import React, { useState, useEffect } from 'react';
import './TeamList.scss';
import { Link } from 'react-router-dom';
import AddTeamModal from '../AddTeamModal/AddTeamModal';

const TeamList = () => {
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const teamData = await fetch('http://localhost:8080/teams');

        if (!teamData.ok) {
          console.log('There was an error fetching from the API');
        } else {
          const data = await teamData.json();
          setData(data);
        }
      } catch (error) {
        console.error(error.message);
      }
    }
    fetchData();
  }, [data]);

  const handleAddTeam = async () => {
    async function fetchData() {
      try {
        const teamData = await fetch("http://localhost:8080/teams");

        if (!teamData.ok) {
          console.log("There was an error fetching from the API");
        } else {
          const data = await teamData.json();
          setData(data);
        }
      } catch (error) {
        console.error(error.message);
      }
    }
    fetchData();
    setIsModalOpen(false);
  };

  return (
    <div className="flex justify-center mt-5">
      <div className="w-5/6">
        <div className="bg-white p-4 shadow-md rounded-lg mb-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-2xl text-gray-800">Team List</h2>
            <div className="border-solid border-gray-400 border-2 rounded-lg w-1/4">
              <input
                type="text"
                class="bg-white h-10 w-full px-4 rounded-lg focus:outline-none hover:cursor-pointer"
                placeholder="Search teams"
                onChange={(e) => setSearchInput(e.target.value)}
              ></input>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="btn bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg"
            >
              Add Team
            </button>
          </div>
        </div>
        <div className="flex flex-wrap -mx-4">
        {data
                .filter((team) => {
                  return searchInput.toLowerCase() === ""
                    ? team
                    : team.team_name
                        .toLowerCase()
                        .includes(searchInput);
                }).map((team) => (
            <div key={team.team_id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/3 px-4 mb-4">
              <Link to={`/teams/${team.team_id}`}>
                <div className="bg-white rounded-xl p-6 shadow-md">
                  <img
                    src="https://picsum.photos/200/200"
                    alt={`${team.team_name}`}
                    className="rounded-full h-32 w-32 object-cover mx-auto mb-4"
                  />
                  <div className="text-center">
                    <div className="font-medium text-gray-800">
                      <div className="text-xl">{team.team_name}</div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <AddTeamModal 
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      onAddTeam={handleAddTeam}
      />
    </div>
  );
};


export default TeamList;
