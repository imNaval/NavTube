import React, { useEffect, useState } from 'react'
import ButtonList from './ButtonList'
import { useDispatch, useSelector } from 'react-redux'
import { SEARCH_VIDEO_API, VIDEO_DETAILS_API } from '../utils/constant'
import { clearSearchVideos, saveSearchVideos } from '../utils/searchSlice'
import { Link, useParams } from 'react-router-dom'
import SearchVideoCard from './SearchVideoCard'
import ShortVideoCard from './ShortVideoCard'
import { ShimmerSearchVideoContainer } from './Shimmer'
import { isShortVideo } from '../utils/helper'

const SearchVideos = () => {
    const dispatch = useDispatch()
    const searchVideos = useSelector(store => store.search.searchVideos)
    const {isMenuOpen} = useSelector(store=> store.app)
    const [width, setWidth] = useState(window.innerWidth)
    const [regularVideos, setRegularVideos] = useState([])
    const [shortVideos, setShortVideos] = useState([])
    const [loading, setLoading] = useState(true)
    let timer;
    const {query} = useParams()

    const handleResize = (e) =>{
        clearTimeout(timer)
        timer = setTimeout(() => {
            setWidth(window.innerWidth)
        }, 200);
    }

    const getVideoDetails = async (videoIds) => {
        try {
            // YouTube API has a limit of 50 IDs per request, so we need to chunk them
            const chunkSize = 50
            const chunks = []
            for (let i = 0; i < videoIds.length; i += chunkSize) {
                chunks.push(videoIds.slice(i, i + chunkSize))
            }
            
            const allResults = []
            for (const chunk of chunks) {
                const ids = chunk.join(',')
                const response = await fetch(`${VIDEO_DETAILS_API}&id=${ids}`)
                const data = await response.json()
                if (data.items) {
                    allResults.push(...data.items)
                }
            }
            return allResults
        } catch (error) {
            console.error('Error fetching video details:', error)
            return []
        }
    }

    const getSearchVideos = async () => {
        try{
            setLoading(true)
            const data = await fetch(SEARCH_VIDEO_API + '&q=' + query)
            const json = await data.json()
            console.log('Search results:', json)
            
            if (json?.items) {
                // Get video IDs from search results
                const videoIds = json.items.map(item => item.id.videoId)
                
                // Fetch detailed video information including duration
                const videoDetails = await getVideoDetails(videoIds)
                
                // Separate regular videos from shorts
                const regular = []
                const shorts = []
                
                videoDetails.forEach(video => {
                    if (isShortVideo(video)) {
                        shorts.push(video)
                    } else {
                        regular.push(video)
                    }
                })
                
                setRegularVideos(regular)
                setShortVideos(shorts)
                dispatch(saveSearchVideos(videoDetails))
                
                // If no video details available, fallback to search results
                if (videoDetails.length === 0) {
                    dispatch(saveSearchVideos(json?.items))
                }
            }
        }
        catch(err){
            console.error(err.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(()=>{
        dispatch(clearSearchVideos())
        getSearchVideos();
        window.addEventListener('resize', handleResize)
        return ()=> window.removeEventListener('resize', handleResize)
    }, [query])

    if(loading) return <ShimmerSearchVideoContainer />

    return (
        <div className={`col-span-11 mb-12 ml-8 ${isMenuOpen && width>800 && 'ml-48'}`}>
            <ButtonList />
            
            {/* Short Videos Rail */}
            {shortVideos.length > 0 && (
                <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-4 px-4">Shorts</h2>
                    <div className="flex gap-4 overflow-x-auto pb-4 px-4 scrollbar-hide">
                        {shortVideos.map(video => (
                            <ShortVideoCard key={video.id || video.id?.videoId} video={video} />
                        ))}
                    </div>
                </div>
            )}
            
            {/* Regular Videos */}
            <div className="space-y-2">
                {regularVideos.map(video => (
                    <Link to={"/watch?v=" + (video.id || video.id?.videoId)} key={video.id || video.id?.videoId}>
                        <SearchVideoCard video={video} />
                    </Link>
                ))}
            </div>
            
            {regularVideos.length === 0 && shortVideos.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                    No videos found for "{query}"
                </div>
            )}
        </div>
    )
}

export default SearchVideos