const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'HTML is easy',
    author: 'Testi Testinen',
    url: 'testUrl',
  },
  {
    title: 'HTML is not so easy',
    author: 'Testi Kakkonen',
    url: 'testUrl2',
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
    expect(response.body).toHaveLength(2)
})

test('the first blog is my first blog', async () => {
    const response = await api.get('/api/blogs')
  
    expect(response.body[0].title).toBe('HTML is easy')
  })

afterAll(() => {
  mongoose.connection.close()
})