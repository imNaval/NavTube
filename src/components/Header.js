import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleDark, toggleMenu } from '../utils/appSlice'
import { YOUTUBE_SEARCH_SUGGESTION_API } from '../utils/constant';
import { cacheResults } from '../utils/searchSlice';
import { Link, useNavigate } from 'react-router-dom';
import { FaRegSun, FaBars, FaSearch, FaRegUserCircle, FaRegMoon } from 'react-icons/fa';
import logo from '../utils/images/logo.png'

const Header = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [searchBar, setSearchBar] = useState(window.innerWidth > 640)

    const searchCache = useSelector(store => store.search.searchResult);
    const isDark = useSelector(store=> store.app.isDark)
    const dispatch = useDispatch()
    const navigate = useNavigate();

    let timer;
    const handleResize = (e) =>{
        clearTimeout(timer)
        timer = setTimeout(() => {
            setSearchBar(window.innerWidth > 640)
        }, 200);
    }

    useEffect(()=>{
        const deBounce = setTimeout(()=>{
            if(searchCache[searchQuery]){
                setSuggestions(searchCache[searchQuery])
            }
            else{
                getSearchSuggestion()
            }
        }, 200)

        window.addEventListener('resize', handleResize)
        
        return () =>{
            clearTimeout(deBounce);
            window.removeEventListener('resize', handleResize)
        }
    }, [searchQuery]);

    const getSearchSuggestion = async () =>{
        const data = await fetch(YOUTUBE_SEARCH_SUGGESTION_API + searchQuery)
        const json = await data.json();
        // console.log(json);

        setSuggestions(json[1])
        dispatch(cacheResults({
            [searchQuery] : json[1]
        }))
    }

    const getSearchVideos = async (query) => {
        try{
            setShowSuggestions(false)
            setSearchQuery(query)
        }
        catch(err){
            console.error(err.message)
        }

    }

    const toggleMenuHandler = () => {
        dispatch(toggleMenu())  //toggleMenu() not toggleMenu
    }

    return (
        // shadow-lg shadow-gray-800
        <div className={`grid grid-flow-col p-5 fixed w-full mt-0 z-50 ${isDark ? 'bg-gray-900 ' : 'bg-white'} items-center`}>
            <div className='flex items-center col-span-2 justify-start'>
                <FaBars className={`h-8 w-8 ${isDark ? 'text-white' : 'text-black'}`} onClick={() => toggleMenuHandler()} />
                {/* <Link to="/"> */}  {/*it give error bcs header was not wrapped with router */}
                {/* now i wrap it  */}
                <Link to="/">
                    <img className='h-16 mx-3 w-24' alt='yt-logo' src={logo}/>
                </Link>
            </div>

            <div className={`col-span-8 text-center ${isDark ? 'bg-gray-900 text-white' : 'bg-white text-black'} flex relative px-4`}>
                { true ?
                    <div className={`flex items-center ${isDark ? 'bg-gray-900 text-white' : 'bg-white text-black'} w-full`}>
                        <input className={`w-full border border-gray-500 rounded-l-full py-2 px-4 ${isDark && 'bg-gray-900'}`}
                            type='text'
                            value={searchQuery}
                            onChange={(e)=> setSearchQuery(e.target.value)}
                            // onFocus={()=> setShowSuggestions(true)}
                            onFocus={()=> {
                                setShowSuggestions(true)
                                setSearchBar(true)
                            }}
                            onBlur={()=> setTimeout(()=>{
                                setShowSuggestions(false)
                            }, 220)}
                        />
                        <button className={`py-2 px-4 border border-gray-500 rounded-r-full bg-gray-200 ${isDark && 'bg-gray-800'}`} onClick={()=> searchQuery && navigate("/search/" + searchQuery)}><FaSearch className='w-6 h-6' /></button>
                    </div>
                    :
                    <div className='sm:invisible items-center mr-0 ml-auto'>
                        <button className={`py-2 px-4 hover:border hover:border-gray-500 hover:rounded-full hover:bg-gray-200 ${isDark && 'hover:bg-gray-800'}`} onClick={()=> setSearchBar(prev=> !prev)}><FaSearch className='w-6 h-6' /></button>
                    </div>
                }

                {
                showSuggestions && suggestions.length !== 0 &&<div className={`fixed py-2 px-0 text-left rounded-lg shadow-lg border border-gray-200 mt-12 w-1/2 sm:w-1/3 left-1/ ${isDark ? 'bg-gray-900' : 'bg-gray-100'}`}>
                    <ul>
                        {
                            suggestions?.map(s => <Link to={"/search/" + s} key={s}> <li className={`py-1 px-4 cursor-default ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-200'}`} onClick={(e)=> getSearchVideos(s)}>🔍 {s}</li> </Link>)
                        }
                    </ul>
                </div>
                }
            </div>

            <div className='col-span-2 flex items-center justify-end'>
                <div className='mr-2 p-2 rounded-full hover:bg-gray-400' onClick={()=> dispatch(toggleDark())}>
                {
                    isDark ? <FaRegSun className='w-6 h-6 text-white' /> : <FaRegMoon className='w-6 h-6'/>
                }
                </div>
                <FaRegUserCircle className={`h-8 w-8 ${isDark && 'text-white'} mr-0`} />
            </div>
        </div>
    )
}

export default Header