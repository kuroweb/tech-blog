import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';
import { BlogResponse } from '../../types/blog';

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
          <a href={'blogs/' + blog.id}>
            <Image
              className='object-cover rounded-t-lg'
              src={blog.thumbnail.url}
              alt='thumbnail'
              width={300}
              height={200}
              priority
            />
          </a>
          <div className='p-4 pt-2'>
            <h1 className='mb-2 font-bold tracking-tight text-gray-900'>
              <Link passHref href={'/blogs/' + blog.id}>
                {blog.title}
              </Link>
            </h1>
            <p className='text-xs text-gray-500'>{format(blog.createdAt)}</p>
            <div className='flex flex-wrap mt-2'>
              {blog.tags.map((tag) => (
                <button
                  key={tag.id}
                  className='py-0.5 px-2 mr-1 mb-1 text-xs text-blue-700 hover:text-white bg-transparent hover:bg-blue-500 rounded-xl border border-blue-500 hover:border-transparent'
                >
                  <Link passHref href={'/blogs/' + blog.id}>
                    {tag.name}
                  </Link>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
