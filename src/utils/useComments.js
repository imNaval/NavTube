import { useEffect, useState } from 'react'
import { CREDENTIALS } from './constant';

const useComments = (vId) => {
    const [comments, setComments] = useState(null)

    const apiKey = CREDENTIALS
    const apiUrl = `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet,replies&maxResults=50&videoId=${vId}&key=${apiKey}`;

    useEffect(()=>{
        getComments();
    }, [])

    async function getComments (){
        try{
            const data = await fetch(apiUrl);
            const json = await data.json()
            setComments(json.items)
        }
        catch(err){
            console.error('Error fetching comments:', err)
        }
    }

    return comments;
}

export default useComments