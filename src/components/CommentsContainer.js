import React from 'react'
import { commentsData } from '../mocks/comments'
import { FaUserCircle } from 'react-icons/fa';

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
  return (
    <div className='m-5 p-2'>
      <h1 className='text-2xl font-bold'>Components : </h1>

      <CommentList comments={commentsData} />
    </div>
  )
}

export default CommentsContainer