import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import image from './../../../movix-logo.svg'
import './header.scss'
import './../../App.css'
const Header = () => {

  const [showmenu, setshowmenu] = useState(false);
  // const [showsearch,setshowsearch] = useState(false)
  const menuclicked = ()=>{
    if(showmenu===false) setshowmenu(true);
    else setshowmenu(false)
  }

  return (
    <div className='relative'>
    <div className='flex justify-between w-full items-center px-[20px] md:px-[70px] headerclass top-0'>
      <NavLink link to={'/'} ><img className='w-[100px] md:w-[160px]' src={image} alt="ee" /></NavLink>
      <div className='text-white flex gap-5 text-[18px]'>

        {/*  for desktop */}
        <div className=' flex gap-5 desktop'>
          <NavLink link to={'/explore/movie'}><h4 className='cursor-pointer hover:text-pink-500'>Movies</h4></NavLink>
          <NavLink link to={'/explore/tv'}><h4 className='cursor-pointer hover:text-pink-500'>TV Shows</h4></NavLink>
          {/* <i className="fa-solid fa-magnifying-glass cursor-pointer"></i> */}
        </div>

        {/* for mobile */}
        <div className='mobile ' >
          {
            showmenu === true ? (
              <i className="fa-solid fa-x" onClick={menuclicked}></i>) : (<i class="fa-solid fa-bars" onClick={menuclicked}></i>)
          }
        </div>
      </div>
    </div>

    {
      showmenu &&(
       
        <div className=' flex flex-col gap-4 absolute mobileheader w-full top-[60px] z-10 px-4 py-[24px] text-[18px] text-white'  >
          <NavLink link to={'/explore/movie'}><h4 className='cursor-pointer hover:text-pink-500' >Movies</h4></NavLink>
          <NavLink link to={'/explore/tv'}><h4 className='cursor-pointer hover:text-pink-500' >TV Shows</h4></NavLink>
          {/* <div className='flex gap-2'>
            <i className="fa-solid fa-magnifying-glass cursor-pointer"></i>
            <h4>Search</h4>
          </div> */}
        </div>
      )
    }
    </div>
  )
}

export default Header
