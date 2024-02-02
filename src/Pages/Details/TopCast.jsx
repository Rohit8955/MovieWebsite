import React from 'react'
import img from './../../../avatar.png'
import { useSelector } from 'react-redux'

const TopCast = ({casts}) => {
    const {url} = useSelector((state)=>state.home);
    // console.log(casts)
  return casts?.cast?.length>0 && (
    <div className='flex flex-col gap-7'>
      <h1 className='text-[24px] md:text-[28px]'>Top Cast</h1>
      <div className='md:w-[965px] w-full flex gap-3  overflow-x-auto'>
        {
            casts?.cast.slice(0,15).map((elem,idx)=>{
                const path = url.profile + elem?.profile_path
                return (
                    <div className='min-w-[180px] flex flex-col items-center gap-2'>
                        <img className='w-[170px] h-[160px] object-cover rounded-[50%]' src={elem.profile_path?path:img} alt="" />
                        <h1>{elem?.name}</h1>
                        <p className='text-[15px] text-gray-500'>{elem?.character}</p>
                    </div>
                )
            })
        }
      </div>
    </div>
  )
}

export default TopCast
