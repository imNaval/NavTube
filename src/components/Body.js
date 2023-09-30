import React from 'react'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'

const Body = () => {
  return (
    <div className='grid grid-flow-col'>
    <div className='mt-24'>
        <Sidebar />
        </div>
        {/* <MainContainer /> && <WatchPage /> */}
        <div className=' mt-24'>
        <Outlet />
        </div>
    </div>
  )
}

export default Body