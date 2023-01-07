import { useState } from 'react'

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
                title:<input
                    value={newTitle}
                    onChange={({ target }) => setNewTitle(target.value)}
                /><br></br>
                author:<input
                    value={newAuthor}
                    onChange={({ target }) => setNewAuthor(target.value)}
                /><br></br>
                url:<input
                    value={newUrl}
                    onChange={({ target }) => setNewUrl(target.value)}
                /><br></br>
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default BlogForm