import type { PostRequestConfig } from '../types/api';
import { getPostListApi } from './post';
import { getTagApi } from './tag';

export const getServerSidePropsForPage = async (
  requestBody: PostRequestConfig,
) => {
  const tagResponse = await getTagApi();

  const listResponse = await getPostListApi(requestBody);

  if (listResponse!.code === 0) {
    return {
      props: {
        page: {
          page: 1,
          count: 0,
        },
        tags: tagResponse,
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
      tags: tagResponse,
      list: listResponse!.data.data || [],
    },
  };
};

export const getServerSidePropsForMypage = async (
  requestBody: PostRequestConfig,
) => {
  const listResponse = await getPostListApi(requestBody);

  if (listResponse!.code === 0) {
    return {
      props: {
        page: {
          page: 1,
          count: 0,
        },
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
      list: listResponse!.data.data || [],
    },
  };
};
