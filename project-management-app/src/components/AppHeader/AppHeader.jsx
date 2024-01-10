import React from "react";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";

const AppHeader = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
    localStorage.removeItem("user");
  };

  return (
    <div className="appHeader">
      <div className="text-3xl mt-12 mb-12 text-sky-950 text-center">
        <Link to={`/home`}>team.io</Link>
      </div>
      <nav className="p-5">
        <div className="container mx-auto flex place-content-center items-center justify-between">
          <ul className="mx-auto flex space-x-36">
            <li>
              <NavLink
                to="/employees"
                className="text-sky-950 font-extrabold hover:text-gray-300"
              >
                Employees
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/projects"
                className="text-sky-950 font-extrabold hover:text-gray-300"
              >
                Projects
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/tasks"
                className="text-sky-950 font-extrabold hover:text-gray-300"
              >
                Tasks
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/teams"
                className="text-sky-950 font-extrabold hover:text-gray-300"
              >
                Teams
              </NavLink>
            </li>
          </ul>
          <div>
            <button
              onClick={handleLogout}
              className="flex items-center justify-between text-sky-950 font-extrabold hover:text-gray-300"
            >
              Log out<LogoutRoundedIcon />
            </button>
          </div>
        </div>
        <hr className="mt-5"></hr>
      </nav>
    </div>
  );
};

export default AppHeader;
