import React, { useEffect, useState } from 'react'
import useFetch from '../../../hooks/useFetch'
import { Navigate, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import Img from '../../../components/LazyLoadImage/Img';
import './herobanner.scss'
import Movies from './Movies';
const HeroBanner = () => {
  const[query,setquery] = useState('');
  const [index,setindex] = useState(0);

  //fetching data from api
  const {data, loading} = useFetch('/movie/upcoming');
  // console.log(data)
  const [background,setbackground] = useState(''); 

  //importing requiredurls from homeslice
  const {url} = useSelector((state) => state.home)

  //changing data on each reload
  useEffect(() => {
    
  
    const updateBackground = setInterval(()=>{


      const bg = url.backdrop + data?.results?.[index]?.backdrop_path;
      setbackground(bg);
  
      const ind = (index + 1) % 20;
      setindex(ind);
  
      // console.log(bg); // Log the updated value of bg

    },4000)

    return () => clearInterval(updateBackground);
  
  }, [data,index]);

  //navigate query to search page
  const navigate = useNavigate();
  //on enterclicked
  const enterclicked = (e)=>{
    if(e.key === 'Enter' && query.length>0){
      navigate(`/search/${query}`);
    }
  }
  //on searchbtnclick
  const handleclicked = ()=>{
    if(query.length>0){
      navigate(`/search/${query}`)
    }
  }
  
  return (
    <div className='relative'>
      {/* <h1 className='md:text-white'>hii i am heroo banner</h1> */}
      <Img className='w-screen object-cover object-center h-[350px] md:h-[650px] ' src={data?.results?.[index]?.backdrop_path?background:null} />
       
       <div className=' absolute h-[350px] md:h-[650px] inset-0 bg-black opacity-60 '></div>
       <div className='opacity-layer'></div>

       {/* <Movies obj={data?.results?.[index-1]}  /> */}

      <div className='absolute top-0 left-0 h-[300px] md:h-[650px] w-screen flex flex-col gap-6 justify-center items-center text-center'>
        <div className='text-white font-[500]'>
          <h1 className='text-[36px] md:text-[85px] font-[600]'>Welcome.</h1>
          <h4 className='text-[15px] w-[350px] md:w-[650px] md:text-[25px]'>Millions of movies, TV shows and people to discover. Explore now.</h4>
        </div>

        <div className='w-[300px] md:w-[730px] h-[40px] md:h-[56px] rounded-full bg-white overflow-hidden flex gap-0'>
          <input className='w-[70%] md:w-[75%] outline-none text-[12px] md:text-[19px] ml-[40px] h-full' type="text" placeholder='Search for a movie or tv show...' onChange={(e)=>setquery(e.target.value)} onKeyUp={(e)=>enterclicked(e)} />
          <button className='w-[25%] md:w-[20%] h-full btnbgclr text-white font-[500] text-[14px] md:text-[20px] ' onClick={handleclicked} >Search</button>
        </div> 
      </div>

    </div>
  )
}

export default HeroBanner
