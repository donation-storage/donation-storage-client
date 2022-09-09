/* eslint-disable unicorn/explicit-length-check */
import axios from 'axios';

import type {
  PostRequestConfig,
  PostResponseConfig,
  ViewResponseConfig,
} from '../types/api';
import { logger } from '../utills/logger';

export const getPostListApi = async (requestBody: PostRequestConfig) => {
  try {
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

export const getOnePostApi = async (postSeq: string) => {
  try {
    const response = await axios.get<ViewResponseConfig>(
      `https://server.donationstorage.net/post/${postSeq}`,
      {
        withCredentials: true,
      },
    );
    logger.info(response.data);

    return response.data;
  } catch (error) {
    logger.log(error);
  }
};
