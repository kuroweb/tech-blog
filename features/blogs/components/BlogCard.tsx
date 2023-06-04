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
  return (
    <>
      <div className='flex h-full'>
        <div className='rounded-lg border border-gray-200 bg-white shadow-md'>
          {blog.thumbnail ? (
            <Link href={`/blogs/${blog.id}`}>
              {
                <Image
                  className='rounded-t-lg object-cover'
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
                  className='rounded-t-lg object-cover'
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
                className='h-4 w-4'
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
            <div className='mt-2 flex flex-wrap'>
              {blog.tags.map((tag) => (
                <button
                  key={tag.id}
                  className='mb-1 mr-1 rounded-xl border border-blue-500 bg-transparent px-2 py-0.5 text-xs text-blue-700 hover:border-transparent hover:bg-blue-500 hover:text-white'
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
