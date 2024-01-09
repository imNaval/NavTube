import React from 'react'
import { useSelector } from 'react-redux';
import { getRelativeTimeDifference, modifyNumber } from '../utils/helper';
import { FaUpload } from 'react-icons/fa';

const VideoCard = ({info}) => {
    // console.log(info)
    const { isDark} = useSelector(store=> store.app)
    const {snippet, statistics} = info;
    const {channelTitle, title, thumbnails} = snippet;

  return (
    <div className={`p-2 m-2 w-72 shadow-lg h-80 ${isDark && 'bg-gray-950 shadow-gray-900'}`}>
        <img className='rounded-lg transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300'
            alt='videos'
            src={thumbnails.medium.url}
        />
        <ul>
            <li className='font-bold py-2'>{title.length > 60 ? title.substring(0,60) + "..." : title}</li>
            <li>{channelTitle}</li>
            <li className='flex'>
              <span>{modifyNumber(statistics.viewCount)} views</span>
              <span className='ml-2 text-xs'> <FaUpload className='mt-2' /> </span>
              <span>{getRelativeTimeDifference(snippet.publishedAt)}</span>
            </li>
        </ul>
    </div>
  )
}

export default VideoCard