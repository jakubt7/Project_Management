import React from "react";
import "./Employees.scss";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import EmployeeTable from "../../components/EmployeeComponents/EmployeeTable/EmployeeTable";
import AppHeader from "../../components/AppHeader/AppHeader";

function Employees() {
  return (
    <div className="app">
      <AppHeader />
      <div className="appContent">
       <EmployeeTable />
      </div>
    </div>
  );
}

export default Employees;
