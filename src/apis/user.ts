import axios from 'axios';

import type { UserAuth } from '../types/api';

export const getUserInfoApi = async () => {
  const response = await axios.get<UserAuth>(
    'https://server.donationstorage.net/user/checkMe',
    {
      withCredentials: true,
    },
  );

  return response.data;
};

export const logoutApi = async () => {
  await axios.get('https://server.donationstorage.net/user/logout', {
    withCredentials: true,
  });
};
