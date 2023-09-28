import React from 'react'
import Button from './Button'

const btnList = ["All", "Music", "Gaming", "Live", "Bharat", "Sanatan", "Cricket", "News", "Lo-fi"]

const ButtonList = () => {
  return (
    //build it scrollable like youtube
    <div className='flex'>
    {
      btnList.map((btn, idx) => <Button key={idx} name={btn} />)
    }
    </div>
  )
}

export default ButtonList