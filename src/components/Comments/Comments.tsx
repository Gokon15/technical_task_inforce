import React, { useEffect, useState } from 'react'
import { addCommentAsync, deleteCommentAsync, setCommentsAsync } from '../../async-actions/commentsAction'
import { useTypedDispatch } from '../../hooks/useTypedDispatch'
import { useTypedSelector } from '../../hooks/useTypedSelector'

interface Props {
    id: number
}
const Comments: React.FC<Props> = ({id}) => {

  const dispatch = useTypedDispatch()
  const {comments} = useTypedSelector(state => state.comments)
  const [newComment, setNewComment] = useState('')
  useEffect(() => {
    dispatch(setCommentsAsync(id))
  },[dispatch,id])
  return (

    <div><h4>Comments</h4>
      {comments?.map(comment => {
        return (
          <div key={comment.id}>
            <p>{comment.description}</p>
            <p>Date: {comment.date}</p>
            <button
              onClick={() => dispatch(deleteCommentAsync(comment.id || 1312))}>
                delete
            </button>
          </div>
        )
      })}
      <input type='text'  onChange={(e) => setNewComment(e.target.value)} value={newComment} placeholder='Write comment'></input>
      <button onClick={(e) => {
        dispatch(addCommentAsync(id, newComment))
        setNewComment('')
      }}>Add comment</button>
    </div>
  )
}

export default Comments
