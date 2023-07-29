import { PayloadAction, createSlice, nanoid } from '@reduxjs/toolkit'
import { Todo } from '../../types/Todo.type'
import { initialTodoList } from './constants/todo'
interface ToDoState {
  todoList: Todo[]
  editList: Todo | null
}
const initialState: ToDoState = {
  todoList: initialTodoList,
  editList: null
}

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: {
      reducer: (state, action: PayloadAction<Todo>) => {
        state.todoList.push(action.payload)
      },
      prepare: (todo: Omit<Todo, 'id'>) => ({
        payload: {
          ...todo,
          id: nanoid()
        }
      })
    },
    editTodo: (state, action) => {
      const editId = action.payload
      const todoEdit = state.todoList.find((todo) => todo.id === editId) || null
      state.editList = todoEdit
    },
    updateTodo: (state, action) => {
      state.todoList.find((todo, index) => {
        if (todo.id === action.payload.id) {
          state.todoList[index] = action.payload
          return true
        }
        return false
      })
    },
    cancelEditPost: (state) => {
      state.editList = null
    },
    deleteTodo: (state, action) => {
      const delId = action.payload
      const todoDel = state.todoList.findIndex((todo) => todo.id === delId)
      state.todoList.splice(todoDel, 1)
    }
  }
})
export const { addTodo, editTodo, deleteTodo, updateTodo, cancelEditPost } = todoSlice.actions
export default todoSlice.reducer
