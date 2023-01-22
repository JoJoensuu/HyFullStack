import { Table } from 'react-bootstrap'

const UserList = ({ user, getInfo }) => {
    const userStyle = {
        paddingRight: 20,
    }

    return (
        <div>
            <Table striped>
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
            </Table>
        </div>
    )
}

export default UserList