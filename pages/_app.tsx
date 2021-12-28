// Tailwind CSS 以外のスタイルファイルはグローバルで適用したくないため削除
// import '../styles/globals.css'

import 'tailwindcss/tailwind.css';
import type { AppProps } from 'next/app';
import { useState } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
  const [search, setSearch] = useState<string>('');
  return (
    <>
      <Component {...pageProps} />
    </>
  );
}
export default MyApp;
