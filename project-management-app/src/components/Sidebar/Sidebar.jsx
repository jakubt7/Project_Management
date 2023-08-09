import React from "react";
import "./Sidebar.scss";
import { NavLink } from "react-router-dom";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import TaskIcon from "@mui/icons-material/Task";
import BadgeIcon from "@mui/icons-material/Badge";
import ArchiveIcon from "@mui/icons-material/Archive";
import GroupsIcon from "@mui/icons-material/Groups";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";

function Sidebar() {
  return (
    <div className="sidebar">
      <NavLink to={"/"} style={{ textDecoration: "none" }}>
        <div className="firstSection">
          <div className="logo">team.io</div>
        </div>
      </NavLink>
      <hr></hr>
      <div className="secondSection">
        <ul>
          <NavLink to={"/"} style={{ textDecoration: "none" }}>
            <li>
              <SpaceDashboardIcon className="icon" />
              <span>Dashboard</span>
            </li>
          </NavLink>
        </ul>
        <ul>
          <NavLink to={"/employees"} style={{ textDecoration: "none" }}>
            <li>
              <BadgeIcon className="icon" />
              <span>Employees</span>
            </li>
          </NavLink>
        </ul>
        <ul>
          <NavLink to={"/projects"} style={{ textDecoration: "none" }}>
            <li>
              <ArchiveIcon className="icon" />
              <span>Projects</span>
            </li>
          </NavLink>
        </ul>
        <ul>
          <NavLink to={"/tasks"} style={{ textDecoration: "none" }}>
            <li>
              <TaskIcon className="icon" />
              <span>Tasks</span>
            </li>
          </NavLink>
        </ul>
        <ul>
          <NavLink to={"/teams"} style={{ textDecoration: "none" }}>
            <li>
              <GroupsIcon className="icon" />
              <span>Teams</span>
            </li>
          </NavLink>
        </ul>
        <ul>
          <li>
            <LogoutRoundedIcon className="icon" />
            <span>Logout</span>
          </li>
        </ul>
      </div>
      <div className="thirdSection">
        <div className="darkMode"></div>
        <div className="darkMode"></div>
      </div>
    </div>
  );
}

export default Sidebar;
