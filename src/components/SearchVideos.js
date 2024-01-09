import React, { useEffect, useState } from 'react'
import ButtonList from './ButtonList'
import { useDispatch, useSelector } from 'react-redux'
import { SEARCH_VIDEO_API } from '../utils/constant'
import { clearSearchVideos, saveSearchVideos } from '../utils/searchSlice'
import { Link, useParams } from 'react-router-dom'
import SearchVideoCard from './SearchVideoCard'
import { ShimmerSearchVideoContainer } from './Shimmer'

const SearchVideos = () => {

    const dispatch = useDispatch()
    const searchVideos = useSelector(store => store.search.searchVideos)
    const {isMenuOpen} = useSelector(store=> store.app)
    const [width, setWidth] = useState(window.innerWidth)
    let timer;
    const {query} = useParams()

    console.log(searchVideos)

    const handleResize = (e) =>{
        clearTimeout(timer)
        timer = setTimeout(() => {
            setWidth(window.innerWidth)
        }, 200);
    }

    const getSearchVideos = async () => {
        try{
            const data = await fetch(SEARCH_VIDEO_API + '&q=' + query)
            const json = await data.json()
            console.log(json)
            dispatch(saveSearchVideos(json?.items))
        }
        catch(err){
            console.error(err.message)
        }
    }
    useEffect(()=>{
        dispatch(clearSearchVideos())
        getSearchVideos();
        window.addEventListener('resize', handleResize)
        return ()=> window.removeEventListener('resize', handleResize)
    }, [query])

    if(!searchVideos || searchVideos.length === 0) return <ShimmerSearchVideoContainer />
  return (
    <div className={`'col-span-11 mb-12 ml-8' ${isMenuOpen&& width>800 && 'ml-48'}`}>
        <ButtonList />
        {
            searchVideos.map(video => <Link to={"/watch?v=" + video.id?.videoId} key={video.id}>
            <SearchVideoCard video={video} />
            </Link>)
        }
    </div>
  )
}

export default SearchVideos