import { useState } from 'react'
import { useMutation } from '@apollo/client'

import { EDIT_AUTHOR_BORN } from '../queries'

const AuthorForm = ({ authors }) => {
    const [name, setName] = useState('')
    const [born, setBorn] = useState('')

    const [ editBorn ] = useMutation(EDIT_AUTHOR_BORN)

    const submit = async (event) => {
        event.preventDefault()

        editBorn({ variables: { name, born } })

        setName('')
        setBorn('')

    }

    return (
        <div>
            <h2>Set birthyear</h2>

            <form onSubmit={submit}>
                <div>
                    name
                    <select onChange={({ target }) => setName(target.value)}>
                        {authors.map((a) => (
                            <option key={a.name} value={a.name}>{a.name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    born
                    <input
                        value={born}
                        onChange={({ target }) => setBorn(parseInt(target.value))}
                    />
                </div>
                <button type='submit'>update author</button>
            </form>
        </div>
    )
}

export default AuthorForm