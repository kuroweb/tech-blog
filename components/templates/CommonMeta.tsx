import Head from 'next/head';

import { MetaData } from '../../types/metaData';

type Props = {
  meta: MetaData;
};

const CommonMeta = ({ meta }: Props) => {
  console.log(meta);
  const defaultTitle = 'kuroweb.net';
  const defaultDescription = 'kuroweb.net';

  const title = meta.pageTitle ? `${meta.pageTitle} | ${defaultTitle}` : defaultTitle;
  const description = meta.pageDescription ? meta.pageDescription : defaultDescription;
  const url = meta.pagePath;
  const imgUrl = meta.pageImg;
  const imgWidth = meta.pageImgWidth ? meta.pageImgWidth : 1280;
  const imgHeight = meta.pageImgHeight ? meta.pageImgHeight : 640;

  return (
    <Head>
      <title>{title}</title>
      <meta name='viewport' content='width=device-width,initial-scale=1.0' />
      <meta name='description' content={description} />
      <meta property='og:url' content={url} />
      <meta property='og:title' content={title} />
      <meta property='og:site_name' content={title} />
      <meta property='og:description' content={description} />
      <meta property='og:type' content='website' />
      <meta property='og:image' content={imgUrl} />
      <meta property='og:image:width' content={String(imgWidth)} />
      <meta property='og:image:height' content={String(imgHeight)} />
      <meta name='twitter:card' content='summary' />
      <meta name='twitter:site' content='kuroweb.net' />
      <meta name='twitter:url' content={url} />
      <meta name='twitter:title' content={title} />
      <meta name='twitter:description' content={description} />
      <meta name='twitter:image' content={url} />
      <link rel='canonical' href={url} />
    </Head>
  );
};

export default CommonMeta;
