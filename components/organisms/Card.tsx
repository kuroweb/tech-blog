import Image from 'next/image';
import Link from 'next/link';
import { BlogResponse } from '../../types/blog';

type blogProps = {
  blog: BlogResponse;
};

const Card = ({ blog }: blogProps) => {
  console.log(blog);
  return (
    <>
      <div className='p-2 w-1/2 md:w-1/3'>
        <div className='bg-white rounded-lg border border-gray-200 shadow-md'>
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
          <div className='p-4'>
            <a href={'blogs/' + blog.id}>
              <h1 className='mb-2 font-bold tracking-tight text-gray-900'>{blog.title}</h1>
            </a>

            {blog.tags.map((tag) => (
              <a
                className='inline-block py-0.5 px-2 mr-1.5 mb-1.5 text-sm text-blue-700 hover:text-white bg-transparent hover:bg-blue-500 rounded-xl border border-blue-500 hover:border-transparent'
                href={'blogs/' + blog.id}
                key={tag.id}
              >
                {tag.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
