import React, { ReactNode, useState, useEffect } from 'react';

import Header from '../organisms/Header';
import Sidebar from '../organisms/Sidebar';

interface Props {
  children?: ReactNode;
}

const Layout = ({ children }: Props) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <div className='flex overflow-hidden h-screen'>
        <div className='flex overflow-x-hidden overflow-y-auto relative flex-col flex-1'>
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <main className='container mx-auto max-w-6xl'>
            <div className='flex justify-center'>
              <div className={`flex-auto bg-gray-100`}>{children}</div>
              <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Layout;
