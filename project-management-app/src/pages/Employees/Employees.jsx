import React from 'react'
import './Employees.scss'
import Sidebar from '../../components/Sidebar/Sidebar'
import Navbar from '../../components/Navbar/Navbar'
import EmployeeTable from '../../components/EmployeeTable/EmployeeTable'

function Employees() {
  return (
    <div className='employees'>
        <Sidebar />
        <div className="mainContainer">
            <Navbar />
            <EmployeeTable />
        </div>
    </div>
  )
}

export default Employees