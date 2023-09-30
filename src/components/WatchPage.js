import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { closeMenu } from '../utils/appSlice';
import { useSearchParams } from 'react-router-dom';
import CommentsContainer from './CommentsContainer';

const WatchPage = () => {

    const [searchParams] = useSearchParams();
    const vId = searchParams.get('v')
    // console.log(vId)

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(closeMenu())
    }, [])
    return (
        <div>
            <div className='px-5 col-span-11'>
                <iframe
                    width="1000"
                    height="400"
                    className='w-2/3'
                    // src="https://www.youtube.com/embed/Lz51wnb_cSU?si=7bVJ0B1AOmBXB6RN" 
                    src={"https://www.youtube.com/embed/" + vId + "?si=7bVJ0B1AOmBXB6RN"}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                ></iframe>
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
