// common
import { NextPage, GetStaticPaths, InferGetStaticPropsType, GetStaticProps } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

// package
import moment from 'moment'
import {
  TwitterShareButton,
  FacebookShareButton,
  LineShareButton,
  HatenaShareButton,
  TwitterIcon,
  FacebookIcon,
  LineIcon,
  HatenaIcon,
} from 'react-share'

// components
import Layout from '../../components/layouts/Layout'

// types
import { BlogResponse } from '../../types/blog'
import { TagListResponse } from '../../types/tag'

// utils
import { client } from '../../utils/api'
import { toStringId } from '../../utils/toStringId'

// SSG
type StaticProps = {
  blog: BlogResponse
  tagList: TagListResponse
  domain?: string
}

import mermaid from 'mermaid'
import { useEffect } from 'react'
import ReactMarkdown from 'react-markdown'

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

  const id = toStringId(params.id)

  try {
    const blogContentPromise = client.get<BlogResponse>({
      endpoint: 'blogs',
      contentId: id,
      queries: {
        fields: 'id,title,body,updatedAt,tags,thumbnail',
      },
    })

    const tagListPromise = client.get<TagListResponse>({
      endpoint: 'tags',
      queries: { fields: 'id,name' },
    })

    const [blog, tagList] = await Promise.all([blogContentPromise, tagListPromise])

    return {
      props: {
        blog,
        tagList,
        domain: process.env.DOMAIN_NAME,
      },
      revalidate: 60,
    }
  } catch (e) {
    return { notFound: true }
  }
}

const Page: NextPage<PageProps> = (props) => {
  useEffect(() => {
    mermaid.initialize({ startOnLoad: false, theme: 'dark' })
    mermaid.init(undefined, '.language-mermaid')
  }, [])

  const { blog, tagList, domain } = props

  const router = useRouter()
  const fullPath = `${domain}${router.asPath}`
  const body = blog.body.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, '')
  const description = body.substr(0, 120)

  const meta = {
    pageTitle: blog.title,
    pageDescription: description,
    pagePath: fullPath,
    pageImg: blog.thumbnail ? blog.thumbnail.url : '',
  }

  if (router.isFallback) {
    return <div>Loading...</div>
  }

  return (
    <>
      <Layout tagList={tagList} meta={meta}>
        <div className='py-8 md:px-8'>
          <div className='bg-white md:rounded-lg'>
            <div className='relative'>
              <p className='xs:text-base absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 font-bold text-white md:text-3xl'>
                {blog.title}
              </p>
              <svg
                className='absolute bottom-6 right-32 z-10 h-5 w-5 md:right-36'
                stroke='cyan'
                strokeWidth='3'
                fill='none'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path d='M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15' />
              </svg>
              <p className='xs:text-base absolute bottom-5 right-5 z-10 text-lg font-bold text-white md:text-xl'>
                {moment(blog.updatedAt).format('YYYY-MM-DD')}
              </p>
              {blog.thumbnail ? (
                <Image
                  className='object-cover brightness-[30%] md:rounded-t-lg'
                  src={blog.thumbnail.url}
                  width={800}
                  height={450}
                  priority
                  alt='thumbnail'
                />
              ) : (
                <Image
                  className='object-cover brightness-[30%] md:rounded-t-lg'
                  src='https://images.microcms-assets.io/assets/905a207a61104dbda1ff337051103d38/c31c6dc3379f4c0f963a30ec5cebf2d9/icon_default_image.svg'
                  width={800}
                  height={450}
                  priority
                  alt='thumbnail'
                />
              )}
            </div>
            <div className='p-4 md:p-8'>
              <ReactMarkdown
                className='prose overflow-hidden'
              >
                {blog.body}
              </ReactMarkdown>
            </div>
            <div className='flex justify-center'>
              <div className='p-2'>
                <TwitterShareButton url={fullPath} title={blog.title}>
                  <TwitterIcon size={32} round={true} />
                </TwitterShareButton>
              </div>
              <div className='p-2'>
                <FacebookShareButton url={fullPath} quote={blog.title}>
                  <FacebookIcon size={32} round={true} />
                </FacebookShareButton>
              </div>
              <div className='p-2'>
                <LineShareButton url={fullPath} title={blog.title}>
                  <LineIcon size={32} round={true} />
                </LineShareButton>
              </div>
              <div className='p-2'>
                <HatenaShareButton url={fullPath} title={blog.title}>
                  <HatenaIcon size={32} round={true} />
                </HatenaShareButton>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default Page
