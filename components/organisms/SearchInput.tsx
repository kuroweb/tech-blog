import { useRouter } from 'next/router';
import { useCallback, useState, useContext } from 'react';
import { SidebarContext } from '../../contexts/sidebarContext';

const SearchInput = () => {
  const [search, setSearch] = useState('');
  const router = useRouter();
  const { sidebarOpen, setSidebarOpen } = useContext(SidebarContext);

  const handleChangeKeyword = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { value } = e.currentTarget;
      setSearch(value);
    },
    [setSearch],
  );

  const handleClickSearchButton = useCallback(() => {
    void router.push(`/blogs/search?keyword=${search}`);
    setSidebarOpen(false);
  }, [router, search, setSidebarOpen]);

  const handleKeyDownSearch = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (e.key === 'Enter') {
        void router.push(`/blogs/search?keyword=${search}`);
        setSidebarOpen(false);
      }
    },
    [router, search, setSidebarOpen],
  );

  return (
    <>
      <div
        className='flex justify-between items-center bg-white rounded-lg shadow-lg'
        x-data="{ search: '' }"
      >
        <input
          type='search'
          className='px-4 text-gray-900 focus:outline-none'
          placeholder='search'
          onChange={handleChangeKeyword}
          onKeyDown={handleKeyDownSearch}
        />

        <button
          type='submit'
          className='flex justify-center items-center w-12 h-12 text-gray-100 bg-gray-600 rounded-lg shadow-lg'
          onClick={handleClickSearchButton}
        >
          <svg
            className='w-5 h-5'
            stroke='white'
            fill='none'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
            ></path>
          </svg>
        </button>
      </div>
    </>
  );
};

export default SearchInput;
