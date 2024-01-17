import React, { useEffect, useState } from 'react'
import ChatMessage from './ChatMessage'
import { useDispatch, useSelector } from 'react-redux'
import { addMessage } from '../utils/chatSlice'
import { generateName, makeId } from '../mocks/halper'
import { FaPaperPlane } from 'react-icons/fa'

const LiveChat = ({width}) => {
    const [myChat, setMyChat] = useState("")
    const dispatch = useDispatch()
    const chatMessages = useSelector(store => store.chat.messages)
    const {isDark} = useSelector(store => store.app)

    useEffect(() => {
        const i = setInterval(() => {
            //API Polling
            dispatch(addMessage({
                name: generateName(),
                message: makeId(20)
            }))
        }, 2000)

        return () => clearInterval(i)
    }, [])
    return (
        <div className={`${width>900 ? 'w-1/3 mx-2' : 'w-full m-2 p-2 mt-44'}`}>
            <div className={`p-2 px-8 font-bold border border-b-0 rounded-t-lg ${isDark ? 'border-gray-200' : 'border-black'}`}>
                Live Chat
            </div>
            <div className={`border h-[430px] overflow-y-scroll overflow-x-hidden flex flex-col-reverse ${isDark ? 'border-gray-200' : 'border-black'} no-scrollbar`}>
                {
                    chatMessages?.map((chat, index) => <ChatMessage key={index} data={chat} />)
                }
            </div>
            <form className={`flex justify-between p-2 border border-t-0 rounded-b-lg ${isDark ? 'border-gray-200' : 'border-black'}`}
                onSubmit={(e)=> {
                    e.preventDefault()

                    dispatch(addMessage({
                        name: "Naval",
                        message: myChat
                    }))
                    setMyChat("")
                }}
            >
                <input className={`p-2 border-b focus:outline-none focus:border-b-2 w-full ${isDark ? 'bg-gray-900 text-gray-200 border-b-gray-100 focus:border-b-blue-300' : 'focus:border-b-blue-900 border-b-gray-400'}`}
                    maxLength={30}
                    value={myChat}
                    onChange={(e)=>setMyChat(e.target.value)}
                />
                <button className='p-2 mx-2 border border-gray-400 rounded-lg'><FaPaperPlane /></button>
            </form>
        </div>
    )
}

export default LiveChat