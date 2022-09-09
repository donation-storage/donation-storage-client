/* eslint-disable unicorn/explicit-length-check */
import axios from 'axios';

import type { PostRequestConfig, PostResponseConfig } from '../types/api';
import { logger } from '../utills/logger';

export const getPostListApi = async (requestBody: PostRequestConfig) => {
  try {
    logger.log(requestBody);
    const response = await axios.post<PostResponseConfig>(
      'https://server.donationstorage.net/post',
      {
        ...requestBody,
        length: 10,
      },
      {
        withCredentials: true,
      },
    );

    return response.data;
  } catch (error) {
    logger.log(error);
  }
};
