import React from 'react'
import { NavLink } from 'react-router-dom'
import './sidebar.css'
const Sidebar = () => {


    const logout=()=> {
        localStorage.clear()
        window.history.forward()
    }

  return (
    <div className='sidebar-container'> 
        <div className='sidebar'>

            <h1 className='logo'>Logo</h1>

            <div className='dashboard'>
                <img src="./images/dashboard.png" alt="dashboard"/>
            </div>

            <div className='contact'>
                <img src="./images/contact.png" alt="contact"/>
                <span>Total Contacts |</span>
            </div>

            <div className='logout'>
                <img src="./images/logout.png" alt="logout"/>
                <NavLink to={"/"}><button onClick={logout}>Logout</button></NavLink>
            </div>

        </div>
    </div>
  )
}

export default Sidebar