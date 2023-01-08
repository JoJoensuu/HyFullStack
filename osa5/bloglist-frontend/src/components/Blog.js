import { useState } from 'react'

const Blog = ({ blog, user, deleteBlog, addLike }) => {
    const [infoVisible, setInfoVisible] = useState(false)
    const hideWhenVisible = { display: infoVisible ? 'none' : 'inline' }
    const showWhenVisible = { display: infoVisible ? 'inline' : 'none' }

    const sameUser = blog.user === user.id
    const deleteVisible = { display: sameUser ? '' : 'none' }

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    return (
        <div style={blogStyle}>
            <div className="blog">
                {blog.title} {blog.author}
                <div style={hideWhenVisible}>
                    <button onClick={() => setInfoVisible(true)}>view</button>
                </div>
                <div style={deleteVisible}>
                    <button onClick={deleteBlog}>delete</button>
                </div>
            </div>
            <div className="hiddeninfo" style={showWhenVisible}>
                {blog.url}<br/>
              likes {blog.likes}
                <button onClick={addLike}>like</button>
                <br/>
                {user.name}<br/>
                <button onClick={() => setInfoVisible(false)}>hide</button>
            </div>
        </div>
    )
}

export default Blog