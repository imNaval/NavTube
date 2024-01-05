import React from 'react'
import { useSelector } from 'react-redux'

const Button = ({name}) => {
  const {isDark} = useSelector(store => store.app)
  return (
    <div>
      <button className={`px-5 py-1 m-2 border border-gray-300 rounded-lg ${isDark ? 'hover:bg-gray-700 bg-gray-900 text-white' : 'bg-gray-200 hover:bg-gray-400'}`}>{name}</button>
    </div>
  )
}

export default Button
