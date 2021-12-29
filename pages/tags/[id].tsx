import { NextPage, GetStaticPaths, InferGetStaticPropsType, GetStaticProps } from 'next';

import Card from '../../components/organisms/Card';
import Layout from '../../components/templates/Layout';

import { BlogListResponse } from '../../types/blog';
import { TagResponse, TagListResponse } from '../../types/tag';

import { client } from '../../utils/api';

// SSG
type StaticProps = {
  blogList: BlogListResponse;
  tagList: TagListResponse;
  tag: TagResponse;
};

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    fallback: 'blocking',
    paths: [],
  };
};

export const getStaticProps: GetStaticProps<StaticProps> = async (context) => {
  const { params } = context;
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

    const tagPromise = client.get<TagResponse>({
      endpoint: 'tags',
      contentId: `${params.id}`,
      queries: { fields: 'id,name' },
    });

    const [blogList, tagList, tag] = await Promise.all([
      blogContentPromise,
      tagListPromise,
      tagPromise,
    ]);

    return {
      props: { blogList, tagList, tag },
      revalidate: 60,
    };
  } catch (e) {
    return { notFound: true };
  }
};

// Page
const Page: NextPage<PageProps> = (props) => {
  const { blogList, tagList, tag } = props;
  return (
    <>
      <Layout tagList={tagList} meta={{}}>
        <div className='py-8 px-4 sm:px-6 lg:px-8 w-full'>
          <h1 className='p-2 text-2xl font-bold'>{`「${tag.name}」の記事一覧`}</h1>
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
