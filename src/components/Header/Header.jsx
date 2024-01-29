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
    
    <div className='flex justify-between items-center px-[20px] md:px-[70px] headerclass top-0'>
      <NavLink link to={'/'} ><img className='w-[100px] md:w-[160px]' src={image} alt="" /></NavLink>
      <div className='text-white flex gap-5 text-[18px]'>

        {/*  for desktop */}
        <div className=' flex gap-5 desktop'>
          <NavLink link to={'/explore/movie'}><h4 className='cursor-pointer hover:text-pink-500'>Movies</h4></NavLink>
          <NavLink link to={'/explore/tv'}><h4 className='cursor-pointer hover:text-pink-500'>TV Shows</h4></NavLink>
          {/* <i className="fa-solid fa-magnifying-glass cursor-pointer"></i> */}
        </div>

        {/* for mobile */}
        <div className='mobile flex gap-5 items-center' >
          {
            showmenu === true ? (<i class="fa-solid fa-x" onClick={menuclicked}></i>) : (<i class="fa-solid fa-bars" onClick={menuclicked}></i>)
          }
         {/* {  <i className="fa-solid fa-magnifying-glass cursor-pointer"></i>} */}
        </div>
      </div>
    </div>
    
    
    
  )
}

export default Header
