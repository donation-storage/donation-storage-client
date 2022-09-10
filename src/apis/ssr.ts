import axios from 'axios';

import type { PostRequestConfig } from '../types/api';
import { getPostListApi } from './post';

export const getServerSidePropsForPage = async (
  requestBody: PostRequestConfig,
) => {
  const tagResponse = await axios.get('http://msw.mock/tag');

  const listResponse = await getPostListApi(requestBody);

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
