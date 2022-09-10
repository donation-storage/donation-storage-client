import axios from 'axios';

import type { UserAuth } from '../types/api';

export const getUserInfoApi = async () => {
  const response = await axios.get<UserAuth>(
    `${process.env.NEXT_PUBLIC_SERVER_API}/user/checkMe`,
    {
      withCredentials: true,
    },
  );

  return response.data;
};

export const logoutApi = async () => {
  await axios.get(`${process.env.NEXT_PUBLIC_SERVER_API}/user/logout`, {
    withCredentials: true,
  });
};
