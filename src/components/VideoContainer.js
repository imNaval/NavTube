import React, { useEffect, useState } from 'react'
import { YOUTUBE_VIDEO_API } from '../utils/constant'
import VideoCard from './VideoCard'
import { Link } from 'react-router-dom'

const VideoContainer = () => {

  const [videos, setVideos] = useState([])

  useEffect(() => {
    getVideos();
  }, [])
  const getVideos = async () => {
    const data = await fetch(YOUTUBE_VIDEO_API)
    const json = await data.json()

    // console.log(json)
    setVideos(json.items)
  }

  return (
    <div className='flex flex-wrap justify-center'>
      {/* <VideoCard info={videos[0]} /> */}
      {
        videos.map(video => <Link to={"/watch?v=" + video.id} key={video.id} >
          <VideoCard info={video} />
        </Link>)
      }
    </div>
  )
}

export default VideoContainer
