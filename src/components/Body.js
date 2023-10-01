import React from 'react'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Body = () => {
  
  const isMenuOpen = useSelector(store=> store.app.isMenuOpen)

  return (
    <div className='grid grid-flow-col h-full'>
      <div className='mt-20 fixed overflow-y-scroll h-4/5 z-40'>
        <Sidebar />
      </div>
      {/* <MainContainer /> && <WatchPage /> */}
      <div className={`mt-24 col-span-11 overflow-y-scroll ${isMenuOpen&& 'ml-40'}`}>
        <Outlet />
      </div>
    </div>
  )
}

export default Body