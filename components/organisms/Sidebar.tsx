import React, { useEffect } from 'react';
import { TagListResponse } from '../../types/tag';

import SearchInput from '../organisms/SearchInput';
import TagButton from '../organisms/TagButton';

type Props = {
  sidebarOpen: Boolean;
  setSidebarOpen: Function;
  tagList: TagListResponse;
};

const Sidebar = ({ sidebarOpen, setSidebarOpen, tagList }: Props) => {
  useEffect(() => {
    setSidebarOpen(sidebarOpen);
  });

  const menu = (
    <div className=''>
      <div className='mb-4'>
        <SearchInput />
      </div>
      <div className={'p-4 bg-white rounded-lg'}>
        <p className='pb-2 font-bold'>Tags</p>
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
          'hidden md:flex md:flex-col transition-all duration-200 ease-in-out transform translate-x-0'
        }
      >
        <div className='pt-4 md:pt-8 sm:pr-4 md:pr-8 max-w-[18rem]'>{menu}</div>
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
            'w-screen max-w-[20rem] right-0 overflow-y-scroll absolute bg-gray-200 h-full shadow-xl delay-400 duration-500 ease-in-out transition-all transform' +
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
            setSidebarOpen(false);
          }}
        ></div>
      </div>
    </>
  );
};

export default Sidebar;
