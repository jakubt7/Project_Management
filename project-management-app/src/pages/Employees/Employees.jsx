import React from "react";
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
