import type { NextPage, GetStaticProps, InferGetStaticPropsType } from 'next';
import React from 'react';

import Card from '../components/organisms/Card';

import { BlogListResponse } from '../types/blog';
import { SiteDataResponse } from '../types/siteData';
import { client } from '../utils/api';

type StaticProps = {
  siteData: SiteDataResponse;
  blogList: BlogListResponse;
};

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

export const getStaticProps: GetStaticProps<StaticProps> = async () => {
  const siteDataPromise = client.get<SiteDataResponse>({
    endpoint: 'sitedata',
    queries: { fields: 'title' },
  });

  const blogListPromise = client.get<BlogListResponse>({
    endpoint: 'blogs',
    queries: { fields: 'id,title,thumbnail,tags' },
  });

  const [siteData, blogList] = await Promise.all([siteDataPromise, blogListPromise]);

  return {
    props: {
      siteData,
      blogList,
    },
    revalidate: 60,
  };
};

const Page: NextPage<PageProps> = (props) => {
  const { siteData, blogList } = props;
  return (
    <>
      <div className='py-8 px-4 sm:px-6 lg:px-8 w-full'>
        <h1>Home</h1>
        <div className='flex flex-wrap'>
          {blogList.contents.map((blog) => (
            <Card blog={blog} key={blog.id} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Page;
