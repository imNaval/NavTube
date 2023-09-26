import React from 'react'

const Sidebar = () => {
  return (
    <div className='col-span-1 p-5 shadow-lg'>

      <ul>
        <li>Home</li>
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