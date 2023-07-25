import React from 'react'
import './Sidebar.scss'
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import TaskIcon from '@mui/icons-material/Task';
import BadgeIcon from '@mui/icons-material/Badge';
import ArchiveIcon from '@mui/icons-material/Archive';
import GroupsIcon from '@mui/icons-material/Groups';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';

function Sidebar() {
  return (
    <div className="sidebar">
        <div className='firstSection'>
            <div className="logo">
                team.io
            </div>
        </div>
        <hr></hr>
        <div className="secondSection">
            <ul>
                <li>
                    <SpaceDashboardIcon className='icon'/>
                    <span>Dashboard</span>
                </li>
            </ul>
            <ul>
                <li>
                    <BadgeIcon className='icon'/>
                    <span>Employees</span>
                </li>
            </ul>
            <ul>
                <li>
                    <ArchiveIcon className='icon'/>
                    <span>Projects</span>
                </li>
            </ul>
            <ul>
                <li>
                    <TaskIcon className='icon'/>
                    <span>Tasks</span>
                </li>
            </ul>
            <ul>
                <li>
                    <GroupsIcon className='icon'/>
                    <span>Teams</span>
                </li>
            </ul>
            <ul>
                <li>
                    <LogoutRoundedIcon className='icon'/>
                    <span>Logout</span>
                </li>
            </ul>
        </div>
        <div className="thirdSection">
            <div className="darkMode"></div>
            <div className="darkMode"></div>
        </div>
    </div>
  )
}

export default Sidebar