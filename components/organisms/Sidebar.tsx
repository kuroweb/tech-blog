import Link from 'next/link';
import { useRouter } from 'next/router';

import React, { useEffect } from 'react';

type Props = {
  sidebarOpen: Boolean;
  setSidebarOpen: Function;
};

const Sidebar = ({ sidebarOpen, setSidebarOpen }: Props) => {
  const router = useRouter();
  const pathname = router.pathname;

  useEffect(() => {
    setSidebarOpen(sidebarOpen);
  });

  const menu = (
    <div className='space-y-8'>
      <div>
        <ul className='mt-3'>
          <li
            className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${pathname === '/' && 'bg-gray-900'}`}
          >
            <div
              className={`block text-gray-200 hover:text-white truncate transition duration-150 ${
                pathname === '/' && 'hover:text-gray-200'
              }`}
            >
              <div className='flex items-center'>
                <Link passHref href='/'>
                  Search
                </Link>
              </div>
            </div>
          </li>
          <li className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0`}>
            <div
              className={`block text-gray-200 hover:text-white truncate transition duration-150`}
            >
              <div className='flex items-center'>
                <Link passHref href='/'>
                  Categories
                </Link>
              </div>
            </div>
          </li>
          <li className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0`}>
            <div
              className={`block text-gray-200 hover:text-white truncate transition duration-150`}
            >
              <div className='flex items-center'>
                <Link passHref href='/'>
                  Tags
                </Link>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );

  return (
    <>
      {/* Sidebar */}
      <div
        className={`hidden md:flex p-4 min-w-[18rem] bg-gray-400 transition-all duration-200 ease-in-out transform translate-x-0`}
      >
        {menu}
      </div>
      {/* Drawer */}
      <div
        className={
          ' fixed overflow-hidden z-50 bg-gray-900 bg-opacity-25 inset-0 transform ease-in-out ' +
          (sidebarOpen
            ? ' transition-opacity opacity-100 duration-500 translate-x-0  '
            : ' transition-all delay-500 opacity-0 translate-x-full  ')
        }
      >
        <div
          className={
            ' w-screen max-w-[18rem] right-0 absolute bg-white h-full shadow-xl delay-400 duration-500 ease-in-out transition-all transform  ' +
            (sidebarOpen ? ' translate-x-0 ' : ' translate-x-full ')
          }
        >
          <div className='flex overflow-y-scroll relative flex-col pb-10 space-y-6 w-screen max-w-[18rem] h-full'>
            <div className='px-4 sm:px-6 lg:px-8'>
              <div className='flex justify-between items-center -mb-px h-16'>
                {/* Header: Left side */}
                <div className='flex'>
                  <h1>Drawer</h1>
                </div>
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
              {menu}
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
