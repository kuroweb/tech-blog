import moment from 'moment';
import { NextPage, GetStaticPaths, InferGetStaticPropsType, GetStaticProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

import Layout from '../../components/templates/Layout';
import { BlogResponse } from '../../types/blog';
import { TagListResponse } from '../../types/tag';
import { client } from '../../utils/api';
import { isDraft } from '../../utils/isDraft';
import { toStringId } from '../../utils/toStringId';

type StaticProps = {
  blog: BlogResponse;
  tagList: TagListResponse;
  draftKey?: string;
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

  const id = toStringId(params.id);
  const draftKey = isDraft(previewData) ? { draftKey: previewData.draftKey } : {};

  try {
    const blogContentPromise = client.get<BlogResponse>({
      endpoint: 'blogs',
      contentId: id,
      queries: {
        fields: 'id,title,body,publishedAt,tags,thumbnail',
        ...draftKey,
      },
    });

    const tagListPromise = client.get<TagListResponse>({
      endpoint: 'tags',
      queries: { fields: 'id,name' },
    });

    const [blog, tagList] = await Promise.all([blogContentPromise, tagListPromise]);

    return {
      props: { blog, ...draftKey, tagList },
      revalidate: 60,
    };
  } catch (e) {
    return { notFound: true };
  }
};

const Page: NextPage<PageProps> = (props) => {
  const { blog, draftKey, tagList } = props;
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Layout tagList={tagList}>
        {draftKey && (
          <div>
            現在プレビューモードで閲覧中です。
            <Link href={`/api/exit-preview?id=${blog.id}`}>
              <a>プレビューを解除</a>
            </Link>
          </div>
        )}

        <div className='px-4 pt-8'>
          <div className='bg-white rounded-lg'>
            <p className='text-3xl'>{blog.title}</p>
            <div
              dangerouslySetInnerHTML={{
                __html: `${blog.body}`,
              }}
            />
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Page;
