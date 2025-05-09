import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../reducers/counterSlice'
import generalSlice from '../reducers/generalStates'

export const store = configureStore({
  reducer: {
    general: generalSlice,
    counter: counterReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
