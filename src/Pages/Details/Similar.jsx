import React from 'react'
import useFetch from '../../hooks/useFetch'
import Cardtemplate from '../../components/Cardtemplate';
import {useSelector } from 'react-redux/es/hooks/useSelector';
import img from './../../../no-poster.png'
const Similar = ({mediatype,id}) => {

    const {data} = useFetch(`/${mediatype}/${id}/similar`)
    const {url} = useSelector((state)=>state.home)
    let title = "TV Shows";
    if(mediatype==="movie") title="Movies"
    console.log(data);
  return data?.results?.length>0 && (
    <div className='flex flex-col gap-[32px] font-[500]'>
        <h1 className='text-[28px]'>Similar {title}</h1>
    <div className='md:w-[990px] flex gap-3 overflow-x-auto '>
      {
        data?.results?.map((elem,idx)=>{
            const path = url.poster + elem?.poster_path
            return <Cardtemplate path={elem?.poster_path?path:img} key={idx} mediatype={mediatype} id={elem?.id} rating={elem?.vote_average} genres={elem?.genre_ids.slice(0,2)} name={elem?.name} title={elem?.title} tvdate={elem?.first_air_date} date={elem?.release_date}/>
        })
      }
    </div>
    </div>
  )
}

export default Similar
