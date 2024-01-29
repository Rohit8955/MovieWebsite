import React from 'react'
import Img from './LazyLoadImage/Img'
import dayjs from 'dayjs'
import Genres from '../Pages/Home/herobanner/genres/Genres';
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import './Header/header.scss'
import { NavLink } from 'react-router-dom';
// import {url,genres} from './../store/homeslice'
import { useSelector } from 'react-redux';
const Cardtemplate = (props) => {
    const rate = "" + props.rating;
    const newrate = rate.slice(0,3);
    const mediatype = props.mediatype;
    const id = props.id;
  return (
    <NavLink link to={`/${mediatype}/${id}`}>
<div className='flex flex-col h-[230px] md:h-[470px] gap-8 relative rounded-md '>
    <div className=' min-h-[180px] min-w-[180px] md:min-h-[350px]   md:min-w-[237px] overflow-hidden rounded-md hover:cursor-pointer relative '>
        {/* <Img src={props.path}/> */}
        <img className=' h-full  md:h-[350px] w-full object-contain md:object-cover rounded-md img ' src={props.path} alt="" />
         {props.genres && <Genres data={props.genres}/>}
    </div>
    <div className=' absolute w-[50px] left-3 bottom-[96px]'><CircularProgressbar  maxValue={10}   value={props.rating} text={newrate} className=' p-[2px] rounded-[50%] font-[700] bg-white'
    styles={buildStyles({textSize:"34px",textColor:"black",pathColor: props.rating < 5 ? "red" : props.rating < 7 ? "orange" : "green",})} /></div>
    {/* <p className='absolute left-3 bottom-[55px] z-auto text-black font-[600] border-[3px] border-green-600 w-[55px] rounded-full py-4 px-1 text-center overflow-hidden  bg-white'>{newrate}</p> */}
   <div className='text-white  flex flex-col gap-2'>
     <h4 className='text-[21px]'>{props?.name?props?.name.slice(0,18):null || props?.title?props?.title.slice(0,18):null}..</h4>
     <h4 className='text-[13px] text-gray-400'>{dayjs(props.date || props.tvdate).format("MMM D, YYYY")}</h4>
   </div>
</div>  
</NavLink>
  )
}

export default Cardtemplate
