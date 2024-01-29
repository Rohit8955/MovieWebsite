import React, { useState } from 'react'
import Cardtemplate from '../../components/Cardtemplate'
import { useSelector } from 'react-redux';
import useFetch from '../../hooks/useFetch'
import './herobanner/herobanner.scss'
import Spinner from '../../components/spinner/Spinner';
const Toprated = () => {
    const [tab,settab] = useState("movie")
    
    const {url} = useSelector((state)=>state.home);
    const switchtab = (type) =>{
        if(type==="movie" && tab==="tv"){
            settab("movie");
        }
        else if(type==="tv" && tab==="movie"){
            settab("tv");
        }
    }
    const {data,loading} = useFetch(`/${tab}/top_rated`)
    // console.log(data);
  return (
    <div>
    <div className='flex flex-col gap-8'>
      <div className='flex justify-center '>
        <div className='flex justify-between item-center w-full px-[20px] md:px-0 md:w-[1000px]'>
            <h1 className='text-white text-[22px] md:text-[28px] items-center]'>Top Rated</h1>
            <div className='w-[140px] md:w-[220px] flex justify-between gap-0 rounded-full font-[500] text-[14px] md:text-[18px] bg-white text-black px-2 py-1 overflow-hidden'>
                <button className={` ${tab==="movie"?"switchtab":null} w-[70px] md:w-[110px] py-2 btn rounded-full`} onClick={()=>switchtab("movie")}>Movie</button>
                <button className= {` ${tab==="tv" ?"switchtab":null} w-[70px] md:w-[110px] py-2 btn rounded-full`} onClick={()=>switchtab("tv")}>Shows</button>
            </div>
        </div>
      </div>
        <div className='grid place-items-center px-[20px] md:px-0'>
        {
            loading && (<Spinner initial={true}/>)
        }
        { !loading &&
          <div className=' flex gap-1 md:gap-4 w-full md:w-[1000px] overflow-x-auto overflow-y-hidden '>
          {
            data?.results?.map((elem,idx)=>{
              const path = url.poster + elem?.poster_path;
              return <Cardtemplate key={idx} mediatype={tab} id={elem.id} genres={elem?.genre_ids.slice(0,2)} path={path} rating={elem?.vote_average} name={elem?.title} title={elem?.name} tvdate={elem?.first_air_date} date={elem?.release_date}/>
            })
          }
          </div>
        } 
        </div>
    </div>
    </div>
  )
}

export default Toprated
