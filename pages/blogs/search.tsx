// common
import type { NextPage, GetServerSideProps, InferGetServerSidePropsType } from 'next'

// components
import BlogCard from '../../features/blogs/components/BlogCard'
import Layout from '../../components/layouts/Layout'

// types
import { BlogListResponse } from '../../types/blog'
import { TagListResponse } from '../../types/tag'

// utils
import { client } from '../../utils/api'

type ServerSideProps = {
  blogList: BlogListResponse
  tagList: TagListResponse
  keyword: string | string[] | undefined
}

type ServerSidePageProps = InferGetServerSidePropsType<typeof getServerSideProps>

export const getServerSideProps: GetServerSideProps<ServerSideProps> = async (context) => {
  const keyword = context.query.keyword

  const blogListPromise = client.get<BlogListResponse>({
    endpoint: 'blogs',
    queries: {
      fields: 'id,title,thumbnail,tags,createdAt',
      q: `${keyword}`,
    },
  })

  const tagListPromise = client.get<TagListResponse>({
    endpoint: 'tags',
    queries: { fields: 'id,name' },
  })

  const [blogList, tagList] = await Promise.all([blogListPromise, tagListPromise])

  return {
    props: {
      blogList,
      tagList,
      keyword,
    },
  }
}

const Page: NextPage<ServerSidePageProps> = (props) => {
  return (
    <>
      <Layout tagList={props.tagList} meta={{}}>
        <h1 className='text-2xl font-bold'>{`「${props.keyword}」の記事一覧`}</h1>
        <div className='grid grid-cols-2 gap-4'>
          {props.blogList.contents.map((blog) => (
            <div className='col-span-1' key={blog.id}>
              <BlogCard blog={blog} />
            </div>
          ))}
        </div>
      </Layout>
    </>
  )
}

export default Page
