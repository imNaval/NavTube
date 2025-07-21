import React from 'react'
import { useSelector } from 'react-redux'
import { formatDuration } from '../utils/helper'

const ShortVideoCard = ({ video }) => {
    const { channelTitle, title, thumbnails, publishedAt } = video?.snippet
    const { duration } = video?.contentDetails || {}
    const isDark = useSelector(store => store.app.isDark)
    
    // Handle both video details format and search results format
    const videoId = video?.id || video?.id?.videoId

    return (
        <div className={`flex-shrink-0 w-40 ${isDark ? 'text-white' : 'text-black'}`}>
            <div className="relative group cursor-pointer">
                <img 
                    className="w-full h-72 object-cover rounded-xl" 
                    src={thumbnails?.medium?.url || thumbnails?.high?.url} 
                    alt={title}
                />
                <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs px-1 py-0.5 rounded">
                    {formatDuration(duration)}
                </div>
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-200 rounded-xl"></div>
            </div>
            <div className="mt-2 px-1">
                <h3 className="font-medium text-sm line-clamp-2 leading-tight">{title}</h3>
                <p className="text-xs text-gray-500 mt-1">{channelTitle}</p>
            </div>
        </div>
    )
}

export default ShortVideoCard 