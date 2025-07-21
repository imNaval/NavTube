import React from 'react'
import { useSelector } from 'react-redux'
import { formatDuration, getRelativeTimeDifference } from '../utils/helper'

const SearchVideoCard = (props) => {
    const { channelId, channelTitle, description, title, thumbnails, publishedAt } = props?.video?.snippet
    const { duration, viewCount } = props?.video?.contentDetails || {}
    const { statistics } = props?.video || {}
    const isDark = useSelector(store=> store.app.isDark)
    
    // Handle both video details format and search results format
    const videoId = props?.video?.id || props?.video?.id?.videoId

    return (
        <div className={`flex gap-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200 cursor-pointer ${isDark ? 'text-white' : 'text-black'}`}>
            <div className='relative flex-shrink-0'>
                <img 
                    className='w-80 h-44 object-cover rounded-lg' 
                    src={thumbnails?.high?.url} 
                    alt={title} 
                />
                {duration && (
                    <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs px-1 py-0.5 rounded">
                        {formatDuration(duration)}
                    </div>
                )}
            </div>
            <div className='flex-1 min-w-0'>
                <h2 className='font-medium text-lg leading-tight line-clamp-2 mb-2'>{title}</h2>
                <div className='text-sm text-gray-600 dark:text-gray-400 mb-1'>
                    {channelTitle}
                </div>
                <div className='text-sm text-gray-600 dark:text-gray-400 mb-2'>
                    {statistics?.viewCount && `${(parseInt(statistics.viewCount) / 1000).toFixed(0)}K views`} • {publishedAt && getRelativeTimeDifference(publishedAt)}
                </div>
                <p className='text-sm text-gray-600 dark:text-gray-400 line-clamp-2'>
                    {description}
                </p>
            </div>
        </div>
    )
}

export default SearchVideoCard