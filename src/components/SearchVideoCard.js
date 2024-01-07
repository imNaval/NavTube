import React from 'react'
import { useSelector } from 'react-redux'

const SearchVideoCard = (props) => {
    const { channelId, channelTitle, description, title, thumbnails } = props?.video?.snippet
    const isDark = useSelector(store=> store.app.isDark)

    return (
        <>
        <div className={`sm:flex overflow-hidden group p-4 ${isDark && 'bg-gray-900'}`}>
            <div className='w-[35rem] relative'>
                <img className='w-full shadow-xl' src={thumbnails.high.url} alt='thumbnail' />
                <div className="absolute inset-0 bg-gradient-to-l from-transparent via-black to-black opacity-0 group-hover:opacity-60 transition-all duration-300"></div>
            </div>
            <div className='sm:ml-8'>
                <h2 className='font-bold'>{title}</h2>
                <h3 className='mt-0 pt-0 text-gray-500 text-sm'>{channelTitle}</h3>
                <p className='sm:mt-6 text-gray-700'>{description}</p>
            </div>
        </div>
        <hr className='w-[90%] ml-[5%]' />
        </>
    )
}

export default SearchVideoCard