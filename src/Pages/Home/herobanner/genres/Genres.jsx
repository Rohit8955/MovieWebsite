import React from 'react'
import { useSelector } from 'react-redux'

const Genres = ({data}) => {

    const {genres} = useSelector((state)=>state.home)
  return (
    <div className=' absolute right-3 bottom-2 flex flex-col gap-2 items-start'>
      {
        data?.map((elem,idx)=>{
            return (
                <div key={idx} className='text-white rounded-md px-1  py-[2px] bg-pink-700'>{genres[elem]?.name}</div>
            )
        })
      }
    </div>
  )
}

export default Genres
