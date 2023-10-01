import React from 'react'

const ChatMessage = ({data}) => {
    const {name, message} = data
  return (
    <div className='flex m-2'>
      <img
        className='w-6 h-6'
        alt='user'
        src='https://static.vecteezy.com/system/resources/previews/007/296/443/non_2x/user-icon-person-icon-client-symbol-profile-icon-vector.jpg'
      />
      <div className='items-center'>
      <span className='m-2 font-bold'>{name}</span>
      <span >{message}</span>
      </div>
    </div>
  )
}

export default ChatMessage