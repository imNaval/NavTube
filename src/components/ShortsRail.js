import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { YOUTUBE_VIDEO_API, VIDEO_DETAILS_API, SHORTS_TRENDING_API } from '../utils/constant'
import { isShortVideo } from '../utils/helper'
import ShortVideoCard from './ShortVideoCard'

const ShortsRail = () => {
  const [shorts, setShorts] = useState([])
  const [loading, setLoading] = useState(true)
  const { isDark } = useSelector(store => store.app)

  const getShorts = async () => {
    try {
      setLoading(true)
      let shortVideos = []
      
      // Strategy 1: Get trending gaming videos (often contain shorts)
      try {
        const trendingResponse = await fetch(SHORTS_TRENDING_API)
        const trendingData = await trendingResponse.json()
        
        if (trendingData?.items) {
          const trendingShorts = trendingData.items.filter(video => isShortVideo(video))
          shortVideos.push(...trendingShorts)
        }
      } catch (error) {
        console.log('Trending API failed:', error)
      }
      
      // Strategy 2: Get popular videos and filter for shorts
      if (shortVideos.length < 10) {
        try {
          const response = await fetch(YOUTUBE_VIDEO_API)
          const data = await response.json()
          
          if (data?.items) {
            // Get video IDs
            const videoIds = data.items.map(item => item.id)
            
            // Fetch detailed video information
            const chunkSize = 50
            const chunks = []
            for (let i = 0; i < videoIds.length; i += chunkSize) {
              chunks.push(videoIds.slice(i, i + chunkSize))
            }
            
            const allResults = []
            for (const chunk of chunks) {
              const ids = chunk.join(',')
              const detailResponse = await fetch(`${VIDEO_DETAILS_API}&id=${ids}`)
              const detailData = await detailResponse.json()
              if (detailData.items) {
                allResults.push(...detailData.items)
              }
            }
            
            // Filter only short videos
            const popularShorts = allResults.filter(video => isShortVideo(video))
            shortVideos.push(...popularShorts)
          }
        } catch (error) {
          console.log('Popular videos API failed:', error)
        }
      }
      
      // Strategy 3: Search for popular short video terms
      const shortTerms = ['#shorts', 'tiktok', 'reels', 'viral', 'trending shorts']
      for (const term of shortTerms) {
        if (shortVideos.length >= 20) break; // Stop if we have enough
        
        try {
          const searchUrl = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&type=video&videoDuration=short&q=${encodeURIComponent(term)}&key=${process.env.REACT_APP_CREDENTIALS}`
          const searchResponse = await fetch(searchUrl)
          const searchData = await searchResponse.json()
          
          if (searchData?.items && searchData.items.length > 0) {
            const videoIds = searchData.items.map(item => item.id.videoId)
            
            // Fetch details for these videos
            const ids = videoIds.join(',')
            const detailResponse = await fetch(`${VIDEO_DETAILS_API}&id=${ids}`)
            const detailData = await detailResponse.json()
            
            if (detailData.items) {
              const newShorts = detailData.items.filter(video => isShortVideo(video))
              shortVideos.push(...newShorts)
            }
          }
        } catch (error) {
          console.log(`Search for "${term}" failed:`, error)
        }
      }
      
      // Remove duplicates based on video ID
      const uniqueShorts = shortVideos.filter((video, index, self) => 
        index === self.findIndex(v => (v.id || v.id?.videoId) === (video.id || video.id?.videoId))
      )
      
      // Limit to 20 shorts for the rail
      setShorts(uniqueShorts.slice(0, 20))
    } catch (error) {
      console.error('Error fetching shorts:', error)
      setShorts([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getShorts()
  }, [])

  if (loading) {
    return (
      <div className={`py-4 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
        <h2 className={`text-xl font-bold mb-4 px-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Shorts
        </h2>
        <div className="flex gap-4 px-4 overflow-x-auto">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="w-40 flex-shrink-0">
              <div className="w-full aspect-[9/16] bg-gray-300 dark:bg-gray-700 rounded-lg animate-pulse"></div>
              <div className="mt-2 space-y-2">
                <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
                <div className="h-2 bg-gray-300 dark:bg-gray-700 rounded animate-pulse w-3/4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (shorts.length === 0) {
    return null // Don't show the rail if no shorts are found
  }

  return (
    <div className={`py-4 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
      <h2 className={`text-xl font-bold mb-4 px-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
        Shorts
      </h2>
      <div className="flex gap-4 px-4 overflow-x-auto scrollbar-hide">
        {shorts.map((short) => (
          <ShortVideoCard key={short.id} info={short} />
        ))}
      </div>
    </div>
  )
}

export default ShortsRail 