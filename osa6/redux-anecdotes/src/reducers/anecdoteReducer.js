import { createSlice } from '@reduxjs/toolkit'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      const content = action.payload
      state.push({
        content,
        id: getId(),
        votes: 0
      })
    },
    voteAnecdote(state, action) {
      const id = action.payload
      const anecdoteToChange = state.find(n => n.id === id)
      const newAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }
      return state.map(anec => anec.id !== id ? anec : newAnecdote)
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    }
  }
})

export const { createAnecdote, voteAnecdote, appendAnecdote } = anecdoteSlice.actions
export default anecdoteSlice.reducer