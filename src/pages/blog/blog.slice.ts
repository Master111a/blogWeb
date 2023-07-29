import { PayloadAction, createAsyncThunk, createSlice, AsyncThunk } from '@reduxjs/toolkit'

import http from '../../utils/http'
import { Post } from '../../types/blog.type'

interface BlogState {
  postList: Post[]
  editPost: Post | null
  loading: boolean
  currentRequestId: undefined | string
}

const initialState: BlogState = {
  postList: [],
  editPost: null,
  loading: false,
  currentRequestId: undefined
}
type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>

type PendingAction = ReturnType<GenericAsyncThunk['pending']>
type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>
type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>
export const getPostList = createAsyncThunk('blog/getPostList', async (_, thunkAPI) => {
  const response = await http.get<Post[]>('posts', {
    signal: thunkAPI.signal
  })
  return response.data
})

export const addPostList = createAsyncThunk('blog/addPostList', async (body: Omit<Post, 'id'>, thunkAPI) => {
  try {
    const response = await http.post<Post>('posts', body, {
      signal: thunkAPI.signal
    })
    return response.data
  } catch (error: any) {
    if (error.name === 'AxiosError' && error.response.status === 422) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
    throw error
  }
})
export const updatePost = createAsyncThunk(
  'blog/updatePost',
  async ({ postID, body }: { postID: string; body: Post }, thunkAPI) => {
    try {
      const response = await http.put<Post>(`posts/${postID}`, body, {
        signal: thunkAPI.signal
      })
      return response.data
    } catch (error: any) {
      if (error.name === 'AxiosError' && error.response.status === 422) {
        return error.rejectWithValue(error.response.data)
      }
      throw error
    }
  }
)
export const deletedPost = createAsyncThunk('blog/deletedPostList', async (postID: string, thunkAPI) => {
  const response = await http.delete<Post>(`posts/${postID}`, {
    signal: thunkAPI.signal
  })
  return response.data
})
const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    editPost: (state, action: PayloadAction<string>) => {
      const editId = action.payload
      const editPostID = state.postList.find((post) => post.id === editId) || null
      state.editPost = editPostID
    },
    cancelEditPost: (state) => {
      state.editPost = null
    }
  },
  extraReducers(builder) {
    builder
      .addCase(getPostList.fulfilled, (state, action) => {
        state.postList = action.payload
      })

      .addCase(addPostList.fulfilled, (state, action) => {
        state.postList.push(action.payload)
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.postList.find((post, index) => {
          if (post.id === action.payload.id) {
            state.postList[index] = action.payload
            return true
          }
          return false
        })
      })
      .addCase(deletedPost.fulfilled, (state, action) => {
        const postID = action.meta.arg
        const deletedID = state.postList.findIndex((post) => post.id === postID)
        if (deletedID !== -1) {
          state.postList.splice(deletedID, 1)
        }
      })
      .addMatcher<PendingAction>(
        (action) => action.type.endsWith('/pending'),
        (state, action) => {
          state.loading = true
          state.currentRequestId = action.meta.requestId
        }
      )
      .addMatcher<RejectedAction | FulfilledAction>(
        (action) => action.type.endsWith('/rejected') || action.type.endsWith('/fulfilled'),
        (state, action) => {
          if (state.loading && state.currentRequestId === action.meta.requestId) {
            state.loading = false
            state.currentRequestId = undefined
          }
        }
      )
      .addDefaultCase((state, action) => {})
  }
})

export const { cancelEditPost, editPost } = blogSlice.actions
export default blogSlice.reducer
