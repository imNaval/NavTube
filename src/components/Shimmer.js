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
    <div className='col-span-11 mb-12 ml-8'>
      {/* Shorts Shimmer */}
      <div className="mb-8">
        <div className="text-xl font-semibold mb-4 px-4 w-24 h-6 bg-gray-300 rounded"></div>
        <div className="flex gap-4 overflow-x-auto pb-4 px-4">
          {[1, 2, 3, 4, 5, 6].map(card => <ShortVideoCardShimmer key={card} />)}
        </div>
      </div>
      
      {/* Regular Videos Shimmer */}
      <div className="space-y-2">
        {cards.map(card => <SearchVideoCard key={card} />)}
      </div>
    </div>
  )
}

const ShortVideoCardShimmer = () => {
  const { isDark } = useSelector(store => store.app)
  return (
    <div className={`flex-shrink-0 w-40 ${isDark ? 'text-white' : 'text-black'}`}>
      <div className="w-full h-72 bg-gray-300 rounded-xl"></div>
      <div className="mt-2 px-1">
        <div className="w-full h-4 bg-gray-300 rounded mb-1"></div>
        <div className="w-3/4 h-3 bg-gray-300 rounded"></div>
      </div>
    </div>
  )
}
const SearchVideoCard = () =>{
  const { isDark} = useSelector(store=> store.app)
  return(
    <div className={`flex gap-4 p-4 ${isDark ? 'bg-gray-800' : 'bg-gray-100'} my-2`}>
        <div className='relative flex-shrink-0 w-80 h-44 bg-gray-300 rounded-lg'></div>
        <div className='flex-1 min-w-0'>
            <div className='w-full h-6 bg-gray-300 rounded mb-2'></div>
            <div className='w-3/4 h-4 bg-gray-300 rounded mb-1'></div>
            <div className='w-1/2 h-4 bg-gray-300 rounded mb-2'></div>
            <div className='w-full h-4 bg-gray-300 rounded mb-1'></div>
            <div className='w-2/3 h-4 bg-gray-300 rounded'></div>
        </div>
    </div>
  )
}


export default Shimmer