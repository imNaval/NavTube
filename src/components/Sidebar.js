import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';

const Sidebar = () => {

  const isMenuOpen = useSelector(store => store.app.isMenuOpen)

  //Early return pattern
  if(!isMenuOpen) return null;

  return (
    <div className='col-span-1 p-0 z-40 shadow-lg'>
      <div className='bg-white p-5'>
      <ul>
        <Link to="/"><li className='p-2 hover:bg-grey-200 hover:border hover:rounded-lg cursor-pointer'>Home</li></Link>
        <li className='p-2 hover:bg-grey-200 hover:border hover:rounded-lg cursor-pointer'>Shorts</li>
        <li className='p-2 hover:bg-grey-200 hover:border hover:rounded-lg cursor-pointer'>Subscription</li>
      </ul>

      <hr className='my-2'/>

      <ul>
        <li className='p-1 hover:bg-grey-200 hover:border hover:rounded-lg cursor-pointer'>Library</li>
        <li className='p-1 hover:bg-grey-200 hover:border hover:rounded-lg cursor-pointer'>History</li>
        <li className='p-1 hover:bg-grey-200 hover:border hover:rounded-lg cursor-pointer'>Your Videos</li>
        <li className='p-1 hover:bg-grey-200 hover:border hover:rounded-lg cursor-pointer'>Watch Later</li>
      </ul>

      <h1 className='font-bold mt-4'>Subscription</h1>
      <ul>
        <li className='p-1 hover:bg-grey-200 hover:border hover:rounded-lg cursor-pointer'>Musics</li>
        <li className='p-1 hover:bg-grey-200 hover:border hover:rounded-lg cursor-pointer'>Sports</li>
        <li className='p-1 hover:bg-grey-200 hover:border hover:rounded-lg cursor-pointer'>Gaming</li>
        <li className='p-1 hover:bg-grey-200 hover:border hover:rounded-lg cursor-pointer'>Movies</li>
      </ul>

      <h1 className='font-bold pt-3'>Explore</h1>
      <ul>
        <li className='p-1 hover:bg-grey-200 hover:border hover:rounded-lg cursor-pointer'>Musics</li>
        <li className='p-1 hover:bg-grey-200 hover:border hover:rounded-lg cursor-pointer'>Sports</li>
        <li className='p-1 hover:bg-grey-200 hover:border hover:rounded-lg cursor-pointer'>Gaming</li>
        <li className='p-1 hover:bg-grey-200 hover:border hover:rounded-lg cursor-pointer'>Movies</li>
      </ul>
    </div>
    </div>
  )
}

export default Sidebar