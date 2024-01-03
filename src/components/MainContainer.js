import React, { useEffect, useState } from 'react'
import ButtonList from './ButtonList'
import VideoContainer from './VideoContainer'
import { useSelector } from 'react-redux'

const MainContainer = () => {
  const isMenuOpen = useSelector(store=> store.app.isMenuOpen)

  const [width, setWidth] = useState(window.innerWidth)
  let timer;
  const handleResize = (e) =>{
      clearTimeout(timer)
      timer = setTimeout(() => {
          setWidth(window.innerWidth)
      }, 200);
  }
  useEffect(() => {
      window.addEventListener('resize', handleResize)
      return ()=> window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className={`'col-span-11' ${isMenuOpen&& width>800 && 'ml-40'}`}>
        <ButtonList />
        <VideoContainer />
    </div>
  )
}

export default MainContainer