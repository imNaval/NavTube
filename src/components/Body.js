import React from 'react'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Body = () => {
  const {isDark, isMenuOpen} = useSelector(store => store.app)
  return (
    <div className={`flex h-full ${isDark && 'text-white bg-black'}`}>
      <Sidebar />
      <div className={`flex-1 transition-all duration-300 ease-in-out ${isMenuOpen ? 'ml-64' : 'ml-16'}`}>
        <div className='mt-20 p-4 min-h-screen'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Body