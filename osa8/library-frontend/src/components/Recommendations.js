const Recommendations = (props) => {
    const favoriteGenre = props.user.data.me.favoriteGenre
    const books = props.books.data.allBooks.filter(book => book.genres.includes(favoriteGenre))

    if (!props.show) {
        return null
    }

    return (
        <div>
            <h2>Recommendations</h2>
            <em>books in your favorite genre </em><b>{favoriteGenre}</b>
            <table>
                <tbody>
                <tr>
                    <th></th>
                    <th>author</th>
                    <th>published</th>
                </tr>
                {books.map((a) => (
                    <tr key={a.title}>
                    <td>{a.title}</td>
                    <td>{a.author.name}</td>
                    <td>{a.published}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )

}

export default Recommendations