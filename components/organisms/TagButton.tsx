import Link from 'next/link';
import { useContext } from 'react';
import { SidebarContext } from '../../contexts/sidebarContext';
import { TagResponse } from '../../types/tag';

type Props = {
  tag: TagResponse;
};

const TagButton = ({ tag }: Props) => {
  const { sidebarOpen, setSidebarOpen } = useContext(SidebarContext);

  return (
    <>
      <button
        key={tag.id}
        className='py-0.5 px-2 mr-1 mb-1 text-xs text-blue-700 hover:text-white bg-transparent hover:bg-blue-500 rounded-xl border border-blue-500 hover:border-transparent'
        onClick={() => setSidebarOpen(false)}
      >
        <Link passHref href={'/tags/' + tag.id}>
          {tag.name}
        </Link>
      </button>
    </>
  );
};

export default TagButton;
