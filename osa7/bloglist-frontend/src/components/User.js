const User = ({ user }) => {
    const userStyle = {
        paddingRight: 20,
    }

    return (
        <div>
            <tr>
                <td>
                    &nbsp;
                </td>
                <td>
                    <b>blogs created</b>
                </td>
            </tr>
            <tr>
                <td style={userStyle} key={user.id}>
                    {user.name}
                </td>
                <td>
                    {user.blogs.length}
                </td>
            </tr>
        </div>
    )
}

export default User