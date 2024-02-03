import React, { useEffect, useRef, useState } from 'react'
import { MORE_VIDEO_API, YOUTUBE_VIDEO_API } from '../utils/constant'
import VideoCard from './VideoCard'
import { Link } from 'react-router-dom'
import { ShimmerVideoContainer } from './Shimmer'

const VideoContainer = () => {
  const [videos, setVideos] = useState([])
  const refVideoContainer = useRef(null)
  const refNextPageToken = useRef("");

  const debounce = (func, delay=100) =>{
    let timer;
    return function(){
      let context = this
      let args = arguments
      clearTimeout(timer)

      timer = setTimeout(() => {
        func.apply(context, args)
      }, delay);
    }
  }

  const getMoreVideos = async () =>{
    const data = await fetch(MORE_VIDEO_API + "&pageToken=" + refNextPageToken.current)
    const json = await data.json()

    refNextPageToken.current = json?.nextPageToken
    setVideos(prev => [...prev, ...json.items])
  }
  const getData = () =>{
    if(refVideoContainer?.current?.getBoundingClientRect()){
    const {bottom} = refVideoContainer.current.getBoundingClientRect();
    if(bottom < window.innerHeight && refNextPageToken.current){
      getMoreVideos();
    }
  }
  }
  const handleScroll = debounce(getData)

  const getVideos = async () => {
    try {
      const data = await fetch(YOUTUBE_VIDEO_API);
      const json = await data.json();
      // console.log(json)
      refNextPageToken.current = json?.nextPageToken
      setVideos(json?.items);
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  };
  useEffect(() => {
    getVideos();

    window.addEventListener('scroll', handleScroll);
    return ()=> window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    !videos || videos.length===0 ? <ShimmerVideoContainer /> :
    <div className='flex flex-wrap justify-center' ref={refVideoContainer}>
      {
        videos?.map(video => <Link to={"/watch?v=" + video.id} key={video.id} >
          <VideoCard info={video} />
        </Link>)
      }
    </div>
  )
}

export default VideoContainer
