import { NextApiRequestQuery } from 'next/dist/server/api-utils';

const getSearchBlogs = async (req: NextApiRequest, res: NextApiResponse) => {
  const { keyword } = req.query as { keyword: string };
  const searchBlogs = await fetch(
    `https://lotteblog.microcms.io/api/v1/myblog?q=${encodeURI(keyword)}`,
    key,
  )
    .then((res) => res.json())
    .catch(() => null);

  return res.status(200).json(searchBlogs);
};

export default getSearchBlogs;
