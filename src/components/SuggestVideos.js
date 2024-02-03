import React, { useState } from 'react'
import useSuggestVideos from '../utils/useSuggestVideos'
import { Link } from 'react-router-dom'
import SearchVideoCard from './SearchVideoCard'

const SuggestVideos = ({category, tags, id}) => {

    const videoList = useSuggestVideos(category, tags, id)
    const [ setSuggestedVideos] = useState(true)
  return (
    <div>
      <div className='flex pl-8' onClick={() => setSuggestedVideos(prev => !prev)}>
        <h1 className='text-2xl font-bold'>Suggestion Video List : </h1>
      </div>
        {
        videoList?.map(video => <Link to={"/watch?v=" + video.id} key={video.id} >
          <SearchVideoCard video={video} />
        </Link>)
      }
    </div>
  )
}

export default SuggestVideos