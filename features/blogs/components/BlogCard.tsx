// common
import Image from 'next/image'
import Link from 'next/link'

// package
import moment from 'moment'

// types
import { BlogResponse } from '../../../types/blog'

type blogProps = {
  blog: BlogResponse
}

const BlogCard = ({ blog }: blogProps) => {
  const format = (str: string) => {
    const day = moment(str)
    return day.format('YYYY-MM-DD')
  }

  return (
    <>
      <div className='flex h-full'>
        <div className='bg-white rounded-lg border border-gray-200 shadow-md'>
          {blog.thumbnail ? (
            <Link href={`/blogs/${blog.id}`}>
              {
                <Image
                  className='object-cover rounded-t-lg'
                  src={blog.thumbnail.url}
                  alt='thumbnail'
                  width={500}
                  height={250}
                  priority
                />
              }
            </Link>
          ) : (
            <Link href={`/blogs/${blog.id}`}>
              {
                <Image
                  className='object-cover rounded-t-lg'
                  src='https://images.microcms-assets.io/assets/905a207a61104dbda1ff337051103d38/c31c6dc3379f4c0f963a30ec5cebf2d9/icon_default_image.svg'
                  alt='thumbnail'
                  width={500}
                  height={250}
                  priority
                />
              }
            </Link>
          )}
          <div className='p-4 pt-2'>
            <h1 className='mb-2 font-bold tracking-tight text-gray-900'>
              <Link href={`/blogs/${blog.id}`}>{blog.title}</Link>
            </h1>
            <div className='flex'>
              <svg
                className='w-4 h-4'
                stroke='gray'
                strokeWidth='3'
                fill='none'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path d='M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15' />
              </svg>
              <p className='pl-1 text-xs text-gray-500'>{moment(blog.updatedAt).format('YYYY-MM-DD')}</p>
            </div>
            <div className='flex flex-wrap mt-2'>
              {blog.tags.map((tag) => (
                <button
                  key={tag.id}
                  className='py-0.5 px-2 mr-1 mb-1 text-xs text-blue-700 hover:text-white bg-transparent hover:bg-blue-500 rounded-xl border border-blue-500 hover:border-transparent'
                >
                  <Link passHref href={'/tags/' + tag.id}>
                    {tag.name}
                  </Link>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default BlogCard
