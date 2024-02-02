import React, { useState } from 'react'
import { PlayIcon } from './Playbutton';
import './../Home/herobanner/herobanner.scss'
import Videopopup from '../../components/Videopopup';
const Videos = ({data}) => {
  const [videoid,setvideoid] = useState(null);
  const [show,setshow] = useState(false)
    console.log(data)
  return (
    <div>
        {data?.results.length>0 && (<div className='flex flex-col gap-5 md:gap-7'>
          <h1 className=' text-[24px] md:text-[28px]'>Official Videos</h1>
          <div className='md:w-[965px] w-full flex gap-4 overflow-x-auto'>
            {
              data?.results?.map((elem,idx)=>{
                return (
                  <div className='min-h-[240px] min-w-[310px] flex flex-col gap-3 relative' key={idx} onClick={()=>{setshow(true); setvideoid(elem?.key);}}>
                    <div className=' hover:cursor-pointer rounded-[10px] overflow-hidden'>
                      <img className='w-full max-h-[200px]' src={`https://img.youtube.com/vi/${elem?.key}/mqdefault.jpg`} alt="" />
                    </div>
                    <div className='playbtn absolute top-[21%] left-[35%]'><PlayIcon/></div>
                    <p className=' text-[16px] md:text-[18px]'>{elem?.name}</p>
                  </div>
                )
              })
            }
          </div>
        </div>)}
        <div className='flex items-center justify-center'>
          <Videopopup show={show} setshow={setshow} videoid={videoid} setvideoid={setvideoid}/>
        </div>
      </div>  
  )
}

export default Videos
