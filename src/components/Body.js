import React from 'react'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'

const Body = () => {

  return (
    <div className='grid grid-flow-col h-full'>
      <div className='mt-20 fixed overflow-y-scroll h-full pb-20 z-40'>
        <Sidebar />
      </div>
      {/* <MainContainer /> && <WatchPage /> */}
      <div className='mt-24 col-span-11 sm:col-span-10 overflow-y-scroll'>
        <Outlet />
      </div>
    </div>
  )
}

export default Body