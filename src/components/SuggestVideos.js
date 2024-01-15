import React, { useState } from 'react'
import useSuggestVideos from '../utils/useSuggestVideos'
import { Link } from 'react-router-dom'
import VideoCard from './VideoCard'
import SearchVideoCard from './SearchVideoCard'
import { useSelector } from 'react-redux'
import { FaCaretDown, FaCaretRight } from 'react-icons/fa'

const SuggestVideos = ({category, tags, id}) => {

    const { isDark } = useSelector(store => store.app)
    const videoList = useSuggestVideos(category, tags, id)
    const [suggestedVideos, setSuggestedVideos] = useState(true)
  return (
    // <div className='h-full overflow-y-scroll w-full'>
    <div>
      <div className='flex pl-8' onClick={() => setSuggestedVideos(prev => !prev)}>
        <h1 className='text-2xl font-bold'>Suggestion Video List : </h1>
        <span className=' text-blue-800'>{suggestedVideos ? <FaCaretDown className='w-8 h-8' /> : <FaCaretRight className='w-8 h-8' />}</span>
      </div>
        {
        videoList?.map(video => <Link to={"/watch?v=" + video.id} key={video.id} >
          {/* <VideoCard info={video} /> */}
          <SearchVideoCard video={video} />
        </Link>)
      }
    </div>
  )
}

export default SuggestVideos