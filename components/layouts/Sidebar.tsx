// common
import Image from 'next/image'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useCallback, useContext, useState } from 'react'

// contexts
import { SidebarContext } from '../../contexts/sidebarContext'

// types
import { TagListResponse } from '../../types/tag'

type Props = {
  tagList: TagListResponse
}

const Sidebar = ({ tagList }: Props) => {
  const { sidebarOpen, setSidebarOpen } = useContext(SidebarContext)
  const [search, setSearch] = useState('')
  const router = useRouter()

  const handleChangeKeyword = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { value } = e.currentTarget
      setSearch(value)
    },
    [setSearch],
  )

  const handleClickSearchButton = useCallback(() => {
    void router.push(`/blogs/search?keyword=${search}`)
    setSidebarOpen(false)
  }, [router, search, setSidebarOpen])

  const handleKeyDownSearch = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (e.key === 'Enter') {
        void router.push(`/blogs/search?keyword=${search}`)
        setSidebarOpen(false)
      }
    },
    [router, search, setSidebarOpen],
  )

  const menu = (
    <>
      <div className='pb-4'>
        <div className='flex justify-between items-center bg-white rounded-lg shadow-lg'>
          <input
            type='search'
            className='px-4 text-gray-900 focus:outline-none'
            placeholder='search'
            onChange={handleChangeKeyword}
            onKeyDown={handleKeyDownSearch}
          />

          <button
            type='submit'
            className='flex justify-center items-center w-12 h-12 text-gray-100 bg-gray-600 hover:bg-gray-400 rounded-lg shadow-lg'
            onClick={handleClickSearchButton}
          >
            <svg
              className='w-5 h-5'
              stroke='white'
              fill='none'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
              ></path>
            </svg>
          </button>
        </div>
      </div>
      <div className='p-4 bg-white rounded-lg shadow-lg'>
        <p className='pb-2 font-bold'>Tags</p>
        {tagList.contents.map((tag) => (
          <button
            key={tag.id}
            className='py-0.5 px-2 mr-1 mb-1 text-xs text-blue-700 hover:text-white bg-transparent hover:bg-blue-500 rounded-xl border border-blue-500 hover:border-transparent'
            onClick={() => setSidebarOpen(false)}
          >
            <Link href={'/tags/' + tag.id}>
              {tag.name}
            </Link>
          </button>
        ))}
      </div>
      <div className='pt-4'>
        <div className='bg-white rounded-lg shadow-lg'>
          <Image
            alt='profil'
            src='https://images.microcms-assets.io/assets/905a207a61104dbda1ff337051103d38/6079187ac85e4e23b67e53d1ff04e59e/4105982416-1985037-PN96-960x540-MM-100.jpg'
            className='object-cover rounded-t-lg'
            width={300}
            height={130}
            priority
          />
          <div className='flex flex-col justify-center items-center p-4 -mt-14'>
            <Image
              alt='profil'
              src='https://images.microcms-assets.io/assets/905a207a61104dbda1ff337051103d38/3379dcd3663344bf8f03e3fc46e09a30/r79iCrKh_400x400.jpg'
              className='object-cover mx-auto w-16 h-16 rounded-full'
              width={60}
              height={60}
              priority
            />
            <p className='mt-2 text-xl font-medium text-gray-800 '>KURO</p>
            <p className='flex items-center text-xs text-gray-400'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='w-4 h-4'
                viewBox='0 0 20 20'
                fill='currentColor'
              >
                <path
                  fillRule='evenodd'
                  d='M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z'
                  clipRule='evenodd'
                />
              </svg>
              Tokyo
            </p>
            <p className='pt-2 text-xs text-gray-400'>サーバーサイドエンジニア1年目。</p>
            <p className='text-xs text-gray-400'>学習内容やメモ書きを残します。</p>
          </div>
        </div>
      </div>
    </>
  )

  return (
    <>
      {/* Sidebar */}
      <div
        className={
          'hidden md:flex md:flex-col transition-all duration-200 ease-in-out transform translate-x-0'
        }
      >
        <div className='pt-4 md:pt-8 sm:pr-4 md:pr-8 w-[20rem]'>{menu}</div>
      </div>
      {/* Drawer */}
      <div
        className={
          'sm:initial md:hidden fixed overflow-hidden z-50 bg-gray-900 bg-opacity-25 inset-0 transform ease-in-out' +
          (sidebarOpen
            ? ' transition-opacity opacity-100 duration-500 translate-x-0  '
            : ' transition-all delay-500 opacity-0 translate-x-full ')
        }
      >
        <div
          className={
            'w-[20rem] right-0 overflow-y-scroll absolute bg-gray-200 h-full shadow-xl delay-400 duration-500 ease-in-out transition-all transform' +
            (sidebarOpen ? ' translate-x-0' : ' translate-x-full')
          }
        >
          <div className='flex flex-col'>
            <div className='px-4'>
              <div className='flex justify-between items-center h-16'>
                {/* Header: Left side */}
                <div className='flex'></div>
                {/* Header: Right side */}
                <div className='flex items-center'>
                  {/* Hamburger button */}
                  <button
                    className='text-gray-500 hover:text-gray-600'
                    aria-controls='sidebar'
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                  >
                    <svg
                      className='w-6 h-6 rotate-180 fill-current'
                      viewBox='0 0 24 24'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path d='M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z'></path>
                    </svg>
                  </button>
                </div>
              </div>
              <div className='pt-4'>{menu}</div>
            </div>
          </div>
        </div>
        <div
          className='w-screen h-full cursor-pointer'
          onClick={() => {
            setSidebarOpen(false)
          }}
        ></div>
      </div>
    </>
  )
}

export default Sidebar
