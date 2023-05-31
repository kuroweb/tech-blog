// commont
import router from 'next/router'
import { useCallback } from 'react'

// components
import Card from '../../../features/blogs/components/BlogCard'

// types
import { BlogListResponse } from '../../../types/blog'

type Props = {
  offset: number
  blogList: BlogListResponse
}

const BlogList = (props: Props) => {
  const currentPage = props.offset
  const totalPage = Math.ceil(props.blogList.totalCount / props.blogList.limit)
  const startPage = currentPage == 1 ? 1 : currentPage - 1
  const endPage = currentPage == totalPage ? currentPage : currentPage + 1
  const range = (start: number, end: number) => [...Array(end - start + 1)].map((_, i) => start + i)

  const handleChangePage = useCallback((page: number) => {
    void router.push(`/blogs/page/${page}`)
  }, [])

  return (
    <>
      <div className='container mx-auto'>
        <p className='text-2xl font-bold'>Posts</p>
        <div className='grid grid-cols-2 gap-4'>
          {props.blogList.contents.map((blog) => (
            <div className='col-span-1' key={blog.id}>
              <Card blog={blog} />
            </div>
          ))}
        </div>
        <div className='p-8'>
          <div className='flex items-center justify-center space-x-2'>
            {currentPage == 1 ? (
              ''
            ) : (
              <a
                onClick={() => handleChangePage(currentPage - 1)}
                className='flex items-center rounded-md bg-white p-2 text-gray-600 shadow-md hover:bg-gray-600 hover:text-white'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-6 w-6 cursor-pointer'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M11 17l-5-5m0 0l5-5m-5 5h12'
                  />
                </svg>
              </a>
            )}
            {range(startPage, endPage).map((page: number) =>
              currentPage === page ? (
                <a className='rounded-md bg-gray-600 px-4 py-2 text-white shadow-md' key={page}>
                  {page}
                </a>
              ) : (
                <a
                  onClick={() => handleChangePage(page)}
                  className='cursor-pointer rounded-md bg-white px-4 py-2 text-gray-600 shadow-md hover:bg-gray-600 hover:text-white'
                  key={page}
                >
                  {page}
                </a>
              ),
            )}
            {currentPage == endPage ? (
              ''
            ) : (
              <a
                onClick={() => handleChangePage(currentPage + 1)}
                className='flex items-center rounded-md bg-white p-2 text-gray-600 shadow-md hover:bg-gray-600 hover:text-white'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-6 w-6 cursor-pointer'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M13 7l5 5m0 0l-5 5m5-5H6'
                  />
                </svg>
              </a>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default BlogList
