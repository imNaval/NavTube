import React from 'react'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Body = () => {
  const {isDark, isMenuOpen} = useSelector(store => store.app)
  return (
    <div className={`flex h-screen ${isDark && 'text-white bg-gray-900 '}`}>
      <Sidebar />
      <div className={`flex-1 transition-all duration-300 ease-in-out ${isMenuOpen ? 'ml-60' : 'ml-16'} overflow-y-auto`}>
        <div className='mt-[85px] p-4 min-h-screen'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Body