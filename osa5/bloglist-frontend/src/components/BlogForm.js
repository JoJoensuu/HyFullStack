const BlogForm = ({
    addBlog,
    handleTitleChange,
    handleAuthorChange,
    handleUrlChange,
    newTitle,
    newAuthor,
    newUrl,
}) => {
    return (
        <div>
            <h2>Create blog</h2>

            <form onSubmit={addBlog}>
                title:<input
                    value={newTitle}
                    onChange={handleTitleChange}
                /><br></br>
                author:<input
                    value={newAuthor}
                    onChange={handleAuthorChange}
                /><br></br>
                url:<input
                    value={newUrl}
                    onChange={handleUrlChange}
                /><br></br>
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default BlogForm