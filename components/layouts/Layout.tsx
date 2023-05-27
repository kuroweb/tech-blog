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
        <div className='flex overflow-hidden h-screen bg-gray-200'>
          <div className='flex overflow-x-hidden overflow-y-auto relative flex-col flex-1'>
            <CommonMeta meta={meta} />
            <Header />
            <main className='container mx-auto max-w-6xl'>
              <div className='flex justify-center'>
                <div className='flex-auto'>{children}</div>
                <Sidebar tagList={tagList} />
              </div>
            </main>
          </div>
        </div>
      </SidebarContext.Provider>
    </>
  )
}

export default Layout
