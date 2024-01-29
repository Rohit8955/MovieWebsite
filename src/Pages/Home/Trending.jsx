import React, { useState } from 'react'
import './herobanner/herobanner.scss'
import Cardtemplate from '../../components/Cardtemplate';
import useFetch from '../../hooks/useFetch';
import { useSelector } from 'react-redux';
import Spinner from '../../components/spinner/Spinner';
const Trending = () => {
    const[tab,settab] = useState("day");
    
    const {url} = useSelector((state) => state.home)
    
    const switchtab = (type)=>{
        if(type==="day" && tab==="week"){
            settab("day")
        }
        else if(type==="week" && tab==="day"){
            settab("week")
        }
    }
    const {data, loading} = useFetch(`/trending/movie/${tab}`);
    // console.log(data)
  return (
    <div>
      {
        loading && (<Spinner initial={true}/>)
      }
      {!loading && (<div className='flex flex-col gap-8'>
        <div className='flex justify-center'>
          <div className='flex justify-between w-[1000px]'>
              <h1 className='text-white text-[22px] md:text-[28px] items-center]'>Trending</h1>
              <div className='w-[220px] flex justify-between gap-0 rounded-full font-[500] text-[18px] bg-white text-black px-2 py-1 overflow-hidden'>
                  <button className={` ${tab==="day"?"switchtab":null} w-[110px] py-2 btn rounded-full`} onClick={()=>switchtab("day")}>Day</button>
                  <button className= {` ${tab==="week" ?"switchtab":null} w-[110px] py-2 btn rounded-full`} onClick={()=>switchtab("week")}>Week</button>
              </div>
          </div>
        </div>
          <div className='grid place-items-center'>
            <div className=' flex gap-4 w-[1000px] overflow-x-auto overflow-y-hidden '>
            {
              data?.results?.map((elem,idx)=>{
                const path = url.poster + elem?.poster_path;
                return <Cardtemplate key={idx} mediatype="movie" id={elem.id} genres={elem?.genre_ids.slice(0,2)} path={path} rating={elem?.vote_average} name={elem?.title} date={elem?.release_date}/>
              })
            }
          </div>
          </div>
      </div>)}
      </div>
  )
}

export default Trending
