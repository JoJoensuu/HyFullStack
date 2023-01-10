import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'

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
                    addVote={() => 
                        dispatch(voteAnecdote(anecdote.id))}
                />
                )}
        </ul>
    )
}

export default Anecdotes