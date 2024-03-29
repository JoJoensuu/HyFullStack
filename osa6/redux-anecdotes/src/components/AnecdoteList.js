import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, addVote }) => {
    return (
        <li>
            {anecdote.content}
            <button onClick={addVote}>{anecdote.votes}</button>
        </li>
    )
}

const Anecdotes = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => state.anecdotes)

    return (
        <ul>
            {anecdotes.map(anecdote => 
                <Anecdote
                    key={anecdote.id}
                    anecdote={anecdote}
                    addVote={() => {
                        dispatch(voteAnecdote(anecdote.id))
                        dispatch(setNotification(`you voted ${anecdote.content}`, 5))
                    }}
                />
                )}
        </ul>
    )
}

export default Anecdotes