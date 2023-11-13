import React from 'react'
import { NavLink } from "react-router-dom";
import { Link } from 'react-router-dom';

const AppHeader = () => {
  return (
    <div className="appHeader">
        <div className="text-3xl mt-12 mb-12 text-sky-950 text-center">
        <Link to={`/`}>
        company.io
       </Link>
                </div>
    <nav className="p-5">
          <div className="container mx-auto flex place-content-center items-center justify-between">
            <ul className="mx-auto flex space-x-36">
              <li>
                <NavLink to="/employees" className="text-sky-950 font-extrabold hover:text-gray-300">Employees</NavLink>
              </li>
              <li>
                <NavLink to="/projects" className="text-sky-950 font-extrabold hover:text-gray-300">Projects</NavLink>
              </li>
              <li>
                <NavLink to="/tasks" className="text-sky-950 font-extrabold hover:text-gray-300">Tasks</NavLink>
              </li>
              <li>
                <NavLink to="/teams" className="text-sky-950 font-extrabold hover:text-gray-300">Teams</NavLink>
              </li>
            </ul>
          </div>
          <hr className='mt-5'></hr>
        </nav>
  </div>
  )
}

export default AppHeader