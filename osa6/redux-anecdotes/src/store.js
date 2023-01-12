import { combineReducers, configureStore } from "@reduxjs/toolkit";
import anecdoteReducer, { appendAnecdote } from './reducers/anecdoteReducer'
import anecdoteService from './services/anecdotes'
import notificationReducer from "./reducers/notificationReducer";

const store = configureStore({
    reducer: combineReducers({
        anecdotes: anecdoteReducer,
        notification: notificationReducer
    })
})

anecdoteService.getAll().then(anecdotes => 
    anecdotes.forEach(anecdote => {
        store.dispatch(appendAnecdote(anecdote))
    })
)

export default store