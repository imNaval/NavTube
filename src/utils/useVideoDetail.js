import { useEffect, useState } from "react";
import { CREDENTIALS } from "./constant";

const useVideoDetails = (vId) =>{
    const [videoDetail, setVideoDetail] = useState(null)
    const key = CREDENTIALS
    const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${vId}&key=${key}`
    const getVideoDetail = async () =>{
        const data = await fetch(url)
        const json = await data.json();

        const videoDetails = json.items[0];
        const channelId = videoDetails.snippet.channelId;
        const channelResponse = await fetch(`https://www.googleapis.com/youtube/v3/channels?part=snippet,contentDetails,statistics&id=${channelId}&key=${key}`);
        const channelData = await channelResponse.json();

        setVideoDetail({video: json?.items[0], channel: channelData.items[0]})
    }

    useEffect(()=>{
        getVideoDetail();
    }, [])
    return videoDetail;
}

export default useVideoDetails;