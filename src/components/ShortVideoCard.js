import React from 'react'
import { Link } from 'react-router-dom'
import { formatDuration, modifyNumber } from '../utils/helper'

const ShortVideoCard = ({ info, video }) => {
  const videoData = info || video
  const { snippet, statistics, contentDetails } = videoData
  const { channelTitle, title, thumbnails } = snippet

  return (
    <Link to={"/shorts/" + videoData.id}>
      <div className="w-40 flex-shrink-0 cursor-pointer group">
        {/* Thumbnail Container */}
        <div className="relative w-full aspect-[9/16] rounded-lg overflow-hidden bg-gray-200">
          <img 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            src={thumbnails?.medium?.url || thumbnails?.high?.url}
            alt={title}
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/160x284/333333/FFFFFF?text=Short'
            }}
          />
          
          {/* Duration Badge */}
          {contentDetails?.duration && (
            <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs px-1 py-0.5 rounded">
              {formatDuration(contentDetails.duration)}
            </div>
          )}
          
          {/* Play Button Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"/>
              </svg>
            </div>
          </div>
        </div>
        
        {/* Video Info */}
        <div className="mt-2 px-1">
          <h3 className="font-medium text-sm line-clamp-2 text-gray-900 dark:text-white">
            {title}
          </h3>
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
            {channelTitle}
          </p>
          {statistics?.viewCount && (
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
              {modifyNumber(statistics.viewCount)} views
            </p>
          )}
        </div>
      </div>
    </Link>
  )
}

export default ShortVideoCard 