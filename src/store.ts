import { configureStore } from '@reduxjs/toolkit'
import todoSlice from './pages/todo/todo.slice'
import blogSlice from './pages/blog/blog.slice'
import { useDispatch } from 'react-redux'
// ...

export const store = configureStore({
  reducer: {
    todo: todoSlice,
    blog: blogSlice
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
