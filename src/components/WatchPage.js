import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { closeMenu } from '../utils/appSlice';
import { useSearchParams } from 'react-router-dom';
import CommentsContainer from './CommentsContainer';
import LiveChat from './LiveChat';
import { clearMessage } from '../utils/chatSlice';
import useVideoDetails from '../utils/useVideoDetail';
import { modifyNumber } from '../utils/helper';
import CommentsYt from './CommentsYt';

const WatchPage = () => {
    const [width, setWidth] = useState(window.innerWidth)
    const { isDark } = useSelector(store => store.app)
    const [searchParams] = useSearchParams();
    const vId = searchParams.get('v')
    const dispatch = useDispatch();
    const videoDetail = useVideoDetails(vId)
    // console.log(videoDetail)

    let timer;
    const handleResize = (e) => {
        clearTimeout(timer)
        timer = setTimeout(() => {
            setWidth(window.innerWidth)
            // console.log(width, window.innerWidth)
        }, 200);
    }


    useEffect(() => {
        window.scrollTo(0, 0)
        dispatch(closeMenu())
        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
            dispatch(clearMessage())
        }
    }, [])
    return (
        <div>
            <div className={`px-5 col-span-11 ${width > 800 && 'flex'} ${isDark && 'bg-gray-900'}`}>
                <div className={`${width > 900 ? 'w-2/3' : 'w-full'}`}>
                    <iframe
                        width="1000"
                        height="400"
                        // className={`${width>900 ?'w-2/3' : 'w-full'}`}
                        className='w-full'
                        src={"https://www.youtube.com/embed/" + vId + "?si=7bVJ0B1AOmBXB6RN"}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                    ></iframe>
                    {
                        videoDetail &&
                        <div>
                            <div>
                                <p className='font-bold text-lg my-2'>{videoDetail?.video?.snippet?.title}</p>
                            </div>
                            <div className='flex justify-between border border-b-2'>
                                <div className='flex h-14 mx-2 p-2'>
                                    <img className='rounded-full border border-b-2' src={videoDetail?.channel?.snippet?.thumbnails?.default?.url} alt='channel' />
                                    <div className='ml-4'>
                                        <h2 className='font-bold'>{videoDetail?.channel?.snippet?.title}</h2>
                                        <p className='text-sm'>{modifyNumber(videoDetail?.channel?.statistics?.subscriberCount)} subscriptions</p>
                                    </div>
                                </div>
                                <div>
                                    <p className='m-2 p-2 text-lg'>{modifyNumber(videoDetail?.video?.statistics?.likeCount)} likes</p>
                                </div>
                            </div>
                        </div>
                    }

                </div>
                <LiveChat width={width} />
            </div>

            <CommentsYt vId={vId} />
            <CommentsContainer />
        </div>
    )
}

export default WatchPage
