// common
import type { NextPage, GetStaticProps, InferGetStaticPropsType } from 'next'
import React from 'react'

// components
import Layout from '../components/templates/Layout'
import BlogList from 'features/blogs/components/BlogList'

// types
import { BlogListResponse } from '../types/blog'
import { SiteDataResponse } from '../types/siteData'
import { TagListResponse } from '../types/tag'

// utils
import { client } from '../utils/api'

type StaticProps = {
  siteData: SiteDataResponse
  blogList: BlogListResponse
  tagList: TagListResponse
}

type PageProps = InferGetStaticPropsType<typeof getStaticProps>

export const getStaticProps: GetStaticProps<StaticProps> = async () => {
  const siteDataPromise = client.get<SiteDataResponse>({
    endpoint: 'sitedata',
    queries: { fields: 'title' },
  })

  const blogListPromise = client.get<BlogListResponse>({
    endpoint: 'blogs',
    queries: {
      fields: 'id,title,thumbnail,tags,createdAt,updatedAt',
      limit: 10,
    },
  })

  const tagListPromise = client.get<TagListResponse>({
    endpoint: 'tags',
    queries: { fields: 'id,name' },
  })

  const [siteData, blogList, tagList] = await Promise.all([
    siteDataPromise,
    blogListPromise,
    tagListPromise,
  ])

  return {
    props: {
      siteData,
      blogList,
      tagList,
    },
    revalidate: 60,
  }
}

const Page: NextPage<PageProps> = (props) => {
  return (
    <>
      <Layout tagList={props.tagList} meta={{}}>
        <BlogList blogList={props.blogList} />
      </Layout>
    </>
  )
}

export default Page
