import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';

const Sidebar = () => {

  const isMenuOpen = useSelector(store => store.app.isMenuOpen)

  //Early return pattern
  if(!isMenuOpen) return null;

  return (
    <div className='col-span-1 p-5 shadow-lg'>

      <ul>
        <Link to="/"><li>Home</li></Link>
        <li>Shorts</li>
        <li>Subscription</li>
      </ul>

      <hr className='my-2'/>

      <ul>
        <li>Library</li>
        <li>History</li>
        <li>Your Videos</li>
        <li>Watch Later</li>
      </ul>

      <h1 className='font-bold mt-5'>Subscription</h1>
      <ul>
        <li>Musics</li>
        <li>Sports</li>
        <li>Gaming</li>
        <li>Movies</li>
      </ul>

      <h1 className='font-bold pt-5'>Explore</h1>
      <ul>
        <li>Musics</li>
        <li>Sports</li>
        <li>Gaming</li>
        <li>Movies</li>
      </ul>
    </div>
  )
}

export default Sidebar