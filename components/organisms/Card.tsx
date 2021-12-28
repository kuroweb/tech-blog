import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';
import { BlogResponse } from '../../types/blog';

import TagButton from '../organisms/TagButton';

type blogProps = {
  blog: BlogResponse;
};

const Card = ({ blog }: blogProps) => {
  const format = (str: string) => {
    const day = moment(str);
    return day.format('YYYY-MM-DD');
  };

  return (
    <>
      <div className='p-2 w-1/2 md:w-1/3'>
        <div className='h-full bg-white rounded-lg border border-gray-200 shadow-md'>
          <Link href={`/blogs/${blog.id}`} as={`/blogs/${blog.id}`}>
            <a>
              <Image
                className='object-cover rounded-t-lg'
                src={blog.thumbnail.url}
                alt='thumbnail'
                width={300}
                height={200}
                priority
              />
            </a>
          </Link>
          <div className='p-4 pt-2'>
            <h1 className='mb-2 font-bold tracking-tight text-gray-900'>
              <Link href={`/blogs/${blog.id}`} as={`/blogs/${blog.id}`}>
                {blog.title}
              </Link>
            </h1>
            <p className='text-xs text-gray-500'>{format(blog.createdAt)}</p>
            <div className='flex flex-wrap mt-2'>
              {blog.tags.map((tag) => (
                <TagButton tag={tag} key={tag.id} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
