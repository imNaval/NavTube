import React, { useEffect, useState } from 'react'
import { LOGO_URL } from '../utils/constant'
// import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import logo from "../utils/images/logo.png"

const Footer = () => {
    const {isDark} = useSelector(store => store.app)
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
    <div className={`min-h-[15rem] text-center md:flex justify-around pt-16 ${isDark ? 'text-gray-700 bg-slate-400' : 'bg-black text-white'} ${isMenuOpen&& width>800 && 'ml-40'}`}>
        <div className='pb-16'>
            <img
                className="w-20 mb-3 m-auto"
                alt="logo"
                src={logo}
            />
            <p className='text-lg'>© 2023 NavStream,<br/> All right reserved</p>
        </div>
        <div className='pb-16'>
            <h2 className='font-bold text-lg mb-3 md:mb-8'>Company</h2>
            {/* <p className='text-lg'><Link to='/about'>About Me</Link></p> */}
            <p className='text-lg'> Visit my <a className='hover:text-orange-600' href='https://portfolio-five-coral.vercel.app/'>personal website </a> to know more about me </p>
        </div>
        <div className='pb-16'>
            {/* <h2 className='font-bold text-lg mb-3 md:mb-8'><Link to="/contact">Contact Us</Link></h2> */}
            <p className='text-lg'>Say Hello </p>
            <p className='text-lg'>Mobile - 1234567890</p>
            <p className='text-lg'>Udaipur, Rajasthan</p>
        </div>
    </div>
  )
}

export default Footer