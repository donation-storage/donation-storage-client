import axios from 'axios';

import type {
  LikeCheckResponseConfig,
  LikeCountResponseConfig,
  LikePutResponseConfig,
} from '../types/api';
import { logger } from '../utills/logger';

export const getLikeCount = async (postSeq: number) => {
  try {
    const res = await axios.get<LikeCountResponseConfig>(
      `${process.env.NEXT_PUBLIC_SERVER_API}/post/like/${postSeq}`,
    );

    return res.data.data.likeCount;
  } catch (error) {
    logger.log(error);
  }
};

export const getIsLiked = async (userSeq: number, postSeq: number) => {
  try {
    const res = await axios.post<LikeCheckResponseConfig>(
      `${process.env.NEXT_PUBLIC_SERVER_API}/post/like`,
      {
        userSeq,
        postSeq,
      },
      { withCredentials: true },
    );

    return res.data.data.like;
  } catch (error) {
    logger.log(error);
  }
};

export const putLike = async (userSeq: number, postSeq: number) => {
  try {
    await axios.put<LikePutResponseConfig>(
      `${process.env.NEXT_PUBLIC_SERVER_API}/post/like`,
      {
        userSeq,
        postSeq,
      },
      { withCredentials: true },
    );
  } catch (error) {
    logger.log(error);
  }
};

export const deleteLike = async (userSeq: number, postSeq: number) => {
  try {
    await axios.delete(`${process.env.NEXT_PUBLIC_SERVER_API}/post/like`, {
      data: {
        userSeq,
        postSeq,
      },
      withCredentials: true,
    });
  } catch (error) {
    logger.log(error);
  }
};
