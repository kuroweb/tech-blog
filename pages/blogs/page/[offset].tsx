// common
import type { NextPage, GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import React from 'react'

// components
import Layout from '../../../components/layouts/Layout'
import BlogList from '../../../features/blogs/components/BlogList'

// types
import { BlogListResponse } from '../../../types/blog'
import { SiteDataResponse } from '../../../types/siteData'
import { TagListResponse } from '../../../types/tag'

// utils
import { client } from '../../../utils/api'

type StaticProps = {
  siteData: SiteDataResponse
  blogList: BlogListResponse
  tagList: TagListResponse
}

type PageProps = InferGetStaticPropsType<typeof getStaticProps>

export const getStaticPaths: GetStaticPaths = async () => {
  // pagination
  const blogListPromise = client.get<BlogListResponse>({
    endpoint: 'blogs',
    queries: {
      offset: 0,
      limit: 10,
    },
  })

  const [blogList] = await Promise.all([blogListPromise])

  const paths = [...Array(Math.ceil(blogList.totalCount / blogList.limit))]
    .map((_, i) => i + 1)
    .map((offset) => `/blogs/page/${offset}`)

  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps<StaticProps> = async ({ params }) => {
  // pagination
  const offset = params?.offset ? Number(params?.offset) : 1

  const query = {
    offset: Number((offset - 1) * 10),
    limit: 10,
  }

  // microcms
  const siteDataPromise = client.get<SiteDataResponse>({
    endpoint: 'sitedata',
    queries: {
      fields: 'title',
    },
  })

  const blogListPromise = client.get<BlogListResponse>({
    endpoint: 'blogs',
    queries: {
      fields: 'id,title,thumbnail,tags,createdAt',
      ...query,
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
