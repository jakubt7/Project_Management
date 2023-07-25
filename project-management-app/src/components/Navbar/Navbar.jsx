import React from 'react'
import './Navbar.scss'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

function Navbar() {
  return (
    <div className='navbar'>
        <div className="container">
            <div className="searchbar">
                <input type='text' placeholder='Search...' />
                <SearchRoundedIcon />
            </div>
            <div className="usermenu">

            </div>
        </div>
    </div>
  )
}

export default Navbar