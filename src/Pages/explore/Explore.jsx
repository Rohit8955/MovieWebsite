import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import Select from "react-select";
import './explore.scss'
import useFetch from "../../hooks/useFetch";
import { fetchDataFromApi } from "../../utils/api";
import Spinner from "../../components/spinner/Spinner";
import Cardtemplate from "../../components/Cardtemplate";
import MovieCard from "../../components/moviecard/MovieCard";
import dayjs from "dayjs";
import { NavLink } from "react-router-dom";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import noposterimg from './../../../no-poster.png'
import { useSelector } from "react-redux";

let filters = {};

const sortbyData = [
    { value: "popularity.desc", label: "Popularity Descending" },
    { value: "popularity.asc", label: "Popularity Ascending" },
    { value: "vote_average.desc", label: "Rating Descending" },
    { value: "vote_average.asc", label: "Rating Ascending" },
    {
        value: "primary_release_date.desc",
        label: "Release Date Descending",
    },
    { value: "primary_release_date.asc", label: "Release Date Ascending" },
    { value: "original_title.asc", label: "Title (A-Z)" },
];
const Explore = () => {
  const [data, setData] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(false);
  const [genre, setGenre] = useState(null);
  const [sortby, setSortby] = useState(null);
  const { mediaType } = useParams();
  const {url} = useSelector((state)=>state.home)
  const { data: genresData } = useFetch(`/genre/${mediaType}/list`);
  
  const fetchInitialData = () => {
      setLoading(true);
      fetchDataFromApi(`/discover/${mediaType}`, filters).then((res) => {
          setData(res);
          setPageNum((prev) => prev + 1);
          setLoading(false);
      });
  };

  const fetchNextPageData = () => {
      fetchDataFromApi(
          `/discover/${mediaType}?page=${pageNum}`,
          filters
      ).then((res) => {
          if (data?.results) {
              setData({
                  ...data,
                  results: [...data?.results, ...res.results],
              });
          } else {
              setData(res);
          }
          setPageNum((prev) => prev + 1);
      });
  };

  useEffect(() => {
      filters = {};
      setData(null);
      setPageNum(1);
      setSortby(null);
      setGenre(null);
      fetchInitialData();
  }, [mediaType]);

  const onChange = (selectedItems, action) => {
      if (action.name === "sortby") {
          setSortby(selectedItems);
          if (action.action !== "clear") {
              filters.sort_by = selectedItems.value;
          } else {
              delete filters.sort_by;
          }
      }

      if (action.name === "genres") {
          setGenre(selectedItems);
          if (action.action !== "clear") {
              let genreId = selectedItems.map((g) => g.id);
              genreId = JSON.stringify(genreId).slice(1, -1);
              filters.with_genres = genreId;
          } else {
              delete filters.with_genres;
          }
      }

      setPageNum(1);
      fetchInitialData();
  };
  return (
    
    <div className="explorePage">
            <div className="flex flex-col gap-5">
              <div className="flex items-center justify-center">
                <div className="pageHeader w-[450px] px-3 md:px-0 md:w-[1265px]">
                    <div className="pageTitle">
                        {mediaType === "tv"
                            ? "Explore TV Shows"
                            : "Explore Movies"}
                    </div>
                    <div className="filters">
                        <Select
                            isMulti
                            name="genres"
                            value={genre}
                            closeMenuOnSelect={false}
                            options={genresData?.genres}
                            getOptionLabel={(option) => option.name}
                            getOptionValue={(option) => option.id}
                            onChange={onChange}
                            placeholder="Select genres"
                            className="react-select-container genresDD"
                            classNamePrefix="react-select"
                        />
                        <Select
                            name="sortby"
                            value={sortby}
                            options={sortbyData}
                            onChange={onChange}
                            isClearable={true}
                            placeholder="Sort by"
                            className="react-select-container sortbyDD"
                            classNamePrefix="react-select"
                        />
                    </div>
                </div>
                </div>
                {loading && <Spinner initial={true} />}
                {!loading && (
                  <div className="grid place-items-center md:px-0 px-3">
                    <div className="md:w-[1265px]">
                        {data?.results?.length > 0 ? ( 
                            <InfiniteScroll
                                className="grid w-full gap-[10px] grid-cols-2 md:grid-cols-5"
                                dataLength={data?.results?.length || []}
                                next={fetchNextPageData}
                                hasMore={pageNum <= data?.total_pages}
                                loader={<Spinner />}
                            >
                                {data?.results?.map((elem, index) => {
                                    if (elem?.media_type === "person") return;
                                    const path = url.poster + elem?.poster_path;
                                    const rating = elem?.vote_average;
                                    const rate = (""+rating);
                                    const newrate = rate.slice(0,3);
                                    let name = elem?.name;
                                    if(!name) name = elem?.title
                                    return (
                                      
                                        <NavLink link to={`/${elem?.media_type}/${elem?.id}`}>
                                            <div className='flex flex-col h-[320px] md:h-[470px] gap-[16px] md:gap-8 relative '>
                                                <div className=' min-h-[250px] max-h-[250px] min-w-[155px]  md:min-h-[350px] md:min-w-[237px] overflow-hidden rounded-md hover:cursor-pointer relative '>
                                                    
                                                    <img className=' min-h-[250px]  md:min-h-[350px] w-full md:img ' src={elem?.poster_path?path:noposterimg} alt="" />
                                                    
                                                </div>
                                                <div className=' absolute w-[40px] md:w-[50px] bottom-[55px] left-3 md:left-3 md:bottom-[96px]'><CircularProgressbar  maxValue={10}   value={rating} text={newrate} className=' p-[2px] rounded-[50%] font-[700] bg-white'
                                                styles={buildStyles({textSize:"34px",textColor:"black",pathColor: rating < 5 ? "red" : rating < 7 ? "orange" : "green",})} /></div>
                                                {/* <p className='absolute left-3 bottom-[55px] z-auto text-black font-[600] border-[3px] border-green-600 w-[55px] rounded-full py-4 px-1 text-center overflow-hidden  bg-white'>{newrate}</p> */}
                                                <div className='text-white  flex flex-col gap-1 md:gap-2'>
                                                <h4 className='text-[14px] md:text-[21px]'>{name}</h4>
                                                <h4 className=' text-[12px] md:text-[13px] text-gray-400'>{dayjs(elem?.release_date || elem?.first_air_date).format("MMM D, YYYY")}</h4>
                                                </div>
                                            </div>  
                                        </NavLink>
                                    
                                        
                                    )
                                })}
                            </InfiniteScroll>
                        ) : (
                            <span className="resultNotFound">
                                Sorry, Results not found!
                            </span>
                        )}
                    </div>
                    </div>
                )}
            </div>
        </div>
        
    );

}

export default Explore
