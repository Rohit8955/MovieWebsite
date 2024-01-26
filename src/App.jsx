import { useEffect, useState } from 'react'
import {fetchDataFromApi} from './utils/api'
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Details from './Pages/Details/Details'
import SearchResult from './Pages/Serachresult/SearchResult'
import Explore from './Pages/explore/Explore'
import Error from './Pages/404/Error'
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer'
import { useDispatch, useSelector } from 'react-redux';
import {getApiConfiguration,getGenres} from './store/homeslice'

function App() {

  const dispatch = useDispatch();
  
  
  useEffect(()=>{
    apiTesting();
    genresCall();
  }, [])
  const apiTesting = ()=>{
    fetchDataFromApi('/configuration').then((res)=>{
      // console.log(res)
      const url = {
        backdrop: res.images.secure_base_url + "original",
        poster: res.images.secure_base_url + "original",
        profile: res.images.secure_base_url + "original",
      };
      dispatch(getApiConfiguration(url));
    })
  }
  
  const genresCall = async () => {
    let promises = [];
    let endPoints = ["tv", "movie"];
    let allGenres = {};

    endPoints.forEach((url) => {
        promises.push(fetchDataFromApi(`/genre/${url}/list`));
    });

    const data = await Promise.all(promises);
    console.log(data);
    data.map(({ genres }) => {
        return genres.map((item) => (allGenres[item.id] = item));
    });

    dispatch(getGenres(allGenres));
};
  return (
    
      <BrowserRouter>
       <Header/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/:mediaType/:id' element={<Details/>}/>
          <Route path='/search/:query' element={<SearchResult/>}/>
          <Route path='/explore/:mediaType' element={<Explore/>}/>
          <Route path='*' element={<Error/>}/>
        </Routes>
       <Footer/> 
      </BrowserRouter>
    
  )
}

export default App
