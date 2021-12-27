import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { TagListResponse } from '../../types/tag';

import TagButton from '../organisms/TagButton';

type Props = {
  sidebarOpen: Boolean;
  setSidebarOpen: Function;
  tagList: TagListResponse;
};

const Sidebar = ({ sidebarOpen, setSidebarOpen, tagList }: Props) => {
  const router = useRouter();
  const pathname = router.pathname;

  useEffect(() => {
    setSidebarOpen(sidebarOpen);
  });

  const menu = (
    <div className='flex flex-col p-4'>
      <div className='mb-4'>
        <div className='flex items-center bg-white rounded-lg' x-data="{ search: '' }">
          <div>
            <input
              type='search'
              className='py-1 px-4 text-gray-900 focus:outline-none'
              placeholder='search'
              x-model='search'
            />
          </div>
          <div>
            <button
              type='submit'
              className='flex justify-center items-center w-12 h-12 text-gray-100 bg-gray-600 rounded-lg'
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
      </div>

      <div className='p-4 mb-4 bg-white rounded-lg'>
        <h2>Categories</h2>
        <p>test</p>
      </div>

      <div className={'p-4 mb-4 bg-white rounded-lg'}>
        <h2>Tags</h2>
        {tagList.contents.map((tag) => (
          <TagButton tag={tag} key={tag.id} />
        ))}
      </div>
    </div>
  );

  return (
    <>
      {/* Sidebar */}
      <div
        className={
          'hidden md:flex md:flex-col pt-4 w-screen max-w-[18rem] transition-all duration-200 ease-in-out transform translate-x-0'
        }
      >
        {menu}
      </div>
      {/* Drawer */}
      <div
        className={
          'fixed overflow-hidden z-50 bg-gray-900 bg-opacity-25 inset-0 transform ease-in-out' +
          (sidebarOpen
            ? ' transition-opacity opacity-100 duration-500 translate-x-0  '
            : ' transition-all delay-500 opacity-0 translate-x-full ')
        }
      >
        <div
          className={
            'w-screen max-w-[18rem] right-0 absolute bg-gray-200 h-full shadow-xl delay-400 duration-500 ease-in-out transition-all transform' +
            (sidebarOpen ? ' translate-x-0' : ' translate-x-full')
          }
        >
          <div className='flex overflow-y-scroll relative flex-col w-screen max-w-[18rem] h-full'>
            <div className='px-4'>
              <div className='flex justify-between items-center -mb-px h-16'>
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
            </div>
            {menu}
          </div>
        </div>
        <div
          className='w-screen h-full cursor-pointer'
          onClick={() => {
            setSidebarOpen(false);
          }}
        ></div>
      </div>
    </>
  );
};

export default Sidebar;
