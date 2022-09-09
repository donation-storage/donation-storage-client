import axios from 'axios';

import type { PostRequestConfig } from '../types/api';
import { logger } from '../utills/logger';
import { getPostListApi } from './post';

export const getServerSidePropsForPage = async (
  requestBody: PostRequestConfig,
) => {
  const tagResponse = await axios.get(
    `${process.env.NEXT_PUBLIC_SERVER_API}/tag`,
  );

  const listResponse = await getPostListApi(requestBody)!;

  logger.info(listResponse);

  if (listResponse!.code === 0) {
    return {
      props: {
        page: {
          page: 1,
          count: 0,
        },
        tags: tagResponse.data.data,
        list: [],
      },
    };
  }

  return {
    props: {
      page: {
        page: requestBody.start,
        count: Number(listResponse!.data.count),
      },
      tags: tagResponse.data.data,
      list: listResponse!.data.data || [],
    },
  };
};
