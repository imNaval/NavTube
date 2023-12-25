import React from 'react'
import Button from './Button'

const btnList = ["All", "Music", "Gaming", "Live", "Bharat", "Sanatan", "Cricket", "News", "LoFi"]

const ButtonList = () => {
  return (
    //build it scrollable like youtube
    <div className='flex justify-center'>
    {
      btnList.map((btn, idx) => <Button key={idx} name={btn} />)
    }
    </div>
  )
}

export default ButtonList