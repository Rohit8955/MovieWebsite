import React from 'react'

const Movies = (props) => {

//   const {overview} = props.obj;
  return (
    <div className='absolute top-0 left-0 w-[500px] h-full text-[20px] text-white flex flex-col justify-center ml-[50px] gap-4'>
       <h1 className='text-[38px]'>{props?.obj?.title}</h1>
       <p className='text-[22px]'>{props?.obj?.overview.slice(0, 220)}..</p>
       <div className='flex justify-between items-center text-center'>
            <h4 className='w-[50px] px-1 py-3 text-center bg-white overflow-hidden text-black rounded-[50%] border-[4px] border-green-600'>{props?.obj?.vote_average}</h4>
            <h4>Release Date: {props?.obj?.release_date}</h4>
       </div>
    </div>
  )
}

export default Movies
