import React from 'react'
import { commentsData } from '../mocks/comments'

const Comment = ({ data }) => {
  const { name, text } = data;
  return (
    <div className='flex'>
      <img
        className='w-8 h-8 mr-4'
        alt='user'
        src='https://static.vecteezy.com/system/resources/previews/007/296/443/non_2x/user-icon-person-icon-client-symbol-profile-icon-vector.jpg'
      />
      <div>
        <p>{name}</p>
        <p>{text}</p>
      </div>
    </div>
  )
}

const CommentList = ({comments}) =>{

  return comments.map((comment, idx) => (
    <div>
      <Comment key={idx} data={comment} />
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