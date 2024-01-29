import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroll-component'
import { fetchDataFromApi } from '../../utils/api'
import noresultimg from './../../../no-results.png'
import { useSelector } from 'react-redux'
import useFetch from '../../hooks/useFetch'
import Spinner from '../../components/spinner/Spinner'
import { useEffect } from 'react'
import Cardtemplate from '../../components/Cardtemplate'
import noposterimg from './../../../no-poster.png'
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
              <div className='flex flex-col px-1 items-center justify-center gap-[30px]'>
                <h1 className='text-white text-[18px] w-full md:w-[1240px] md:text-[24px] '>Search results for {`${query}`}</h1>
              <InfiniteScroll dataLength={data?.results?.length || []} next={fetchNextPageData} hasMore={pagenum<=data?.total_pages} loader={<Spinner/>} className='grid w-full md:w-[1240px] grid-cols-3 gap-x-[6px] md:gap-x-[7px]  md:grid-cols-5'>
                {
                  data?.results.map((elem,idx)=>{
                    const path = url.poster + elem?.poster_path
                    return <Cardtemplate path={elem?.poster_path?path:noposterimg} rating={elem?.vote_average} name={elem?.name} title={elem?.title} date={elem?.release_date} tvdate={elem?.first_air_date} mediatype={elem?.media_type} id={elem?.id} />
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
