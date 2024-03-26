import React, { useState } from 'react'
import { IoIosMenu } from "react-icons/io";
import { NavLink } from 'react-router-dom';
import { HiOutlineXMark } from "react-icons/hi2";


const Menu = () => {
  const [menuNav,setMenuNav]=useState(false)

  const menuNavFunc=()=>{
    if(menuNav===false){
      setMenuNav(true)
    }else{
      setMenuNav(false)
    }
  }
  return (
    <div className='menu'>
        <div className='menu-icons-div'>
          <IoIosMenu onClick={menuNavFunc} className='menu-icons' />
        </div>

        <div className={menuNav?"menu-nav-div":"menu-nav-div-none"}>
          <NavLink className="menu-nav-link" to={"/"}>
            Searching
          </NavLink>
          <NavLink className="menu-nav-link" to={"/report"}>
            Report
          </NavLink>
        </div>
    </div>
  )
}

export default Menu