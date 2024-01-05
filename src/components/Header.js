import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleDark, toggleMenu } from '../utils/appSlice'
import { LOGO_URL, YOUTUBE_SEARCH_SUGGESTION_API, corsproxy } from '../utils/constant';
import { cacheResults } from '../utils/searchSlice';
import { Link } from 'react-router-dom';
import { FaMoon, FaRegSun, FaBars, FaSearch, FaRegUserCircle } from 'react-icons/fa';
import logo from '../utils/images/logo.png'

const Header = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    const searchCache = useSelector(store => store.search.searchResult);
    const isDark = useSelector(store=> store.app.isDark)
    const dispatch = useDispatch()

    useEffect(()=>{
        const deBounce = setTimeout(()=>{
            if(searchCache[searchQuery]){
                setSuggestions(searchCache[searchQuery])
            }
            else{
                getSearchSuggestion()
            }
        }, 200)

        return () =>{
            clearTimeout(deBounce);
        }
    }, [searchQuery]);

    const getSearchSuggestion = async () =>{
        // const data = await fetch(YOUTUBE_SEARCH_SUGGESTION_API + searchQuery)
        const data = await fetch(corsproxy + YOUTUBE_SEARCH_SUGGESTION_API + searchQuery)
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
        <div className={`grid grid-flow-col p-5 shadow-lg fixed w-full mt-0 z-50 ${isDark ? 'bg-black' : 'bg-white'} items-center`}>
            <div className='flex items-center col-span-2'>
                <FaBars className={`h-8 w-8 ${isDark ? 'text-white' : 'text-black'}`} onClick={() => toggleMenuHandler()} />
                {/* <Link to="/"> */}  {/*it give error bcs header was not wrapped with router */}
                {/* now i wrap it  */}
                <Link to="/">
                    <img className='h-16 mx-3 w-24 hidden sm:block' alt='yt-logo' src={logo}/>
                </Link>
            </div>

            <div className={`col-span-8 text-center ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
                <div className={`flex items-center ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
                    <input className={`w-1/2 border border-gray-500 rounded-l-full py-2 px-4 ${isDark && 'bg-black'}`}
                        type='text'
                        value={searchQuery}
                        onChange={(e)=> setSearchQuery(e.target.value)}
                        onFocus={()=> setShowSuggestions(true)}
                        // onBlur={()=> setShowSuggestions(false)}
                    />
                    <button className={`py-2 px-4 border border-gray-500 rounded-r-full bg-gray-200 ${isDark && 'bg-gray-800'}`}><FaSearch className='w-6 h-6' /></button>
                </div>

                {
                showSuggestions && suggestions.length !== 0 &&<div className={`fixed py-2 px-0 text-left rounded-lg shadow-lg border border-gray-200 mt-2 w-1/3 left-1/ ${isDark ? 'bg-black' : 'bg-gray-100'}`}>
                    <ul>
                        {/* <li className='py-2 px-4 hover:bg-gray-200 cursor-default'>🕜 i</li> */}
                        {
                            suggestions.map(s => <Link to={"/search/" + s} key={s}> <li className={`py-1 px-4 cursor-default ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-200'}`} onClick={(e)=> getSearchVideos(s)}>🔍 {s}</li> </Link>)
                        }
                    </ul>
                </div>
                }
            </div>

            <div className='col-span-2 flex items-center'>
                <FaRegUserCircle className={`h-8 w-8 ${isDark && 'text-white'}`} />
                <div className='ml-8' onClick={()=> dispatch(toggleDark())}>
                {
                    isDark ? <FaRegSun className='w-6 h-6 text-white' /> : <FaMoon className='w-6 h-6'/>
                }
                </div>
            </div>
        </div>
    )
}

export default Header