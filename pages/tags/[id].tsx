import { NextPage, GetStaticPaths, InferGetStaticPropsType, GetStaticProps } from 'next';

import Card from '../../components/organisms/Card';
import Layout from '../../components/templates/Layout';

import { BlogListResponse } from '../../types/blog';
import { TagListResponse } from '../../types/tag';

import { client } from '../../utils/api';

type StaticProps = {
  blogList: BlogListResponse;
  tagList: TagListResponse;
};

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    fallback: 'blocking',
    paths: [],
  };
};

export const getStaticProps: GetStaticProps<StaticProps> = async (context) => {
  const { params, previewData } = context;
  if (!params?.id) {
    throw new Error('Error: ID not found');
  }

  try {
    const blogContentPromise = client.get<BlogListResponse>({
      endpoint: 'blogs',
      queries: {
        fields: 'id,title,body,publishedAt,tags,thumbnail',
        filters: `tags[contains]${params.id}`,
      },
    });

    const tagListPromise = client.get<TagListResponse>({
      endpoint: 'tags',
      queries: { fields: 'id,name' },
    });

    const [blogList, tagList] = await Promise.all([blogContentPromise, tagListPromise]);

    return {
      props: { blogList, tagList },
      revalidate: 60,
    };
  } catch (e) {
    return { notFound: true };
  }
};

const Page: NextPage<PageProps> = (props) => {
  const { blogList, tagList } = props;
  return (
    <>
      <Layout tagList={tagList}>
        <div className='py-8 px-4 sm:px-6 lg:px-8 w-full'>
          <h1 className='p-2 text-2xl font-bold'>Posts</h1>
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
