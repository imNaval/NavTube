import React, { useEffect, useState } from 'react'
import ChatMessage from './ChatMessage'
import { useDispatch, useSelector } from 'react-redux'
import { addMessage } from '../utils/chatSlice'
import { generateName, makeId } from '../mocks/halper'

const LiveChat = ({width}) => {
    const [myChat, setMyChat] = useState("")
    const dispatch = useDispatch()
    const chatMessages = useSelector(store => store.chat.messages)

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
        <div className={`${width>900 ? 'w-1/3 mx-2 px-2' : 'w-full m-2 p-2'}`}>
            <div className='p-2 px-8 font-bold border border-black border-b-0 rounded-t-lg'>
                Live Chat
            </div>
            <div className='border border-black h-[400px] overflow-y-scroll flex flex-col-reverse'>
                {
                    chatMessages?.map((chat, index) => <ChatMessage key={index} data={chat} />)
                }
            </div>
            <form className='flex justify-between p-2 border border-black border-t-0 rounded-b-lg'
                onSubmit={(e)=> {
                    e.preventDefault()

                    dispatch(addMessage({
                        name: "Naval",
                        message: myChat
                    }))
                    setMyChat("")
                }}
            >
                <input className='p-2 border-b border-b-gray-400 focus:outline-none focus:border-b-2 focus:border-b-blue-900 w-full' 
                    maxLength={30}
                    value={myChat}
                    onChange={(e)=>setMyChat(e.target.value)}
                />
                <button className='p-2 mx-2 bg-green-400 border border-gray-400 rounded-lg'>Send</button>
            </form>
        </div>
    )
}

export default LiveChat