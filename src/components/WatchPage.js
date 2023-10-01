import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { closeMenu } from '../utils/appSlice';
import { useSearchParams } from 'react-router-dom';
import CommentsContainer from './CommentsContainer';
import LiveChat from './LiveChat';

const WatchPage = () => {

    const [searchParams] = useSearchParams();
    const vId = searchParams.get('v')
    // console.log(vId)

    const [width, setWidth] = useState(window.innerWidth)
    let timer;
    const handleResize = (e) =>{
        clearTimeout(timer)
        timer = setTimeout(() => {
            setWidth(window.innerWidth)
            // console.log(width, window.innerWidth)
        }, 200);
    }

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(closeMenu())

        window.addEventListener('resize', handleResize)
        return ()=>{
            window.removeEventListener('resize', handleResize)
        }
    }, [])
    return (
        <div>
            <div className={`px-5 col-span-11 ${width>800 && 'flex'}`}>
                <iframe
                    width="1000"
                    height="400"
                    className={`${width>900 ?'w-2/3' : 'w-full'}`}
                    // src="https://www.youtube.com/embed/Lz51wnb_cSU?si=7bVJ0B1AOmBXB6RN" 
                    src={"https://www.youtube.com/embed/" + vId + "?si=7bVJ0B1AOmBXB6RN"}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                ></iframe>
                <LiveChat width={width} />
            </div>
            <CommentsContainer />
        </div>
    )
}

export default WatchPage

//frameborder -> frameBorder
//allowfullscreen -> AllowFullScreen
//iframe->w->1200 h->600
//src="https://www.youtube.com/embed/Lz51wnb_cSU?si=7bVJ0B1AOmBXB6RN"
//src={"https://www.youtube.com/embed/"+ video_id +"?si=7bVJ0B1AOmBXB6RN"}
