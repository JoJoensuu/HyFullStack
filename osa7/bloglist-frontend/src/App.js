import { useState, useEffect, useRef } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom'
import UserList from './components/UserList'
import blogService from './services/blogs'
import userService from './services/users'
import { setNotification } from './reducers/notificationReducer'
import Notification from './components/Notification'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import { useDispatch } from 'react-redux'
import { Table, Form, Button } from 'react-bootstrap'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const [users, setUsers] = useState([])

    const dispatch = useDispatch()

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs( blogs )
        )
    }, [])

    useEffect(() => {
        userService.getAll().then(users =>
            setUsers( users )
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
            dispatch(setNotification('wrong username or password', 5))
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
                dispatch(setNotification(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`, 5))
            })
    }

    const removeBlog = id => {
        blogService
            .remove(id)
            .then(
                setBlogs(blogs.filter(note => note.id !== id))
            )
        dispatch(setNotification('blog successfully removed from database', 5))
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
        <Form onSubmit={handleLogin}>
            <Form.Group>
                <Form.Label>username:</Form.Label>
                <Form.Control
                    id='username'
                    type="text"
                    name="Username"
                    value={username}
                    onChange={({ target }) => setUsername(target.value)}
                />
                <Form.Label>password:</Form.Label>
                <Form.Control
                    id='password'
                    type="password"
                    value={password}
                    onChange={({ target }) => setPassword(target.value)}
                />
            </Form.Group>
            <Button variant="primary" id='login-button' type="submit">login</Button>
        </Form>
    )

    const logoutForm = () => (
        <Form onSubmit={handleLogout}>
            <div>
                <Button variant="primary" type="submit">logout</Button>
            </div>
        </Form>
    )

    const showBlogs = () => {
        const blogsToShow = blogs.sort((a, b) => b.likes - a.likes)

        return (
            <Table striped>
                <tbody>
                    {blogsToShow.map(blog =>
                        <tr key={blog.id}>
                            <td className="blog">
                                <Link to={`api/blogs/${blog.id}`}>{blog.title}</Link>
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
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

    const showUsers = () => {
        return (
            <div>
                <h1>Users</h1>
                {users.map(user =>
                    <UserList key={user.id}
                        user={user}
                        getInfo={<Link to={`/${user.id}`}>{user.name}</Link>}
                    />
                )}
            </div>
        )
    }

    const BlogToView = ({ blogs }) => {
        const id = useParams().id
        const blog = blogs.find(b => b.id === id)
        if (!blog) {
            return null
        }
        return (
            <div>
                <h1>{blog.title} {blog.author}</h1>
                <p>{blog.url}</p>
                <p>{blog.likes} likes</p>
                <Button onClick={() => updateBlogLikes(blog.id)}>like</Button>
                <br/>
                <p>added by {blog.user.name}</p>
                <h2>comments</h2>
                <ul>
                    {blog.comments.map(comment =>
                        <li key={comment._id}>
                            {comment.content}
                        </li>
                    )}
                </ul>
                <Button onClick={() => removeBlog(blog.id)}>delete</Button>
            </div>
        )
    }

    const UserToView = ({ users }) => {
        const id = useParams().id
        const user = users.find(u => u.id === id)
        if (!user) {
            return null
        }
        return (
            <div>
                <h1>{user.name}</h1>
                <h2>added blogs</h2>
                <ul>
                    {user.blogs.map(blog =>
                        <li key={blog.id}>
                            {blog.title}
                        </li>
                    )}
                </ul>
            </div>
        )
    }

    const loggedInView = () => {
        return (
            <div className="container">
                <Router>
                    <div className="navPanel">
                        <Link to="/">blogs</Link>
                        &nbsp;
                        <Link to="api/users/">users</Link>
                        &nbsp;
                        {user.name} logged in
                        &nbsp;
                        {logoutForm()}
                    </div>
                    <Routes>
                        <Route path="/" element={
                            <div>
                                <h1>Blogs</h1>
                                <Notification />
                                <p>{user.name} logged in</p>
                                {showBlogs()}
                                {blogForm()}
                            </div>
                        } />
                        <Route path="/:id" element={<UserToView users={users}/>}/>
                        <Route path="api/blogs/:id" element={<BlogToView blogs={blogs}/>}/>
                        <Route path="api/users/" element={showUsers()}/>
                    </Routes>
                </Router>
            </div>
        )
    }

    return (
        <div>
            {user === null ?
                loginForm() :
                loggedInView()
            }
        </div>
    )
}
export default App
