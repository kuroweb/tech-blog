import type { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';

const Page: NextPage = () => {
  const router = useRouter();
  const pathname = router.pathname;

  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    console.log(sidebarOpen);
    setSidebarOpen(sidebarOpen);
  }, [sidebarOpen]);

  const doAction = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className='flex overflow-hidden h-screen'>
      <div className='flex overflow-x-hidden overflow-y-auto relative flex-col flex-1'>
        {/* Header */}
        <header className='sticky top-0 z-30 bg-white border-b border-gray-200'>
          <div className='px-4 sm:px-6 lg:px-8'>
            <div className='flex justify-between items-center -mb-px h-16'>
              {/* Header: Left side */}
              <div className='flex'>
                {/* Hamburger button */}
                <button
                  className='text-gray-500 hover:text-gray-600'
                  aria-controls='sidebar'
                  aria-expanded={sidebarOpen}
                  onClick={doAction}
                >
                  <span className='sr-only'>Open sidebar</span>
                  <svg
                    className='w-6 h-6 fill-current'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <rect x='4' y='5' width='16' height='2' />
                    <rect x='4' y='11' width='16' height='2' />
                    <rect x='4' y='17' width='16' height='2' />
                  </svg>
                </button>
                <h1>Header</h1>
              </div>
              {/* Header: Right side */}
              <div className='flex items-center'>
                {/*  Divider */}
                {/* <hr className='mx-3 w-px h-6 bg-gray-200' /> */}
              </div>
            </div>
          </div>
        </header>
        <main className='container mx-auto'>
          <div className='flex justify-center max-w-5xl'>
            {/* Content */}
            <div className='flex-auto bg-gray-100'>
              <div className='py-8 px-4 sm:px-6 lg:px-8 w-full'>
                <h1>Home</h1>
                <h1>Home</h1>
                <h1>Home</h1>
                <h1>Home</h1>
                <h1>Home</h1>
                <h1>Home</h1>
                <h1>Home</h1>
                <h1>Home</h1>
              </div>
            </div>
            {/* Sidebar */}
            <div className='flex p-4 w-72 bg-gray-400 transition-all duration-200 ease-in-out transform lg:translate-x-0'>
              <div className='space-y-8'>
                <div>
                  <ul className='mt-3'>
                    <li
                      className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
                        pathname === '/' && 'bg-gray-900'
                      }`}
                    >
                      <div
                        className={`block text-gray-200 hover:text-white truncate transition duration-150 ${
                          pathname === '/' && 'hover:text-gray-200'
                        }`}
                      >
                        <div className='flex items-center'>
                          <Link passHref href='/'>
                            Dashboard
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
                            Dashboard
                          </Link>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Page;
