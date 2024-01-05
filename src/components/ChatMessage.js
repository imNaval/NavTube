import React from 'react'
import { FaRegUserCircle } from 'react-icons/fa'

const ChatMessage = ({data}) => {
    const {name, message} = data
  return (
    <div className='flex m-2'>
      <FaRegUserCircle className='w-6 h-6' />
      <div className='items-center'>
      <span className='m-2 font-bold'>{name}</span>
      <span >{message}</span>
      </div>
    </div>
  )
}

export default ChatMessage