import type { NextPage, GetServerSideProps, InferGetServerSidePropsType } from 'next';

import Card from '../../components/organisms/Card';
import Layout from '../../components/templates/Layout';

import { BlogListResponse } from '../../types/blog';
import { TagListResponse } from '../../types/tag';

import { client } from '../../utils/api';

// SSR
type ServerSideProps = {
  blogList: BlogListResponse;
  tagList: TagListResponse;
  keyword: string | string[] | undefined;
};

type ServerSidePageProps = InferGetServerSidePropsType<typeof getServerSideProps>;

export const getServerSideProps: GetServerSideProps<ServerSideProps> = async (context) => {
  const keyword = context.query.keyword;

  const blogListPromise = client.get<BlogListResponse>({
    endpoint: 'blogs',
    queries: {
      fields: 'id,title,thumbnail,tags,createdAt',
      q: `${keyword}`,
    },
  });

  const tagListPromise = client.get<TagListResponse>({
    endpoint: 'tags',
    queries: { fields: 'id,name' },
  });

  const [blogList, tagList] = await Promise.all([blogListPromise, tagListPromise]);

  return {
    props: {
      blogList,
      tagList,
      keyword,
    },
  };
};

const Page: NextPage<ServerSidePageProps> = (props) => {
  const { blogList, tagList, keyword } = props;
  return (
    <>
      <Layout tagList={tagList} meta={{}}>
        <div className='py-8 px-4 sm:px-6 lg:px-8 w-full'>
          <p className='p-2 text-2xl font-bold'>{`「${keyword}」の検索結果`}</p>
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
