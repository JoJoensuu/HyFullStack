import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommendations from './components/Recommendations'

import { useApolloClient, useQuery } from '@apollo/client'

import { ALL_AUTHORS, ALL_BOOKS, USER } from './queries'

const App = () => {
  const [token, setToken] = useState(null)
  const [page, setPage] = useState('authors')
  const authors = useQuery(ALL_AUTHORS)
  const books = useQuery(ALL_BOOKS)
  const user = useQuery(USER)
  const client = useApolloClient()

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token && 
          <button onClick={() => setPage('add')}>add book</button>
        }
        {token &&
          <button onClick={() => setPage('recommend')}>recommend</button>
        }
        
        {token
          ? <button onClick={logout}>logout</button>
          : <button onClick={() => setPage('login')}>login</button>
        }
      </div>

      <Authors show={page === 'authors'} authors={authors} token={token} />

      <Books show={page === 'books'} books={books} />

      <NewBook show={page === 'add'} />

      <Recommendations show={page === 'recommend'} user={user} books={books} />

      {!token &&
        <LoginForm show={page === 'login'} setToken={setToken} />
      }
    </div>
  )
}

export default App
