import { useSelector } from 'react-redux'
import PostItem from '../PostItem'
import { RootState, useAppDispatch } from '../../../../store'
import { deletedPost, editPost, getPostList } from '../../blog.slice'
import { useEffect } from 'react'
import SkeletonPost from '../SkeletonPost'

export default function PostList() {
  const postList = useSelector((state: RootState) => state.blog.postList)
  const loading = useSelector((state: RootState) => state.blog.loading)
  const dispatch = useAppDispatch()
  useEffect(() => {
    const promise = dispatch(getPostList())
    return () => {
      promise.abort()
    }
  }, [dispatch])
  const handleDeleted = (postId: string) => {
    dispatch(deletedPost(postId))
  }
  const handleEdit = (postId: string) => {
    dispatch(editPost(postId))
  }
  return (
    <div className='bg-white py-1 sm:py-8 lg:py-12 w-2/3 lg:w-[75%]'>
      <div className='mx-auto max-w-screen-xl px-4 md:px-8'>
        <div className='mb-10 md:mb-16'>
          <h2 className='mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl'>My Blog</h2>
          <p className='mx-auto max-w-screen-md text-center text-gray-500 md:text-lg'>
            Đừng bao giờ từ bỏ. Hôm nay khó khăn, ngày mai sẽ trở nên tồi tệ. Nhưng ngày mốt sẽ có nắng
          </p>
        </div>
        <div className='grid gap-4 xl:grid-cols-2 md:gap-6'>
          {loading && (
            <>
              <SkeletonPost />
              <SkeletonPost />
              <SkeletonPost />
              <SkeletonPost />
            </>
          )}
          {!loading &&
            postList.map((post) => (
              <PostItem post={post} key={post.id} handleDeleted={handleDeleted} handleEdit={handleEdit} />
            ))}
        </div>
      </div>
    </div>
  )
}
