// common
import { NextPage, GetStaticPaths, InferGetStaticPropsType, GetStaticProps } from 'next'

// components
import Layout from '../../components/layouts/Layout'
import BlogCard from '../../features/blogs/components/BlogCard'

// types
import { BlogListResponse } from '../../types/blog'
import { TagResponse, TagListResponse } from '../../types/tag'

// utils
import { client } from '../../utils/api'

type StaticProps = {
  blogList: BlogListResponse
  tagList: TagListResponse
  tag: TagResponse
}

type PageProps = InferGetStaticPropsType<typeof getStaticProps>

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    fallback: 'blocking',
    paths: [],
  }
}

export const getStaticProps: GetStaticProps<StaticProps> = async (context) => {
  const { params } = context
  if (!params?.id) {
    throw new Error('Error: ID not found')
  }

  try {
    const blogContentPromise = client.get<BlogListResponse>({
      endpoint: 'blogs',
      queries: {
        fields: 'id,title,body,publishedAt,tags,thumbnail',
        filters: `tags[contains]${params.id}`,
      },
    })

    const tagListPromise = client.get<TagListResponse>({
      endpoint: 'tags',
      queries: { fields: 'id,name' },
    })

    const tagPromise = client.get<TagResponse>({
      endpoint: 'tags',
      contentId: `${params.id}`,
      queries: { fields: 'id,name' },
    })

    const [blogList, tagList, tag] = await Promise.all([
      blogContentPromise,
      tagListPromise,
      tagPromise,
    ])

    return {
      props: { blogList, tagList, tag },
      revalidate: 60,
    }
  } catch (e) {
    return { notFound: true }
  }
}

// Page
const Page: NextPage<PageProps> = (props) => {
  return (
    <>
      <Layout tagList={props.tagList} meta={{}}>
        <h1 className='text-2xl font-bold'>{`「${props.tag.name}」の記事一覧`}</h1>
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
