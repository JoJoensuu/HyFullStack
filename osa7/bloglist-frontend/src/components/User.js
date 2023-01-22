import { BrowserRouter as useParams } from 'react-router-dom'

const User = ({ users }) => {
    const id = useParams().id
    const user = users.find(u => u.id === id)

    return (
        <div>
            {user.name}
        </div>
    )
}

export default User