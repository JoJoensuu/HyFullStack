import AuthorForm from './AuthorForm'

const Authors = (props) => {
  if (props.authors.loading) {
    return <div>loading...</div>
  }
  if (!props.show) {
    return null
  }

  const authors = props.authors.data.allAuthors

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.authorsBookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {props.token &&
        <AuthorForm authors={authors} />
      }
    </div>
  )
}

export default Authors
