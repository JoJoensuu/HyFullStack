import { useState } from 'react'

const Blog = ({ blog, showInfo }) => {
  const [infoVisible, setInfoVisible] = useState(false)
  const hideWhenVisible = { display: infoVisible ? 'none' : '' }
  const showWhenVisible = { display: infoVisible ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <div style={hideWhenVisible}>
          <button onClick={() => setInfoVisible(true)}>view</button>
        </div>
      </div>
      <div style={showWhenVisible}>
        {blog.url}<br/>
        likes {blog.likes}<br/>
        <button onClick={() => setInfoVisible(false)}>hide</button>
      </div>
    </div> 
  )
}

export default Blog