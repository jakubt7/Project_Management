import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

const AppHeader = () => {
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [data, setData] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const isUser = user && user.role === "user";

  const fetchNotifications = async () => {
    try {
      const notificationsData = await fetch(
        `http://localhost:8080/notifications/${user.employee_id}`
      );

      if (!notificationsData.ok) {
        console.log("There was an error fetching from the API (Notifications)");
      } else {
        const data = await notificationsData.json();
        setData(data);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleSeenClick = async (notificationId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/notifications/update/${notificationId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: notificationId }),
        }
      );

      if (response.ok) {
        console.log("Notification marked as seen!");
        fetchNotifications();
      } else {
        console.error("Failed to update notification");
        console.log(notificationId);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleLogout = () => {
    navigate("/login");
    localStorage.removeItem("user");
  };

  const handleNotificationsClick = () => {
    setShowNotifications(!showNotifications);

    if (!showNotifications) {
      fetchNotifications();
    }
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
          {isUser && (
            <div className="relative">
              <button
                onClick={handleNotificationsClick}
                className="flex items-center justify-between text-sky-950 font-bold hover:text-gray-300 mr-8 relative"
              >
                <NotificationsActiveIcon />
                {!showNotifications &&
                  data.length > 0 &&
                    (
                      <span className="absolute bottom-[-2px] right-[-3px] w-3 h-3 bg-red-500 rounded-full"></span>
                    )}
              </button>
              {showNotifications && data.length > 0 &&(
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border-2 p-3">
                  {data.map((notification) => (
                    <div
                      className="px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 mt-1 ml-1 flex"
                      key={notification.notification_id}
                    >
                      TASK: {notification.task_name} ASSIGNED TO:{" "}
                      {notification.project_name}
                      <RemoveRedEyeIcon
                        className="self-center ml-2 :hover:text-gray-300 cursor-pointer"
                        onClick={() =>
                          handleSeenClick(notification.notification_id)
                        }
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          <div>
            <button
              onClick={handleLogout}
              className="flex items-center justify-between text-sky-950 font-bold hover:text-gray-300"
            >
              Log out
              <LogoutRoundedIcon />
            </button>
          </div>
        </div>
        <hr className="mt-5"></hr>
      </nav>
    </div>
  );
};

export default AppHeader;
