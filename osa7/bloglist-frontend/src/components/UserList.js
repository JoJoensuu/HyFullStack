const UserList = ({ user, getInfo }) => {
    const userStyle = {
        paddingRight: 20,
    }

    return (
        <div>
            <table>
                <tbody>
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
                            {getInfo}
                        </td>
                        <td>
                            {user.blogs.length}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default UserList