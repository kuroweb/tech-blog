import Image from 'next/image';
import Link from 'next/link';

type Props = {
  sidebarOpen: Boolean;
  setSidebarOpen: Function;
};

const Header = ({ sidebarOpen, setSidebarOpen }: Props) => {
  return (
    <>
      {/* Header */}
      <header className='sticky top-0 z-30 bg-white border-b border-gray-200'>
        <div className='px-4 sm:px-6 lg:px-8'>
          <div className='flex justify-between items-center -mb-px h-16'>
            {/* Header: Left side */}
            <div className='flex'>
              <Link href={'/'} passHref>
                <a>
                  <Image
                    src='https://images.microcms-assets.io/assets/905a207a61104dbda1ff337051103d38/4957ee684a0e466b93f0caae6610cfc8/header-logo-v4.png?auto=format,compress'
                    width={170}
                    height={28}
                    alt='My avatar'
                  />
                </a>
              </Link>
            </div>
            {/* Header: Right side */}
            <div className='flex items-center'>
              {/* Hamburger button */}
              <button
                className='md:hidden sm:visible text-gray-500 hover:text-gray-600'
                aria-controls='sidebar'
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                <span className='sr-only'>Open sidebar</span>
                <svg
                  className='w-6 h-6 fill-current'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <rect x='4' y='5' width='16' height='2' />
                  <rect x='4' y='11' width='16' height='2' />
                  <rect x='4' y='17' width='16' height='2' />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
