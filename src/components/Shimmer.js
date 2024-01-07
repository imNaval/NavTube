import React from 'react'
import { useSelector } from 'react-redux'

const Shimmer = () => {
  return (
    <div>Shimmer</div>
  )
}

export const ShimmerVideoContainer = () =>{
  const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
  return(
    <div className='flex flex-wrap justify-center'>
    {
      cards.map(card => <VideoCard key={card} />)
    }
    </div>
  )
}
const VideoCard = () =>{
  const { isDark} = useSelector(store=> store.app)
  return(
      <div className={`p-2 m-2 w-72 shadow-lg h-80 ${isDark && 'bg-gray-950 shadow-gray-900'}`}>
          <div className='rounded-lg bg-blue-500 w-full h-50'></div>
          <ul className='mt-52'>
              <li className='bg-gray-500 py-2 my-1 w-full h-7'></li>
              <li className='bg-gray-600 py-2 my-1 w-2/3 h-7'></li>
              <li className='bg-gray-500 py-2 my-1 w-2/3 h-7'></li>
          </ul>
      </div>
  )
}

export const ShimmerSearchVideoContainer = () =>{
  const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
  return(
    // ${isMenuOpen&& width>800 && 'ml-48'}
    <div className={`'col-span-11 mb-12 ml-8'`}>
    {
      cards.map(card => <SearchVideoCard key={card} />)
    }
    </div>
  )
}
const SearchVideoCard = () =>{
  const { isDark} = useSelector(store=> store.app)
  return(
    <>
    <div className={`sm:flex w-[90%] h-96 sm:h-72 overflow-hidden group p-4 ${isDark && 'bg-gray-900'} my-2`}>
        <div className='w-full sm:w-1/2 h-2/3 sm:h-full relative bg-gray-800'>
            <div className='w-full shadow-xl bg-gray-700'></div>
        </div>
        <div className='sm:ml-8 mt-4 sm:mt-auto w-full sm:w-1/2'>
            <p className='w-full h-10 bg-gray-600'></p>
            <p className='my-1 h-6 bg-gray-600 w-16'></p>
            <p className='sm:mt-6 my-2 h-10 bg-gray-600 w-2/3'></p>
        </div>
    </div>
    <hr className='w-[90%] ml-[5%]' />
    </>
  )
}


export default Shimmer