const blogsRouter = require('express').Router()
const { castObject } = require('../models/blog')
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
  })

blogsRouter.post('/', async (request, response, next) => {
    const body = request.body

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0
    })
    if (blog.title.length === 0 || blog.url.length === 0) {
      response.status(400).json()
    } else {
      try {
        const savedBlog = await blog.save()
        response.status(201).json(savedBlog)
      } catch(exception) {
        next(exception)
      }
    }
  })

blogsRouter.delete('/:id', async (request, response, next) => {
    try {
      await Blog.findByIdAndRemove(request.params.id)
      response.status(204).end()
    } catch(error) {
      next(error)
    }
})

blogsRouter.put('/:id', async (request, response, next) => {
    const body = request.body

    const blog = {
      likes: body.likes
    }

    try {
      const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
      response.json(updatedBlog)
    } catch(error) {
      next(error)
    }
})

module.exports = blogsRouter