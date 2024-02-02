import React from 'react'
import dayjs from 'dayjs'
import Genres from '../Pages/Home/herobanner/genres/Genres';
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import './Header/header.scss'
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
const Cardtemplate = (props) => {
    const rate = "" + props.rating;
    const newrate = rate.slice(0,3);
    const mediatype = props.mediatype;
    const id = props.id;
    let naming = props?.name;
    if(!naming) naming = props?.title;

  return (
    <NavLink link to={`/${mediatype}/${id}`}>
      <div className='flex flex-col h-[270px] md:h-[470px] gap-[14px] md:gap-8 relative  '>
          <div className=' min-h-[190px] min-w-[135px] md:min-h-[350px] md:min-w-[237px] overflow-hidden rounded-md hover:cursor-pointer relative '>
              {/* <Img src={props.path}/> */}
              <img className=' h-[190px]  md:h-[350px] w-full  md:img ' src={props.path} alt="" />
              { props.genres && (<div className='genre'><Genres data={props.genres}/></div>)}
          </div>
          <div className=' absolute w-[30px] md:w-[50px] bottom-[68px] left-3 md:left-3 md:bottom-[96px]'><CircularProgressbar  maxValue={10}   value={props.rating} text={newrate} className=' p-[2px] rounded-[50%] font-[700] bg-white'
          styles={buildStyles({textSize:"34px",textColor:"black",pathColor: props.rating < 5 ? "red" : props.rating < 7 ? "orange" : "green",})} /></div>
          {/* <p className='absolute left-3 bottom-[55px] z-auto text-black font-[600] border-[3px] border-green-600 w-[55px] rounded-full py-4 px-1 text-center overflow-hidden  bg-white'>{newrate}</p> */}
          <div className='text-white  flex flex-col gap-1 md:gap-2'>
            <h4 className='text-[14px] md:text-[21px]'>{naming}</h4>
            <h4 className=' text-[12px] md:text-[13px] text-gray-400'>{dayjs(props.date || props.tvdate).format("MMM D, YYYY")}</h4>
          </div>
      </div>  
  </NavLink>
  )
}

export default Cardtemplate
