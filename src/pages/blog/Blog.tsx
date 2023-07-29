import CreateBlog from './components/CreateBlog'
import PostList from './components/PostList'

export default function Blog() {
  return (
    <div className='p-5 flex'>
      <CreateBlog />
      <PostList />
    </div>
  )
}
