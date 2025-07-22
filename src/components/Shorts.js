import React, { useEffect, useState, useRef, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { YOUTUBE_VIDEO_API, VIDEO_DETAILS_API, SHORTS_SEARCH_API, SHORTS_TRENDING_API } from '../utils/constant'
import { isShortVideo, formatDuration } from '../utils/helper'
import { Link } from 'react-router-dom'

const Shorts = () => {
    const { videoId } = useParams()
    const navigate = useNavigate()
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
            
            // Check localStorage for cached shorts (but not if we have a specific videoId)
            if (!videoId) {
                const cachedShorts = localStorage.getItem('cachedShorts')
                if (cachedShorts) {
                    const parsedShorts = JSON.parse(cachedShorts)
                    console.log('Using cached shorts:', parsedShorts.length)
                    setShorts(parsedShorts)
                    setLoading(false)
                    return
                }
            }
            
            // If we have a specific videoId, try to fetch that video first
            let targetVideo = null
            if (videoId) {
                try {
                    console.log('Fetching specific video:', videoId)
                    const detailResponse = await fetch(`${VIDEO_DETAILS_API}&id=${videoId}`)
                    const detailData = await detailResponse.json()
                    if (detailData.items && detailData.items.length > 0) {
                        targetVideo = detailData.items[0]
                        console.log('Found target video:', targetVideo.snippet?.title)
                    }
                } catch (error) {
                    console.log('Failed to fetch target video:', error)
                }
            }
            
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
            
            // Add target video to the beginning if it exists and is not already in the list
            if (targetVideo) {
                const targetVideoId = targetVideo.id || targetVideo.id?.videoId || targetVideo.videoId
                const isAlreadyInList = shortVideos.some(video => {
                    const videoId = video.id || video.id?.videoId || video.videoId
                    return videoId === targetVideoId
                })
                
                if (!isAlreadyInList) {
                    shortVideos.unshift(targetVideo) // Add to beginning
                    console.log('Added target video to beginning of shorts list')
                } else {
                    console.log('Target video already in shorts list')
                }
            }
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
                            tags: ['music', 'viral']
                        },
                        contentDetails: { duration: 'PT0M45S' },
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
                            tags: ['foodie', 'matilda', 'eating', 'nycfood', 'cake']
                        },
                        contentDetails: { duration: 'PT0M55S' },
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
            
            // Cache the shorts data in localStorage (only if no specific videoId)
            if (!videoId) {
                localStorage.setItem('cachedShorts', JSON.stringify(shortVideos))
            }
            
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
                        tags: ['music', 'viral']
                    },
                    contentDetails: { duration: 'PT0M45S' },
                    statistics: { viewCount: '1000000' }
                }
            ]
            // Cache the fallback shorts data (only if no specific videoId)
            if (!videoId) {
                localStorage.setItem('cachedShorts', JSON.stringify(fallbackShorts))
            }
            setShorts(fallbackShorts)
        } finally {
            setLoading(false)
        }
    }

    // Function to refresh shorts (clear cache and refetch)
    const refreshShorts = () => {
        localStorage.removeItem('cachedShorts')
        getShorts()
    }

    useEffect(() => {
        getShorts()
    }, []) // Only fetch once on mount
    
    // Initialize first video as playing when shorts are loaded
    useEffect(() => {
        if (shorts.length > 0) {
            if (videoId) {
                console.log('Looking for video ID:', videoId)
                console.log('Available shorts:', shorts.map(s => ({ id: s.id || s.id?.videoId || s.videoId, title: s.snippet?.title })))
                // Find the index of the specific video
                const targetIndex = shorts.findIndex(short => {
                    const shortId = short.id || short.id?.videoId || short.videoId
                    return shortId === videoId
                })
                console.log('Found video at index:', targetIndex)
                if (targetIndex !== -1) {
                    setCurrentVideoIndex(targetIndex)
                    setPlayingVideos(new Set([targetIndex]))
                } else {
                    console.log('Video not found in shorts list, starting from first video')
                    // Update URL to first video
                    const firstVideoId = shorts[0].id || shorts[0].id?.videoId || shorts[0].videoId
                    navigate(`/shorts/${firstVideoId}`, { replace: true })
                    setCurrentVideoIndex(0)
                    setPlayingVideos(new Set([0]))
                }
            } else {
                console.log('No video ID provided, redirecting to first video')
                // Redirect to first video with its ID
                const firstVideoId = shorts[0].id || shorts[0].id?.videoId || shorts[0].videoId
                navigate(`/shorts/${firstVideoId}`, { replace: true })
                setCurrentVideoIndex(0)
                setPlayingVideos(new Set([0]))
            }
        }
    }, [shorts, videoId, navigate])



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
            
            // Update URL to reflect current video
            const currentVideo = shorts[newIndex]
            if (currentVideo) {
                const currentVideoId = currentVideo.id || currentVideo.id?.videoId || currentVideo.videoId
                if (currentVideoId) {
                    navigate(`/shorts/${currentVideoId}`, { replace: true })
                }
            }
            
            // Auto-play the current video and pause others
            const newPlayingVideos = new Set()
            newPlayingVideos.add(newIndex)
            setPlayingVideos(newPlayingVideos)
        }
    }, [currentVideoIndex, shorts.length, shorts, navigate])

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
            className="h-screen overflow-y-auto snap-y snap-mandatory bg-gray-900"
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
                    {shorts.map((short, index) => {
                        const shortId = short.id || short.id?.videoId || short.videoId
                        return (
                        <div 
                            key={shortId}
                            className="h-screen snap-start flex items-start justify-center bg-black pb-20 pt-8"
                        >
                            <div className="relative w-full max-w-sm px-4">
                                {/* Video Player */}
                                <div className="relative">
                                        <div className="w-full aspect-[9/16] max-h-[75vh] relative transition-all duration-300">
                                {playingVideos.has(index) ? (
                                    // Show embedded video player when playing
                                    <div className="relative w-full h-full">
                                        <iframe
                                            className="w-full aspect-[9/16] max-h-[75vh] rounded-lg"
                                            src={`https://www.youtube.com/embed/${shortId}?autoplay=1&mute=0&controls=0&loop=1&playlist=${shortId}&modestbranding=1&rel=0&enablejsapi=1&showinfo=0&iv_load_policy=3&fs=0`}
                                            title={short.snippet?.title}
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        />
                                        {/* Custom Video Controls */}
                                        <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
                                            {/* Left side - Play button */}
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
                                            
                                            {/* Right side - Volume and Size */}
                                            <div className="flex gap-2">
                                                <button className="bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-70 transition-all">
                                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.794L4.383 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.383l4.017-2.794a1 1 0 011.617.794zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z" clipRule="evenodd"/>
                                                    </svg>
                                                </button>
                                                <button className="bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-70 transition-all">
                                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                        <path d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 11-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12z"/>
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    // Show thumbnail with play button when not playing
                                    <>
                                        <img
                                            className="w-full aspect-[9/16] max-h-[75vh] object-cover rounded-lg"
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
                                
                                {/* Video Info - YouTube Style 3 Lines */}
                                <div className={`absolute -bottom-12 left-4 right-20 text-white ${isDark ? 'text-white' : 'text-white'}`}>
                                    <p className="text-sm font-medium mb-1">
                                        @{short.snippet?.channelTitle?.replace(/\s+/g, '')}
                                    </p>
                                    <h3 className="font-semibold text-base mb-1 line-clamp-2">
                                        {short.snippet?.title}
                                    </h3>
                                    {/* <p className="text-xs opacity-75">
                                        {short.snippet?.tags?.slice(0, 3).map(tag => `#${tag}`).join(' ') || 'Music'}
                                    </p> */}
                                </div>
                                
                                {/* Action Buttons - Right Side */}
                                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex flex-col gap-4">
                                    <button className="bg-white bg-opacity-20 rounded-full p-2 hover:bg-opacity-30 transition-all">
                                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"/>
                                            <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"/>
                                        </svg>
                                    </button>
                                    <button className="bg-white bg-opacity-20 rounded-full p-2 hover:bg-opacity-30 transition-all">
                                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"/>
                                        </svg>
                                    </button>
                                    <button className="bg-white bg-opacity-20 rounded-full p-2 hover:bg-opacity-30 transition-all">
                                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                                        </svg>
                                    </button>
                                </div>
                                
                                {/* Progress Bar - Bottom */}
                                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-600">
                                    <div className="h-full bg-red-600 w-1/3"></div>
                                </div>
                            </div>
                        </div>
                    )
                    })}
                </>
            )}
        </div>
    )
}

export default Shorts 