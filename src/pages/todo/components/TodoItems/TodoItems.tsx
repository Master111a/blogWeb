import { Todo } from '../../../../types/Todo.type'

interface TodoItemsType {
  todo: Todo
  // editList: Todo | null
  handleEdit: (todoID: string) => void
  handleDelete: (todoID: string) => void
}
export default function TodoItems({ todo, handleEdit, handleDelete }: TodoItemsType) {
  return (
    <div className='flex flex-row gap-2 p-4 lg:p-6'>
      <input type='checkbox' />
      <span className='text-sm flex text-gray-400 items-center ml-2 '>{todo.todo}</span>
      <button
        type='button'
        onClick={() => handleEdit(todo.id)}
        className='ml-auto rounded-l-lg border border-gray-200 bg-white py-2 px-4 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:text-blue-700 focus:ring-2 focus:ring-blue-700'
      >
        EDIT
      </button>
      <button
        type='button'
        onClick={() => handleDelete(todo.id)}
        className='rounded-r-lg border-t border-b border-r border-gray-200 bg-white py-2 px-4 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:text-blue-700 focus:ring-2 focus:ring-blue-700'
      >
        DEL
      </button>
    </div>
  )
}
