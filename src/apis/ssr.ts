import axios from 'axios';

import type { PostRequestConfig } from '../types/api';
import { getPostListApi } from './post';

export const getServerSidePropsForPage = async (
  requestBody: PostRequestConfig,
) => {
  const tagResponse = await axios.get(
    `${process.env.NEXT_PUBLIC_SERVER_API}/tag`,
  );

  const listResponse = await getPostListApi(requestBody);

  return {
    props: {
      page: {
        page: requestBody.start,
        count: Number(listResponse!.data.count) || 0,
      },
      tags: tagResponse.data.data,
      list: listResponse!.data.data || [],
    },
  };
};
