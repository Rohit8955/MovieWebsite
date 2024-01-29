import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroll-component'
import { fetchDataFromApi } from '../../utils/api'
import noresultimg from './../../../no-results.png'
import { useSelector } from 'react-redux'
import dayjs from 'dayjs'
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import useFetch from '../../hooks/useFetch'
import Spinner from '../../components/spinner/Spinner'
import { useEffect } from 'react'
import Cardtemplate from '../../components/Cardtemplate'
import noposterimg from './../../../no-poster.png'
import { NavLink } from 'react-router-dom'
const SearchResult = () => {
  const [data,setdata] = useState(null);
  const [pagenum,setpagenum] = useState(1);
  const [loading,setloading] = useState(false)
  const {query} = useParams();
  const {url} = useSelector((state)=>state.home)

  const fetchInitialData = () => {
    setloading(true);
    fetchDataFromApi(`/search/multi?query=${query}&page=${pagenum}`).then(
        (res) => {
            setdata(res);
            setpagenum((prev) => prev + 1);
            setloading(false);
        }
    );
};

const fetchNextPageData = () => {
    fetchDataFromApi(`/search/multi?query=${query}&page=${pagenum}`).then(
        (res) => {
            if (data?.results) {
                setdata({
                    ...data,
                    results: [...data?.results, ...res.results],
                });
            } else {
                setdata(res);
            }
            setpagenum((prev) => prev + 1);
        }
    );
};

useEffect(() => {
    setpagenum(1);
    fetchInitialData();
}, [query]);
console.log(data)
  return (
    <div>
      {
        loading && <Spinner initial={true}/>
      }
      {
        !loading && (
        <div className='mt-[100px]'>
          
          {
            data?.results?.length>0?
            (
              <div className='flex flex-col px-2 items-center justify-center gap-[30px] md:px-0'>
              <h1 className='text-white text-[18px]  w-full md:w-[1240px] md:text-[24px] '>Search results for {`' ${query} '`}</h1>
              <InfiniteScroll dataLength={data?.results?.length || []} next={fetchNextPageData} hasMore={pagenum<=data?.total_pages} loader={<Spinner/>} className='grid w-full md:px-0 px-[6px] md:w-[1240px] grid-cols-2 gap-y-2 md:gap-y-0 gap-x-[12px] md:gap-x-[7px]  md:grid-cols-5'>
                {
                  data?.results.map((elem,idx)=>{
                    const path = url.poster + elem?.poster_path
                    const rating = elem?.vote_average;
                    const rate = ("" + rating);
                    const newrate = rate.slice(0,3);
                    return (
                      <NavLink link to={`/${elem?.media_type}/${elem?.id}`}>
                          <div className='flex flex-col h-[320px] md:h-[470px] gap-[16px] md:gap-8 relative rounded-md '>
                              <div className=' min-h-[250px] max-h-[250px] min-w-[155px]  md:min-h-[350px] md:min-w-[237px] overflow-hidden rounded-md hover:cursor-pointer relative '>
                                  
                                  <img className=' min-h-full  md:h-[350px] w-full object-contain md:object-cover rounded-md md:img ' src={elem?.poster_path?path:noposterimg} alt="" />
                                  
                              </div>
                              <div className=' absolute w-[30px] md:w-[50px] bottom-[60px] left-3 md:left-3 md:bottom-[96px]'><CircularProgressbar  maxValue={10}   value={rating} text={newrate} className=' p-[2px] rounded-[50%] font-[700] bg-white'
                              styles={buildStyles({textSize:"34px",textColor:"black",pathColor: rating < 5 ? "red" : rating < 7 ? "orange" : "green",})} /></div>
                              {/* <p className='absolute left-3 bottom-[55px] z-auto text-black font-[600] border-[3px] border-green-600 w-[55px] rounded-full py-4 px-1 text-center overflow-hidden  bg-white'>{newrate}</p> */}
                            <div className='text-white  flex flex-col gap-1 md:gap-2'>
                              <h4 className='text-[14px] md:text-[21px]'>{elem?.name?elem?.name.slice(0,18):null || elem?.title?elem?.title.slice(0,18):null}</h4>
                              <h4 className=' text-[12px] md:text-[13px] text-gray-400'>{dayjs(elem?.release_date || elem?.first_air_date).format("MMM D, YYYY")}</h4>
                            </div>
                          </div>  
                      </NavLink>
                    )
                  })
                }
              </InfiniteScroll>
              </div>
            ):(
              <div className='flex items-center justify-center'>
                <img className='h-[300px] md:h-[500px]' src={noresultimg} alt="" />
                <h1 className='text-white text-[18px] md:text-[24px] font-[600]'>Sorry! Result not found</h1>
              </div>
            )
          }
        </div>
        )
      }
    </div>
  )
}

export default SearchResult
