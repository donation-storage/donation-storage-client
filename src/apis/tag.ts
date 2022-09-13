import axios from 'axios';

import type { TagResponseConfig } from '../types/api';
import { logger } from '../utills/logger';

export const getTagApi = async () => {
  try {
    const res = await axios.get<TagResponseConfig>(
      `${process.env.NEXT_PUBLIC_SERVER_API}/post/tag`,
    );

    return res.data.data;
  } catch (error) {
    logger.log(error);
  }
};
