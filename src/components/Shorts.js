import React, { useEffect, useState, useRef, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { YOUTUBE_VIDEO_API, VIDEO_DETAILS_API, SHORTS_SEARCH_API, SHORTS_TRENDING_API } from '../utils/constant'
import { isShortVideo, formatDuration } from '../utils/helper'
import { Link } from 'react-router-dom'

const Shorts = () => {
    const [shorts, setShorts] = useState([])
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
    const [loading, setLoading] = useState(true)
    const [playingVideos, setPlayingVideos] = useState(new Set())
    const containerRef = useRef(null)
    const { isDark } = useSelector(store => store.app)

    const getShorts = async () => {
        try {
            setLoading(true)
            console.log('Starting to fetch shorts...')
            
            // Method 1: Try to get shorts using multiple search strategies
            let shortVideos = []
            
            // Strategy 1: Search for videos with "shorts" tag
            try {
                const shortsResponse = await fetch(SHORTS_SEARCH_API)
                const shortsData = await shortsResponse.json()
                
                if (shortsData?.items && shortsData.items.length > 0) {
                    // Get video IDs from shorts search
                    const videoIds = shortsData.items.map(item => item.id.videoId)
                    
                    // Fetch detailed video information for shorts
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
                    
                    shortVideos = allResults.filter(video => isShortVideo(video))
                    console.log('Shorts found via shorts search API:', shortVideos.length)
                }
            } catch (error) {
                console.log('Shorts search API failed:', error)
            }
            
            // Strategy 2: Get trending gaming videos (often contain shorts)
            if (shortVideos.length < 10) {
                try {
                    const trendingResponse = await fetch(SHORTS_TRENDING_API)
                    const trendingData = await trendingResponse.json()
                    
                    if (trendingData?.items) {
                        const trendingShorts = trendingData.items.filter(video => isShortVideo(video))
                        shortVideos.push(...trendingShorts)
                        console.log('Additional shorts found via trending API:', trendingShorts.length)
                    }
                } catch (error) {
                    console.log('Trending API failed:', error)
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
                            console.log(`Shorts found via "${term}" search:`, newShorts.length)
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
            shortVideos = uniqueShorts
            console.log('Total unique shorts found:', shortVideos.length)
            
            // Method 2: Fallback to popular videos if shorts API doesn't work
            if (shortVideos.length === 0) {
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
                    
                    console.log('Total videos fetched:', allResults.length)
                    console.log('Sample video durations:', allResults.slice(0, 5).map(v => ({
                        title: v.snippet?.title,
                        duration: v.contentDetails?.duration
                    })))
                    
                    // Filter only short videos
                    shortVideos = allResults.filter(video => 
                        isShortVideo(video)
                    )
                    
                    console.log('Short videos found:', shortVideos.length)
                }
            }
            
            // If we still don't have enough shorts, add some sample data
            if (shortVideos.length < 5) {
                console.log('Not enough shorts found, adding sample data')
                const sampleShorts = [
                    {
                        id: 'dQw4w9WgXcQ',
                        snippet: {
                            title: 'Rick Astley - Never Gonna Give You Up (Official Music Video)',
                            channelTitle: 'Rick Astley',
                            thumbnails: {
                                high: { url: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg' }
                            },
                            tags: ['shorts', 'music', 'viral']
                        },
                        contentDetails: { duration: 'PT3M33S' },
                        statistics: { viewCount: '1000000' }
                    },
                    {
                        id: 'jNQXAC9IVRw',
                        snippet: {
                            title: 'Me at the zoo',
                            channelTitle: 'jawed',
                            thumbnails: {
                                high: { url: 'https://i.ytimg.com/vi/jNQXAC9IVRw/hqdefault.jpg' }
                            },
                            tags: ['shorts', 'zoo', 'first video']
                        },
                        contentDetails: { duration: 'PT0M19S' },
                        statistics: { viewCount: '500000' }
                    },
                    {
                        id: 'kJQP7kiw5Fk',
                        snippet: {
                            title: 'Eating all the food from Matilda! 📍 Fork n\' Film',
                            channelTitle: 'Fork n\' Film',
                            thumbnails: {
                                high: { url: 'https://i.ytimg.com/vi/kJQP7kiw5Fk/hqdefault.jpg' }
                            },
                            tags: ['foodie', 'shorts', 'matilda', 'eating', 'nycfood', 'cake']
                        },
                        contentDetails: { duration: 'PT1M00S' },
                        statistics: { viewCount: '750000' }
                    },
                    {
                        id: 'w_MVinsdWXo',
                        snippet: {
                            title: 'She\'s still chasing me... even as a Ghost #shorts #funny',
                            channelTitle: 'Funny Shorts',
                            thumbnails: {
                                high: { url: 'https://i.ytimg.com/vi/w_MVinsdWXo/hqdefault.jpg' }
                            },
                            tags: ['shorts', 'funny', 'ghost', 'viral']
                        },
                        contentDetails: { duration: 'PT0M45S' },
                        statistics: { viewCount: '341210' }
                    }
                ]
                shortVideos.push(...sampleShorts)
            }
            
            console.log('Final shorts array:', shortVideos)
            console.log('Shorts array length:', shortVideos.length)
            setShorts(shortVideos)
        } catch (error) {
            console.error('Error fetching shorts:', error)
            // Fallback to sample data if everything fails
            const fallbackShorts = [
                {
                    id: 'dQw4w9WgXcQ',
                    snippet: {
                        title: 'Rick Astley - Never Gonna Give You Up (Official Music Video)',
                        channelTitle: 'Rick Astley',
                        thumbnails: {
                            high: { url: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg' }
                        },
                        tags: ['shorts', 'music', 'viral']
                    },
                    contentDetails: { duration: 'PT3M33S' },
                    statistics: { viewCount: '1000000' }
                }
            ]
            setShorts(fallbackShorts)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getShorts()
    }, [])
    
    // Initialize first video as playing when shorts are loaded
    useEffect(() => {
        if (shorts.length > 0) {
            setPlayingVideos(new Set([0]))
        }
    }, [shorts])



    // Handle scroll to track current video
    const handleScroll = useCallback(() => {
        if (!containerRef.current) return

        const container = containerRef.current
        const scrollTop = container.scrollTop
        const containerHeight = container.clientHeight
        
        // Calculate which video is currently in view
        const videoHeight = containerHeight
        const newIndex = Math.round(scrollTop / videoHeight)
        
        if (newIndex !== currentVideoIndex && newIndex >= 0 && newIndex < shorts.length) {
            setCurrentVideoIndex(newIndex)
            
            // Auto-play the current video and pause others
            const newPlayingVideos = new Set()
            newPlayingVideos.add(newIndex)
            setPlayingVideos(newPlayingVideos)
        }
    }, [currentVideoIndex, shorts.length])

    useEffect(() => {
        const container = containerRef.current
        if (container) {
            container.addEventListener('scroll', handleScroll)
            return () => container.removeEventListener('scroll', handleScroll)
        }
    }, [handleScroll])

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600"></div>
            </div>
        )
    }

    return (
        <div 
            ref={containerRef}
            className="h-screen overflow-y-auto snap-y snap-mandatory bg-black"
        >
            {shorts.length === 0 ? (
                <div className="flex justify-center items-center h-screen text-white">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold mb-4">No Shorts Found</h2>
                        <p className="text-gray-400">Try refreshing the page or check your internet connection.</p>
                    </div>
                </div>
            ) : (
                <>
                    <div className="fixed top-4 left-4 z-10 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                        {shorts.length} Shorts
                    </div>
                    {shorts.map((short, index) => (
                        <div 
                            key={short.id}
                            className="h-screen snap-start flex justify-center items-center relative"
                        >
                            <div className="relative w-full max-w-md h-full flex flex-col">
                                                        {/* Video Player */}
                        <div className="flex-1 flex items-center justify-center relative">


                            <div className="w-full h-full relative transition-all duration-300">
                                {playingVideos.has(index) ? (
                                    // Show embedded video player when playing
                                    <div className="relative w-full h-full">
                                        <iframe
                                            className="w-full h-full rounded-lg"
                                            src={`https://www.youtube.com/embed/${short.id}?autoplay=1&mute=0&controls=1&loop=1&playlist=${short.id}&modestbranding=1&rel=0&enablejsapi=1`}
                                            title={short.snippet?.title}
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        />
                                        {/* Pause button overlay */}
                                        <div className="absolute top-2 left-2">
                                            <button 
                                                className="bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-70 transition-all"
                                                onClick={() => {
                                                    const newPlayingVideos = new Set()
                                                    setPlayingVideos(newPlayingVideos)
                                                }}
                                            >
                                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"/>
                                                </svg>
                                            </button>
                                        </div>
                                        {/* LIVE indicator */}
                                        <div className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full">
                                            LIVE
                                        </div>
                                    </div>
                                ) : (
                                    // Show thumbnail with play button when not playing
                                    <>
                                        <img
                                            className="w-full h-full object-cover rounded-lg"
                                            src={short.snippet?.thumbnails?.high?.url}
                                            alt={short.snippet?.title}
                                            onError={(e) => {
                                                e.target.src = 'https://via.placeholder.com/480x360/333333/FFFFFF?text=Video+Thumbnail'
                                            }}
                                        />
                                        <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                                            <button 
                                                className="bg-red-600 hover:bg-red-700 text-white rounded-full p-4 transition-all transform hover:scale-110"
                                                onClick={() => {
                                                    // Pause all other videos and play this one
                                                    const newPlayingVideos = new Set()
                                                    newPlayingVideos.add(index)
                                                    setPlayingVideos(newPlayingVideos)
                                                }}
                                            >
                                                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"/>
                                                </svg>
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                            {/* Duration Badge */}
                            {short.contentDetails?.duration && (
                                <div className="absolute top-4 right-4 bg-black bg-opacity-80 text-white text-xs px-2 py-1 rounded z-10">
                                    {formatDuration(short.contentDetails.duration)}
                                </div>
                            )}
                        </div>
                                
                                {/* Video Info */}
                                <div className={`absolute bottom-20 left-4 right-4 text-white ${isDark ? 'text-white' : 'text-white'}`}>
                                    <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                                        {short.snippet?.title}
                                    </h3>
                                    <p className="text-sm opacity-90 mb-1">
                                        {short.snippet?.channelTitle}
                                    </p>
                                    <p className="text-xs opacity-75">
                                        {short.statistics?.viewCount && 
                                            `${(parseInt(short.statistics.viewCount) / 1000).toFixed(0)}K views`
                                        }
                                    </p>
                                </div>
                                
                                {/* Action Buttons */}
                                <div className="absolute bottom-20 right-4 flex flex-col gap-4">
                                    <button className="bg-white bg-opacity-20 rounded-full p-3 hover:bg-opacity-30 transition-all">
                                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"/>
                                            <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"/>
                                        </svg>
                                    </button>
                                    <button className="bg-white bg-opacity-20 rounded-full p-3 hover:bg-opacity-30 transition-all">
                                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"/>
                                        </svg>
                                    </button>
                                    <button className="bg-white bg-opacity-20 rounded-full p-3 hover:bg-opacity-30 transition-all">
                                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </>
            )}
        </div>
    )
}

export default Shorts 