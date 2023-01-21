const User = ({ user }) => {
    const userStyle = {
        paddingRight: 20,
    }

    return (
        <tr>
            <td style={userStyle} key={user.id}>
                {user.name}
            </td>
            <td>
                {user.blogs.length}
            </td>
        </tr>
    )
}

export default User