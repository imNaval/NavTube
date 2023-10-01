import React from 'react'

const VideoCard = ({info}) => {
    // console.log(info)

    const {snippet, statistics} = info;
    const {channelTitle, title, thumbnails} = snippet;

  return (
    <div className='p-2 m-2 w-72 shadow-lg h-80'>
        <img className='rounded-lg transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300'
            alt='videos'
            src={thumbnails.medium.url}
        />
        <ul>
            <li className='font-bold py-2'>{title.length > 60 ? title.substring(0,60) + "..." : title}</li>
            <li>{channelTitle}</li>
            <li>{statistics.viewCount} views</li>
        </ul>
    </div>
  )
}

export default VideoCard