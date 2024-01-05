import React from 'react'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Body = () => {
  const {isDark} = useSelector(store => store.app)
  return (
    <div className={`grid grid-flow-col h-full ${isDark && 'text-white bg-black'}`}>
      <div className='mt-20 fixed overflow-y-scroll h-full pb-20 z-40'>
        <Sidebar />
      </div>
      <div className='mt-24 col-span-11 sm:col-span-10 overflow-y-scroll'>
        <Outlet />
      </div>
    </div>
  )
}

export default Body