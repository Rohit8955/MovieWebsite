import React from 'react'
import HeroBanner from './herobanner/HeroBanner'
import Switchtab from '../../components/Switchingtab/Switchtab'
import Trending from './Trending'
import Popular from './Popular'
import Toprated from './Toprated'

const Home = () => {
  return (
    <div className='flex flex-col gap-9'>
      <HeroBanner/>
      <Trending/>
      <Popular/>
      <Toprated/>
    </div>
  )
}

export default Home
