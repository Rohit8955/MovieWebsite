import React from 'react'
import './../Header/header.scss'
const Footer = () => {
  return (
    <div className='h-[260px] text-white flex flex-col items-center gap-9 w-full mb-0' style={{backgroundColor: "#020c1b"}}>
       <div className='flex gap-6 mt-[50px]'>
          <h4 className='hover:cursor-pointer hover:text-pink-600'>Terms Of Use</h4>
          <h4 className='hover:cursor-pointer hover:text-pink-600'>Privacy-Policy</h4>
          <h4 className='hover:cursor-pointer hover:text-pink-600'>About</h4>
          <h4 className='hover:cursor-pointer hover:text-pink-600'>Blog</h4>
          <h4 className='hover:cursor-pointer hover:text-pink-600'>FAQ</h4>
       </div>
       <p className='text-center text-gray-500 w-[750px]'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
       <div className='flex gap-6'>
          <i className="p-3 px-[15px] hover:cursor-pointer boxshadow rounded-full hover:text-pink-600 text-[17px] fa-brands fa-facebook-f" style={{backgroundColor:"#04152d"}}></i>
          <i className="p-3 px-[13px] hover:cursor-pointer boxshadow rounded-full hover:text-pink-600 text-[17px] fa-brands fa-instagram" style={{backgroundColor:"#04152d"}}></i>
          <i className="p-3 rounded-full hover:cursor-pointer boxshadow text-[17px] hover:text-pink-600 fa-brands fa-twitter" style={{backgroundColor:"#04152d"}}></i>
          <i className="p-3 px-[13px] hover:cursor-pointer boxshadow rounded-full hover:text-pink-600 text-[17px] fa-brands fa-linkedin-in" style={{backgroundColor:"#04152d"}}></i>
       </div>
    </div>
  )
}

export default Footer
