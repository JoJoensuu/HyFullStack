import { combineReducers, configureStore } from "@reduxjs/toolkit";
import anecdoteReducer from './reducers/anecdoteReducer'
import notificationReducer from "./reducers/notificationReducer";

const store = configureStore({
    reducer: combineReducers({
        anecdotes: anecdoteReducer,
        notification: notificationReducer
    })
})

console.log(store.getState())

export default store