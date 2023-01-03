import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Notification from './components/Notification'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = (event) => {
    window.localStorage.clear()
  }

  const loginForm = () => (
      <form onSubmit={handleLogin}>
        <div>
          username
            <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}>
            </input>
        </div>
        <div>
          password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}>
          </input>
        </div>
        <button type="submit">login</button>
      </form>
  )

  const logoutForm = () => (
    <form onSubmit={handleLogout}>
      <div>
        <button type="submit">logout</button>
      </div>
    </form>
  )

  const showBlogs = () => (
    <div>
      {blogs.map(blog => 
          <Blog key={blog.id} blog={blog} />
        )}
    </div>
  )

  return (
    <div>
      <h1>Blogs</h1>
      
      <Notification message={errorMessage}/>
      {user === null ?
        loginForm() :
        showBlogs()
      }
      {user === null ?
        <p>&nbsp;</p> :
        logoutForm()
      }
      
      
    </div>
  )
}
export default App
