const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const { userExtractor } = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 })
  response.json(blogs)
  })

blogsRouter.post('/', userExtractor, async (request, response, next) => {
    const body = request.body


    const user = request.user

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0,
      user: user._id,
      comments: body.comments || []
    })
    if (blog.title.length === 0 || blog.url.length === 0) {
      response.status(400).json()
    } else {
      try {
        const savedBlog = await blog.save()
        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()
        response.status(201).json(savedBlog)
      } catch(exception) {
        next(exception)
      }
    }
  })

blogsRouter.delete('/:id', userExtractor, async (request, response, next) => {
    const user = request.user
    const blog = await Blog.findById(request.params.id)
    if ( user._id.toString() === blog.user.toString() ) {
      try {
        await Blog.findByIdAndRemove(request.params.id)
        response.status(204).end()
      } catch(error) {
        next(error)
      }
    } else {
      return response.status(401).json({ error: 'wrong user' })
    }
})

blogsRouter.put('/:id', userExtractor, async (request, response, next) => {
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

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

blogsRouter.get('/:id/comments', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    console.log(blog.comments)
    response.json(blog.comments)
  } else {
    response.status(404).end()
  }
})

blogsRouter.post('/:id/comments', async (request, response, next) => {
  const comment = request.body.comment
  const blogToUpdate = await Blog.findById(request.params.id)
  const blog = {
    comments: blogToUpdate.comments.concat(comment)
  }

  try {
    const savedComment = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.json(savedComment)
  } catch(error) {
    next(error)
  }

})

module.exports = blogsRouter