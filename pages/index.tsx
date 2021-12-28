import type { NextPage, GetStaticProps, InferGetStaticPropsType } from 'next';

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
    queries: { fields: 'id,title,thumbnail,tags,createdAt' },
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
  return (
    <>
      <Layout tagList={tagList}>
        <div className='py-8 px-4 sm:px-6 lg:px-8 w-full'>
          <p className='p-2 text-2xl font-bold'>Posts</p>
          <div className='flex flex-wrap'>
            {blogList.contents.map((blog) => (
              <Card blog={blog} key={blog.id} />
            ))}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Page;
