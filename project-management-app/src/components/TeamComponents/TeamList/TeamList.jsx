import React, { useState, useEffect } from 'react';
import './TeamList.scss';
import { Link } from 'react-router-dom';

const TeamList = () => {
  const [data, setData] = useState([]);

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

  return (
    <div>
      <div className="aboveList">
        <h2>Team List</h2>
        <Link to="/projects/create" className="btn">
          Add Team
        </Link>
      </div>
      <div className="flex flex-wrap columns-3">
        {data.map((team) => (
          <Link
            to={`/teams/${team.team_id}`}
            key={team.team_id}
            className="w-1/2 md:w-1/5 p-2"
          >
            <div className="bg-slate-50 rounded-xl p-20 light:bg-slate-800">
              <img
                src="https://picsum.photos//150/150"
                alt={`${team.team_name}`}
              />
              <div className="text-center">
                <div className="font-medium">
                  <div className="text-slate-950 dark:text-slate-950">
                    {team.team_name}
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TeamList;
