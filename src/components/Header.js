import React from 'react'
import { useDispatch } from 'react-redux'
import { toggleMenu } from '../utils/appSlice'

const Header = () => {

    const dispatch = useDispatch()
    const toggleMenuHandler = ()=>{
        // console.log("toggle menu")
        dispatch(toggleMenu())  //toggleMenu() not toggleMenu
    }

    return (
        <div className='grid grid-flow-col p-5 m-2 shadow-lg'>
            <div className='flex col-span-2'>
                <img className='h-10'
                    alt='hamburger_menu'
                    src='https://static.vecteezy.com/system/resources/previews/002/292/406/non_2x/hamburger-menu-line-icon-free-vector.jpg'
                    onClick={()=>toggleMenuHandler()}
                />
                {/* <Link to="/"> */ }  {/*it give error bcs header was not wrapped with router /*}
                    <img className='h-10 mx-3'
                        alt='yt-logo'
                        src='https://images.thequint.com/thequint%2F2017-08%2Fd9076f8c-8471-4a3a-b7e4-32ae737e2a55%2Fe0181385-8d98-4475-9def-b4bdb207c2db.png?rect=0%2C0%2C795%2C447&auto=format%2Ccompress&fmt=webp&width=720&w=1200'
                    />
                {/* </Link> */}
            </div>

            <div className='col-span-8 text-center'>
                <input className='w-1/2 border border-gray-500 rounded-l-full py-2 px-4' type='text' />
                <button className='py-2 px-4 border border-gray-500 rounded-r-full bg-gray-200'>🔍</button>
            </div>

            <div className='col-span-2'>
                <img className='h-10'
                    alt='user-icon'
                    src='https://static.vecteezy.com/system/resources/previews/007/296/443/non_2x/user-icon-person-icon-client-symbol-profile-icon-vector.jpg'
                />
            </div>
        </div>
    )
}

export default Header