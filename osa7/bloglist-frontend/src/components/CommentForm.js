import { useState } from 'react'

const CommentForm = ({ createComment }) => {
    const [newComment, setNewComment] = useState('')

    const addComment = (event) => {
        event.preventDefault()
        createComment({
            comment: newComment
        })
        setNewComment('')
    }

    return (
        <div>
            <h2>Create blog</h2>

            <form onSubmit={addComment}>
                <input
                    id='comment-form'
                    value={newComment}
                    onChange={({ target }) => setNewComment(target.value)}
                    placeholder='new comment'
                /><br></br>
                <button id='save-comment' type="submit">add comment</button>
            </form>
        </div>
    )
}

export default CommentForm