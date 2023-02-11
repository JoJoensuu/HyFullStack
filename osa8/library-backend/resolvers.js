const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')

const resolvers = {
    Query: {
      bookCount: () => Book.collection.countDocuments(),
      authorCount: () => Author.collection.countDocuments(),
      allBooks: async (root, args) => {
        const books = await Book.find({}).populate('author')
        filteredBooks = [...books]
        filteredBooks =
          args.genre === undefined
            ? filteredBooks
            : filteredBooks.filter(b => b.genres.includes(args.genre))
        return filteredBooks
      },
      allAuthors: async () => {
        return Author.find({})
      },
      me: (root, args, context) => {
        return context.currentUser
      }
    },
    Author: {
      authorsBookCount: async (root) => {
        const books = await Book.find({}).populate('author')
        return books.reduce((amount, book) => {
          return book.author.name === root.name ? amount + 1 : amount
        }, 0)
      }
    },
    Mutation: {
      addBook: async (root, args, context) => {
        const currentUser = context.currentUser
        if (!currentUser) {
          throw new GraphQLError('not authenticated', {
            extensions: {
              code: 'BAD_USER_INPUT'
            }
          })
        }
        let author = await Author.findOne({ name: args.author })
        console.log(author)
        if(!author) {
          author = new Author({ name: args.author })
          console.log(author)
          try {
            await author.save()
          } catch (error) {
            throw new GraphQLError('Saving author failed', {
              extensions: {
                code: 'BAD_USER_INPUT',
                invalidArgs: args.author,
                error
              }
            })
          }
          
        }
        const book = new Book({
          title: args.title,
          published: args.published,
          author: author,
          genres: args.genres
        })
        try {
          await book.save()
        } catch (error) {
          throw new GraphQLError('Saving book failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.title,
              error
            }
          })
        }
        return book
      },
      editAuthor: async (root, args, context) => {
        const currentUser = context.currentUser
        if (!currentUser) {
          throw new GraphQLError('not authenticated', {
            extensions: {
              code: 'BAD_USER_INPUT'
            }
          })
        }
        const author = await Author.findOne({ name: args.name })
        author.born = args.setBornTo
        try {
          await author.save()
        } catch (error) {
          throw new GraphQLError('Editing author failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.name,
              error
            }
          })
        }
        return author
      },
      createUser: async (root, args) => {
        const user = new User({
          username: args.username,
          favoriteGenre: args.favoriteGenre
        })
  
        return user.save()
          .catch(error => {
            throw new GraphQLError('Creating the user failed', {
              extensions: {
                code: 'BAD_USER_INPUT',
                invalidArgs: args.name,
                error
              }
            })
          })
      },
      login: async (root, args) => {
        const user = await User.findOne({ username: args.username })
  
        if ( !user || args.password !== 'secretpassword' ) {
          throw new GraphQLError('wrong credentials', {
            extensions: {
              code: 'BAD_USER_INPUT'
            }
          })
        }
  
        const userForToken = {
          username: user.username,
          id: user._id,
        }
  
        return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
      }
    }
}

module.exports = resolvers