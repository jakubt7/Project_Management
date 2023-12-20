import React from "react";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import TaskIcon from "@mui/icons-material/Task";
import BadgeIcon from "@mui/icons-material/Badge";
import ArchiveIcon from "@mui/icons-material/Archive";
import GroupsIcon from "@mui/icons-material/Groups";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import ProjectProgressPieChart from "../../components/ProjectProgressChart/ProjectProgressChart";

function Home() {
  return (
    <div className="app text-center">
      <div className="text-3xl mt-12 mb-12 text-sky-950"><Link to={`/`}>
        team.io
       </Link></div>
      <div className="appContent">
        <ProjectProgressPieChart />
        <div className="container w-3/5 mx-auto mt-8 grid grid-cols-4 gap-4 md:grid-cols-4">
          <NavLink
            to="/employees"
            className="h-60 border rounded-xl bg-gray-200 p-4 text-center flex flex-col items-center justify-center hover:bg-gray-200"
          >
            <div className="mb-2">
              <BadgeIcon />
            </div>
            Employee
          </NavLink>
          <NavLink
            to="/projects"
            className="h-60 border rounded-xl bg-gray-200 p-4 text-center flex flex-col items-center justify-center hover:bg-gray-200"
          >
            <div className="mb-2">
              <ArchiveIcon />
            </div>
            Projects
          </NavLink>
          <NavLink
            to="/tasks"
            className="h-60 border rounded-xl bg-gray-200 p-4 text-center flex flex-col items-center justify-center hover:bg-gray-200"
          >
            <div className="mb-2">
              <TaskIcon />
            </div>
            Tasks
          </NavLink>
          <NavLink
            to="/teams"
            className="h-60 border rounded-xl bg-gray-200 p-4 text-center flex flex-col items-center justify-center hover:bg-gray-200"
          >
            <div className="mb-2">
              <GroupsIcon />
            </div>
            Teams
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Home;
