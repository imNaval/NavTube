import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { closeMenu } from '../utils/appSlice';
import { useSearchParams } from 'react-router-dom';
import CommentsContainer from './CommentsContainer';
import LiveChat from './LiveChat';
import { clearMessage } from '../utils/chatSlice';

const WatchPage = () => {
    const [searchParams] = useSearchParams();
    const vId = searchParams.get('v')

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
        window.scrollTo(0,0)
        dispatch(closeMenu())
        window.addEventListener('resize', handleResize)

        return ()=>{
            window.removeEventListener('resize', handleResize)
            dispatch(clearMessage())
        }
    }, [])
    return (
        <div>
            <div className={`px-5 col-span-11 ${width>800 && 'flex'}`}>
                <iframe
                    width="1000"
                    height="400"
                    className={`${width>900 ?'w-2/3' : 'w-full'}`}
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
