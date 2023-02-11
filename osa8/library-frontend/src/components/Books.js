import { useState } from 'react'
import { ALL_BOOKS } from '../queries'
import { useQuery } from '@apollo/client'

const Books = (props) => {
  const [genreFilter, setGenreFilter] = useState('')

  const { data } = useQuery(ALL_BOOKS, { variables: { genre: genreFilter === '' ? null : genreFilter } })

  if (props.books.loading) {
    return <div>loading...</div>
  }
  if (!props.show) {
    return null
  }
  if (!data) {
    return null
  }
  const books = props.books.data.allBooks
  const filteredBooks = genreFilter === '' ? books : data.allBooks
  const genres = []
  books.map(book => book.genres.map(genre => genres.includes(genre) ? null : genres.push(genre)))

  const booksToShow = filteredBooks.filter(book => genreFilter !== '' ? book.genres.includes(genreFilter) : book)
  

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {booksToShow.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {genres.map((a) => (
          <button key={a} onClick={() => {setGenreFilter(a)}}>{a}</button>
        ))}
        <button onClick={() => {setGenreFilter('')}}>all genres</button>
      </div>
    </div>
  )
}

export default Books
