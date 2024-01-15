import { useEffect, useState } from "react"
import { CREDENTIALS } from "./constant"

const useSuggestVideos = (cId, tags, vId) => {
    const [videos, setVideos] = useState([])
    const [videoCategory, SetVideoCategory] = useState([])
    const [videoTags, SetVideoTags] = useState([])

    const apiKey = CREDENTIALS

    const getRelatedVideos = async() =>{
        // const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&chart=mostPopular&regionCode=IN&maxResults=50&relatedToVideoId=${vId}&key=${apiKey}`
        const url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet,contentDetails,statistics&maxResults=50&order=viewCount&regionCode=IN&type=video&videoCategoryId=${cId}&key=${apiKey}`
        const data = await fetch(url)
        const json = await data.json()
        console.log(json)
        setVideos(json.items)
    }

    const getCategorySuggestedVideos = async() =>{
        const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&chart=mostPopular&regionCode=IN&maxResults=50&videoCategoryId=${cId}&key=${apiKey}`
        const data = await fetch(url)
        const json = await data.json()
        // setVideos(json?.items)
        // setVideos(prev => [...prev, ...json?.items])
        json?.items && SetVideoCategory(json?.items)
    }

    const getTagsSuggestedVideos = async() =>{
        const apiKey = CREDENTIALS
        const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&chart=mostPopular&maxResults=50&key=${apiKey}&q=${tags.join('|')}`
        const data = await fetch(url)
        const json = await data.json()
        json?.items && SetVideoTags(json?.items)
    }

    useEffect(()=>{
        getCategorySuggestedVideos();
        getTagsSuggestedVideos()
    }, [cId, tags])

    useEffect(()=>{
        setVideos([...videoCategory, ...videoTags])
    }, [videoCategory, videoTags])

    return videos;
}

export default useSuggestVideos;