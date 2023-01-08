import { useState } from 'react'
import PropTypes from 'proptypes'

const BlogForm = ({ createBlog }) => {
    const [newTitle, setNewTitle] = useState('')
    const [newAuthor, setNewAuthor] = useState('')
    const [newUrl, setNewUrl] = useState('')

    const addBlog = (event) => {
        event.preventDefault()
        createBlog({
            title: newTitle,
            author: newAuthor,
            url: newUrl,
            likes: 0,
        })
        setNewTitle('')
        setNewAuthor('')
        setNewUrl('')
    }

    return (
        <div>
            <h2>Create blog</h2>

            <form onSubmit={addBlog}>
                <input
                    value={newTitle}
                    onChange={({ target }) => setNewTitle(target.value)}
                    placeholder='title'
                /><br></br>
                <input
                    value={newAuthor}
                    onChange={({ target }) => setNewAuthor(target.value)}
                    placeholder='author'
                /><br></br>
                <input
                    value={newUrl}
                    onChange={({ target }) => setNewUrl(target.value)}
                    placeholder='url'
                /><br></br>
                <button type="submit">create</button>
            </form>
        </div>
    )
}

BlogForm.propTypes = {
    createBlog: PropTypes.func.isRequired
}

export default BlogForm