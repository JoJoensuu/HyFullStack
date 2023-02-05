import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { gql, useQuery } from '@apollo/client'

const QUERY = gql`
  query {
    allAuthors {
      name
      born
      id
      bookCount
    }
    allBooks {
      title
      author
      published
    }
  }
`

const App = () => {
  const [page, setPage] = useState('authors')
  const result = useQuery(QUERY)

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      <Authors show={page === 'authors'} authors={result} />

      <Books show={page === 'books'} books={result} />

      <NewBook show={page === 'add'} />
    </div>
  )
}

export default App
