import { useSelector, useDispatch } from 'react-redux'
import { AppDispatch, RootState } from '../../../../store'
import TodoItems from '../TodoItems'
import { Todo } from '../../../../types/Todo.type'
import { useEffect, useState } from 'react'
import { addTodo, cancelEditPost, deleteTodo, editTodo, updateTodo } from '../../todo.slice'

const initialTodo: Todo = {
  id: '',
  todo: '',
  isCompleted: false
}
export default function CreateTodo() {
  const [todo, setTodo] = useState<Todo>(initialTodo)
  const editList = useSelector((state: RootState) => state.todo.editList)
  const todoList = useSelector((state: RootState) => state.todo.todoList)
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    setTodo(editList || initialTodo)
  }, [editList])
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (editList) {
      dispatch(
        updateTodo({
          id: editList.id,
          todo: todo.todo,
          isCompleted: todo.isCompleted
        })
      )
      dispatch(cancelEditPost())
    } else {
      if (todo.todo !== '') {
        dispatch(addTodo(todo))
      }
    }
    setTodo(initialTodo)
  }
  const handleEdit = (todoId: string) => {
    dispatch(editTodo(todoId))
  }
  const handleDelete = (todoId: string) => {
    dispatch(deleteTodo(todoId))
  }
  const handleCancel = () => {
    setTodo(initialTodo)
    dispatch(cancelEditPost())
  }
  return (
    <div className='max-w-4xl mx-auto mt-4'>
      <div className='text-center -my-5 flex flex-col gap-4'>
        <h1 className='text-2xl font-bold'>To Do list</h1>
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            value={todo.todo}
            onChange={(e) => setTodo((pre) => ({ ...pre, todo: e.target.value }))}
            className='block w-full mb-3 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500'
          />
          <button
            type='submit'
            className='group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 p-1 text-sm font-medium text-gray-900 hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300 group-hover:from-purple-600 group-hover:to-blue-500 dark:text-white dark:focus:ring-blue-800'
          >
            {!editList ? 'Add todo' : 'Update'}
          </button>
          <button
            type='button'
            onClick={handleCancel}
            className='group ml-3 relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 p-1 text-sm font-medium text-gray-900 hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300 group-hover:from-purple-600 group-hover:to-blue-500 dark:text-white dark:focus:ring-blue-800'
          >
            Cancel
          </button>
          <div className='bg-white py-6 sm:py-8 lg:py-12'>
            {todoList.map((todo) => (
              <TodoItems todo={todo} key={todo.id} handleEdit={handleEdit} handleDelete={handleDelete} />
            ))}
          </div>
        </form>
      </div>
    </div>
  )
}
