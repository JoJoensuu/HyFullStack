import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Notification from './components/Notification'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

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
            blogService.setToken(user.token)
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
            blogService.setToken(user.token)
            setUser(user)
            setUsername('')
            setPassword('')
        } catch (exception) {
            setErrorMessage('wrong username or password')
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
    }

    const handleLogout = () => {
        window.localStorage.clear()
    }

    const addBlog = (blogObject) => {
        blogService
            .create(blogObject)
            .then(returnedBlog => {
                setBlogs(blogs.concat(returnedBlog))
                setErrorMessage(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
                setTimeout(() => {
                    setErrorMessage(null)
                }, 5000)
            })
    }

    const removeBlog = id => {
        blogService
            .remove(id)
            .then(
                setBlogs(blogs.filter(note => note.id !== id))
            )
    }

    const updateBlogLikes = id => {
        const blog = blogs.find(blog => blog.id === id)
        const changedBlog = { ...blog, likes: blog.likes + 1 }

        blogService
            .update(id, changedBlog)
            .then(returnedBlog => {
                setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog))
            })
    }

    const loginForm = () => (
        <form onSubmit={handleLogin}>
            <div>
          username
                <input
                    id='username'
                    type="text"
                    value={username}
                    name="Username"
                    onChange={({ target }) => setUsername(target.value)}>
                </input>
            </div>
            <div>
          password
                <input
                    id='password'
                    type="password"
                    value={password}
                    name="Password"
                    onChange={({ target }) => setPassword(target.value)}>
                </input>
            </div>
            <button id='login-button' type="submit">login</button>
        </form>
    )

    const logoutForm = () => (
        <form onSubmit={handleLogout}>
            <div>
                <button type="submit">logout</button>
            </div>
        </form>
    )

    const showBlogs = () => {
        const blogsToShow = blogs.sort((a, b) => b.likes - a.likes)

        return (
            <div>
                {blogsToShow.map(blog =>
                    <Blog
                        key={blog.id}
                        blog={blog}
                        deleteBlog={() => removeBlog(blog.id)}
                        addLike={() => updateBlogLikes(blog.id)}
                        user={user}
                    />
                )}
            </div>
        )
    }

    const blogFormRef = useRef()

    const blogForm = () => (
        <Togglable buttonLabel='new blog' ref={blogFormRef}>
            <BlogForm
                createBlog={addBlog}
            />
        </Togglable>
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
            {user === null ?
                <p>&nbsp;</p> :
                blogForm()
            }
        </div>
    )
}
export default App
