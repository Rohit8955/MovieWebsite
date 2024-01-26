import React from 'react'
import './../Header/header.scss'
const Switchtab = () => {
  return (
    <div className='w-[180px] flex justify-between gap-0 rounded-full font-[500] text-[18px] bg-white text-black px-2 py-1 overflow-hidde ml-9 mb-5'>
      <button className=' switchtab w-[90px] py-2 rounded-full'>Day</button>
      <button className=' w-[90px] py-2 rounded-full'>Week</button>
    </div>
  )
}

export default Switchtab
