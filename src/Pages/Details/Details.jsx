import React from 'react'
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch'
import { useSelector } from 'react-redux';
import './../Home/herobanner/herobanner.scss'
import dayjs from 'dayjs';
import { PlayIcon } from './Playbutton';
import TopCast from './TopCast';
import Videos from './Videos';
import Similar from './Similar';
import Recomended from './Recomended';
import noposterimg from './../../../no-poster.png'

const Details = () => {
  const { mediaType, id } = useParams();
  const {data, setloading} = useFetch(`/${mediaType}/${id}`);
  const {data:videos} = useFetch(`/${mediaType}/${id}/videos`)
  const {data:credits} = useFetch(`/${mediaType}/${id}/credits`)

  const {url} = useSelector((state)=>state.home)
   console.log(credits);
   let writers = [];
   let producers = [];
    producers = credits?.crew?.filter((elem,idx)=>{
    return elem?.job === "Producer"
   })
    writers = credits?.crew?.filter((elem)=>{
    return elem?.department === "Writing"
   })

   console.log(producers)
  const backdroppath = url.backdrop + data?.backdrop_path;
  let posterpath = url.poster + data?.poster_path;
  if(!data?.poster_path) posterpath = noposterimg;
  const rating = data?.vote_average
  const rate = ("" + rating).slice(0,3);

  const timeconvert = (totalmin) =>{
    const hrs = Math.floor(totalmin/60);
    const mins = totalmin%60;
    return `${hrs}h ${mins>0?`${mins}m`:""}`
  }
  return (
    <div  className='text-white w-full relative'>
      <div className='relative'>
        <img className='w-full h-[400px] posterimg md:h-[700px]' src={data?.backdrop_path?backdroppath:null} alt="" />
        <div className='w-full absolute inset-0 opacity-80' style={{background:"#04152d"}}></div>
        <div className='absolute opacity-layer' ></div>

        <div className='w-full h-full md:top-0 top-[65px] px-[10px] md:px-0 left-0 absolute flex flex-col md:flex-row items-center md:justify-center md:gap-[45px]'>
          {/* //poster section */}
          <img className=' md:w-[320px] md:h-[500px] rounded-md' src={posterpath} alt="" />

          <div className=' w-full md:w-[600px] flex flex-col gap-4'>

            {/* //title or name section */}
            <h1 className='text-[32px] font-[600]'>{data?.name || data?.title}</h1>

            {/* //tagline section */}
            {data?.tagline!=="" ? <p className='text-gray-400 font-[500] '>{data?.tagline}</p> : null}

            {/* // genres section */}
            <div className='flex gap-4'>
                {
                  data?.genres.map((elem,idx)=>{
                    return (
                      <div className='bg-pink-700 text-[12px] px-2 py-1 rounded-md' key={idx}>{elem?.name}</div>
                    )
                  })
                }
            </div>

            {/* //rating progressbar and play button section */}
            <div className='flex gap-4'>
              <div className='w-[80px] '><CircularProgressbar className='p-[2px] rounded-[50%] font-[700] bg-white' maxValue={10} text={rate} value={rating} styles={buildStyles({textColor:"black", textSize:"38px",background:"white" ,pathColor:rating<5?"red":rating<7?"orange":"green"})} /></div>
              <div className='playbtn'><PlayIcon/></div>
            </div>

            {/* //overview sections */}
            <div className='flex flex-col gap-3'>
              <h1 className='text-[24px]'>Overview</h1>
              <p className='text-start lineheight'>{data?.overview.slice(0,260)}..</p>
            </div>

            {/* // status, release date, runtime section */}
            <div className='flex gap-3'>
                <div className='flex gap-5'>
                  <p>Status:</p>
                  <p className='text-gray-400 font-[600]'>{data?.status}</p>
                </div>
                {
                  data?.release_date ? (<div className='flex gap-5'>
                  <p>Release Date:</p>
                  <p className='text-gray-400 font-[600]'>{dayjs(data?.release_date).format("MMM D, YYYY")}</p>
                </div>) : null
                }
                {
                  data?.runtime ? (<div className='flex gap-5'>
                  <p>Runtime:</p>
                  <p className='text-gray-400 font-[600]'>{timeconvert(data?.runtime)}</p>
                </div>):null
                }
            </div>
            { producers?.length>0  ?
            (<div className='flex gap-3'>
                <h1>Producers: </h1>
                <div className='flex gap-4'>
                  {
                    producers?.slice(0,3).map((elem,idx)=>{
                      return <div className='text-gray-500 font-[600]'>{elem?.name}, </div>
                    })
                  }
                </div>
            </div>):null
            }
            { writers?.length>0 ?
            (<div className='flex gap-3'>
                <h1>Writers: </h1>
                <div className='flex gap-4'>
                  {
                    writers?.slice(0,3).map((elem,idx)=>{
                      return <div className='text-gray-500 font-[600]'>{elem?.name}, </div>
                    })
                  }
                </div>
            </div>):null
            }
          </div>
        </div>
      </div>
      <div className='flex positioning w-full flex-col gap-[20px] md:gap-[30px] md:px-0 px-[10px]'>
          <div className='w-full md:flex md:items-center md:justify-center'><TopCast casts={credits} /></div>
          <div className='w-full md:flex md:items-center md:justify-center'><Videos data={videos}/></div>
          <div className='w-full md:flex md:items-center md:justify-center '> <Similar mediatype={mediaType} id={id}/></div>
          <div className=' w-full md:flex md:items-center md:justify-center'><Recomended mediatype={mediaType} id={id}/></div>
      </div>
    </div>
  )
}

export default Details
