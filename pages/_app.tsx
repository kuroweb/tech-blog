// Tailwind CSS 以外のスタイルファイルはグローバルで適用したくないため削除
// import '../styles/globals.css'

import 'tailwindcss/tailwind.css';
import type { AppProps } from 'next/app';
import { useState } from 'react';

// import { SearchContext } from '../contexts/searchContext';

function MyApp({ Component, pageProps }: AppProps) {
  const [search, setSearch] = useState<string>('');
  return (
    <>
      {/* <SearchContext.Provider value={{ search, setSearch }}> */}
      <Component {...pageProps} />
      {/* </SearchContext.Provider> */}
    </>
  );
}
export default MyApp;
