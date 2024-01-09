import React, { useState } from 'react'
import useComments from '../utils/useComments';
import { getRelativeTimeDifference } from '../utils/helper';
import DOMPurify from 'dompurify';
import { useSelector } from 'react-redux';
import { FaCaretUp, FaCaretDown } from 'react-icons/fa';

const CommentsYt = ({vId}) => {
    const { isDark } = useSelector(store => store.app)
    const commentsData = useComments(vId)
    console.log(commentsData)

  return (
    <div className={`pl-[5%] pt-2 ${isDark && 'bg-gray-900'}`}>
        <h3 className='font-bold text-xl pt-4'>Comments ...</h3>
        {
            commentsData?.map(comment => <TopLevelComment key={comment?.id} data={comment?.snippet?.topLevelComment?.snippet} replies={comment?.replies} />)
        }
    </div>
  )
}

const TopLevelComment = (props) =>{
    const {data, replies} = props
    const sanitizedHTML = DOMPurify.sanitize(data?.textDisplay);
    // console.log(replies)
    return (
        <div className='flex m-2 p-2'>
            <div className='w-8'>
                <img className='rounded-full' src={data?.authorProfileImageUrl} alt="Author" />
            </div>
            <div className='ml-4'>
                <div className='flex'>
                    <h4 className='font-bold'>{data?.authorDisplayName}</h4>
                    <p className='text-xs mx-2 mt-1'>{getRelativeTimeDifference(data?.publishedAt)}</p>
                </div>
                <div>
                    {/* <p>{data?.textDisplay}</p> */}
                    <p dangerouslySetInnerHTML={{ __html:  sanitizedHTML}}></p>
                </div>

                {
                    replies && <Replies replies={replies} />
                }
            </div>

        </div>
    )
}

const Replies = ({replies}) =>{
    const [isOpen, setIsOpen] = useState(false)
    return (
        <>
            <div className='ml-10 font-bold text-blue-800 cursor-pointer flex' onClick={()=> setIsOpen(prev=> !prev)}>{replies?.comments.length} replies {isOpen ? <FaCaretUp className='h-6 w-6' /> : <FaCaretDown className='h-6 w-6' />}</div> 
            <div className='ml-10'>
                {
                    isOpen && replies && replies?.comments.map(comment => <TopLevelComment key={comment?.id} data={comment?.snippet} />)
                }
            </div>
        </>
    )
}

export default CommentsYt