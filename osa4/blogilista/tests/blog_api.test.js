const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const helper = require('./test_helper')

const initialBlogs = [
  {
    title: 'HTML is easy',
    author: 'Testi Testinen',
    url: 'testUrl',
    likes: 1
  },
  {
    title: 'HTML is not so easy',
    author: 'Testi Kakkonen',
    url: 'testUrl2',
    likes: 2
  },
]

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are two blogs', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initialBlogs.length)
})

test('the first blog is my first blog', async () => {
    const response = await api.get('/api/blogs')
  
    expect(response.body[0].title).toBe('HTML is easy')
  })

test('blog identifier field must be named id', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].id).toBeDefined()
})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'My third blog post',
    author: 'Testi Kolmonen',
    url: 'testUrl3',
    likes: '3'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const titles = response.body.map(r => r.title)

  expect(response.body).toHaveLength(initialBlogs.length + 1)
  expect(titles).toContain(
    'My third blog post'
  )
})

test('if likes field is empty set likes as 0', async () => {
  const newBlog = {
    title: 'My fourth blog post',
    author: 'Testi Nelonen',
    url: 'testUrl4',
    likes: ''
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  expect(response.body[2].likes).toEqual(0)
})

test('if no title return status 400', async () => {
  const newBlog = {
    title: '',
    author: 'Testi Nelonen',
    url: 'testUrl4',
    likes: ''
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

test('if no url return status 400', async () => {
  const newBlog = {
    title: 'My fourth blog post',
    author: 'Testi Nelonen',
    url: '',
    likes: ''
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

test('delete blog returns status 204 with valid id and removes blog', async () => {
  const response = await api.get('/api/blogs')
  const id = response.body[1].id

  await api
    .delete(`/api/blogs/${id}`)
    .expect(204)

  const blogs = await Blog.find({})
  const list = blogs.map(blog => blog.toJSON())
  expect(list).toHaveLength(response.body.length - 1)
})

test('update blog returns status 204 with correct number of likes on updated blog', async () => {
  const response = await api.get('/api/blogs')
  const id = response.body[1].id

  const newBlog = {
    likes: 100
  }

  await api
    .put(`/api/blogs/${id}`)
    .send(newBlog)
    .expect(200)

  const blogs = await api.get('/api/blogs')
  expect(blogs.body[1].likes).toEqual(100)
})

describe('when there is initially one user at db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'testuser',
      name: 'Test User',
      password: 'secret'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(user => user.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superman',
      password: 'password'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('username must be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})