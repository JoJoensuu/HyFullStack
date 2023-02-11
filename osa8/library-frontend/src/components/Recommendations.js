const Recommendations = (props) => {
    
    
    if (props.books.loading || props.user.loading) {
        return null
    }
    if (!props.show) {
        return null
    }
    const favoriteGenre = props.user.data.me.favoriteGenre
    const books = props.books.data.allBooks

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