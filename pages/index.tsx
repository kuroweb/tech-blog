import type { NextPage, GetStaticProps, InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/router';
import React, { useCallback } from 'react';

import Card from '../components/organisms/Card';
import Layout from '../components/templates/Layout';

import { BlogListResponse } from '../types/blog';
import { SiteDataResponse } from '../types/siteData';
import { TagListResponse } from '../types/tag';
import { client } from '../utils/api';

type StaticProps = {
  siteData: SiteDataResponse;
  blogList: BlogListResponse;
  tagList: TagListResponse;
};

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

export const getStaticProps: GetStaticProps<StaticProps> = async () => {
  const siteDataPromise = client.get<SiteDataResponse>({
    endpoint: 'sitedata',
    queries: { fields: 'title' },
  });

  const blogListPromise = client.get<BlogListResponse>({
    endpoint: 'blogs',
    queries: {
      fields: 'id,title,thumbnail,tags,createdAt,updatedAt',
      limit: 10,
    },
  });

  const tagListPromise = client.get<TagListResponse>({
    endpoint: 'tags',
    queries: { fields: 'id,name' },
  });

  const [siteData, blogList, tagList] = await Promise.all([
    siteDataPromise,
    blogListPromise,
    tagListPromise,
  ]);

  return {
    props: {
      siteData,
      blogList,
      tagList,
    },
    revalidate: 60,
  };
};

const Page: NextPage<PageProps> = (props) => {
  const { siteData, blogList, tagList } = props;
  console.log(blogList);

  const router = useRouter();
  const currentPage = 1;
  const totalPage = Math.ceil(blogList.totalCount / blogList.limit);
  const startPage = currentPage == 1 ? 1 : currentPage - 1;
  const endPage = currentPage == totalPage ? currentPage : currentPage + 1;
  const range = (start: number, end: number) =>
    [...Array(end - start + 1)].map((_, i) => start + i);

  const handleChangePage = useCallback(
    (page: number) => {
      void router.push(`/blogs/page/${page}`);
    },
    [router],
  );

  return (
    <>
      <Layout tagList={tagList} meta={{}}>
        <div className='py-8 px-4 sm:px-6 lg:px-8 w-full'>
          <p className='p-2 text-2xl font-bold'>Posts</p>
          <div className='flex flex-wrap'>
            {blogList.contents.map((blog) => (
              <Card blog={blog} key={blog.id} />
            ))}
          </div>
          <div className='p-8'>
            <div className='flex justify-center items-center space-x-2'>
              {currentPage == 1 ? (
                ''
              ) : (
                <a
                  onClick={() => handleChangePage(currentPage - 1)}
                  className='flex items-center py-2 px-2 text-gray-600 hover:text-white bg-white hover:bg-gray-600 rounded-md shadow-md'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='w-6 h-6 cursor-pointer'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M11 17l-5-5m0 0l5-5m-5 5h12'
                    />
                  </svg>
                </a>
              )}
              {range(startPage, endPage).map((page: number) =>
                currentPage === page ? (
                  <a className='py-2 px-4 text-white bg-gray-600 rounded-md shadow-md' key={page}>
                    {page}
                  </a>
                ) : (
                  <a
                    onClick={() => handleChangePage(page)}
                    className='py-2 px-4 text-gray-600 hover:text-white bg-white hover:bg-gray-600 rounded-md shadow-md cursor-pointer'
                    key={page}
                  >
                    {page}
                  </a>
                ),
              )}
              {currentPage == endPage ? (
                ''
              ) : (
                <a
                  onClick={() => handleChangePage(currentPage + 1)}
                  className='flex items-center py-2 px-2 text-gray-600 hover:text-white bg-white hover:bg-gray-600 rounded-md shadow-md'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='w-6 h-6 cursor-pointer'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M13 7l5 5m0 0l-5 5m5-5H6'
                    />
                  </svg>
                </a>
              )}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Page;
