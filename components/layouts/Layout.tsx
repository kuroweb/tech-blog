// common
import { ReactNode, useState } from 'react'

// contexts
import { SidebarContext } from '../../contexts/sidebarContext'

// components
import Sidebar from './Sidebar'
import Header from './Header'
import CommonMeta from './CommonMeta'

// types
import { MetaData } from '../../types/metaData'
import { TagListResponse } from '../../types/tag'

type Props = {
  children?: ReactNode
  tagList: TagListResponse
  meta: MetaData
}

const Layout = ({ children, tagList, meta }: Props) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <>
      <SidebarContext.Provider value={{ sidebarOpen, setSidebarOpen }}>
        <div className='bg-gray-200'>
          <CommonMeta meta={meta} />
          <Header />
          <main className='container mx-auto max-w-6xl p-4'>
            <div className='grid grid-cols-12 gap-4'>
              <div className='col-span-12 md:col-span-8 lg:col-span-9'>{children}</div>
              <div className='col-span-12 md:col-span-4 lg:col-span-3'>
                <Sidebar tagList={tagList} />
              </div>
            </div>
          </main>
        </div>
      </SidebarContext.Provider>
    </>
  )
}

export default Layout
