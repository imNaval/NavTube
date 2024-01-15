import React, { useState } from 'react'
import { commentsData } from '../mocks/comments'
import { FaUserCircle } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { FaCaretRight, FaCaretDown } from 'react-icons/fa';

const Comment = ({ data }) => {
  const { name, text } = data;
  return (
    <div className='flex'>
      <FaUserCircle className='w-8 h-8 mr-4 mt-2' />
      <div>
        <p>{name}</p>
        <p>{text}</p>
      </div>
    </div>
  )
}

const CommentList = ({comments}) =>{

  return comments.map((comment, idx) => (
    <div key={idx} >
      <Comment data={comment} />
      <div className='pl-5 border border-l-black mt-5'>
        <CommentList comments={comment.replies} />
      </div>
    </div>
  ))
}

const CommentsContainer = () => {
  const {isDark} = useSelector(store=> store.app)
  const [showComments, setShowComments] = useState(true)
  return (
    <div className={`p-8 ${isDark && 'bg-gray-900'}`}>
        {/* <h1 className='text-2xl font-bold'>Nested Components : </h1> */}
      <div className='flex' onClick={() => setShowComments(prev => !prev)}>
        <h1 className='text-2xl font-bold'>Nested Components : </h1>
        <span className=' text-blue-800'>{showComments ? <FaCaretDown className='w-8 h-8' /> : <FaCaretRight className='w-8 h-8' />}</span>
      </div>
      {
        showComments && <CommentList comments={commentsData} />
      }
    </div>
  )
}

export default CommentsContainer