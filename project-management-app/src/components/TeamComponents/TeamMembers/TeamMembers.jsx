import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AppHeader from "../../AppHeader/AppHeader";
import { Link } from "react-router-dom";

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

          setData(responseData);
        }
      } catch (error) {
        console.error(error.message);
      }
    }
    fetchData();
  }, [teamId]);

  console.log(data)

  return (
    <div className="teamMembers">
      <div className="">
        <AppHeader />
        <div className="w-5/6 mx-auto">
          <div className="teamDetails mb-8">
            <div className="bg-white rounded-xl p-6 shadow-md mb-4">
              <img
                src="https://picsum.photos/200/200"
                alt={`${data.team_name}`}
                className="rounded-full h-32 w-32 object-cover mx-auto mb-4"
              />
              <div className="text-center">
                <h2 className="font-medium text-gray-800 text-xl">{data[0].team_name}</h2>
              </div>
              <div className="membersList flex justify-center items-center mt-2">
                <div className="p-3 rounded-md">
                {data.map((member) => (
                    <div key={member.team_member_id} className="flex items-center justify-between mb-4">
                      <Link to={`/employees/${member.employee_id}`} className="flex items-center w-full">
                        <div className="bg-white hover:bg-slate-300 rounded-xl p-5 shadow-md flex">
                          <img
                            src="https://picsum.photos/100/100"
                            alt={`${data.team_name}`}
                            className="rounded-full h-12 w-12 object-cover mr-8 content-center"
                          />
                          <div className="text-center self-center">
                            <div className="font-medium text-gray-800">
                              <div className="text-lg">
                                {member.employee_name} {member.employee_lastname}
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                      <button className="bg-red-500 hover:bg-red-600 text-white font-bold ml-4 py-1/2 px-2 rounded">
                        X
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamMembers;
