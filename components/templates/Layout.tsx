import { ReactNode, useState } from 'react';

import { MetaData } from '../../types/metaData';
import { TagListResponse } from '../../types/tag';
import Header from '../organisms/Header';

import Sidebar from '../organisms/Sidebar';
import CommonMeta from '../templates/CommonMeta';

type Props = {
  children?: ReactNode;
  tagList: TagListResponse;
  meta: MetaData;
};

const Layout = ({ children, tagList, meta }: Props) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <div className='flex overflow-hidden h-screen bg-gray-200'>
        <div className='flex overflow-x-hidden overflow-y-auto relative flex-col flex-1'>
          <CommonMeta meta={meta} />
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <main className='container mx-auto max-w-6xl'>
            <div className='flex justify-center'>
              <div className='flex-auto'>{children}</div>
              <Sidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
                tagList={tagList}
              />
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Layout;
