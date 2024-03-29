/* eslint-disable max-len */
/* eslint-disable quote-props */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable unicorn/explicit-length-check */
import axios from 'axios';

import type {
  CommonResponseConfig,
  LikedRequestConfig,
  PostRequestConfig,
  PostResponseConfig,
  PostResultConfig,
  ViewResponseConfig,
} from '../types/api';
import { logger } from '../utills/logger';

export const getPostListApi = async (requestBody: PostRequestConfig) => {
  try {
    const response = await axios.post<PostResponseConfig>(
      `${process.env.NEXT_PUBLIC_SERVER_API}/post`,
      {
        ...requestBody,
        length: requestBody.length || 10,
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

export const getLikedListApi = async (requestBody: LikedRequestConfig) => {
  try {
    const response = await axios.post<PostResponseConfig>(
      `${process.env.NEXT_PUBLIC_SERVER_API}/post/user/like`,
      requestBody,
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
      `${process.env.NEXT_PUBLIC_SERVER_API}/post/${postSeq}`,
      {
        withCredentials: true,
      },
    );

    return response.data;
  } catch (error) {
    logger.log(error);
  }
};

export const getYouTubeTitleApi = async (videoId: string) => {
  try {
    const res = await axios.get<{ items: [{ snippet: { title: string } }] }>(
      `https://www.googleapis.com/youtube/v3/videos?key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}&part=snippet&id=${videoId}`,
    );

    return res.data.items[0].snippet.title;
  } catch (error) {
    logger.log(error);
  }
};

export const getTwitchClipTitleApi = async (videoId: string) => {
  try {
    const oauthTokenResponse = await axios.post(
      `https://id.twitch.tv/oauth2/token?client_id=${process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID}&client_secret=${process.env.NEXT_PUBLIC_TWITCH_CLIENT_SECRET}&grant_type=client_credentials`,
    );

    const accessToken = oauthTokenResponse.data.access_token;
    const res = await axios.get<{ data: [{ title: string }] }>(
      `https://api.twitch.tv/helix/clips?id=${videoId}`,
      {
        headers: {
          'Client-Id': `${process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID}`,
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return res.data.data[0].title;
  } catch (error) {
    logger.log(error);
  }
};

export const getTwitchVideoTitleApi = async (videoId: string) => {
  try {
    const oauthTokenResponse = await axios.post(
      `https://id.twitch.tv/oauth2/token?client_id=${process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID}&client_secret=${process.env.NEXT_PUBLIC_TWITCH_CLIENT_SECRET}&grant_type=client_credentials`,
    );

    const accessToken = oauthTokenResponse.data.access_token;
    const res = await axios.get<{ data: [{ title: string }] }>(
      `https://api.twitch.tv/helix/videos?id=${videoId}`,
      {
        headers: {
          'Client-Id': `${process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID}`,
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return res.data.data[0].title;
  } catch (error) {
    logger.log(error);
  }
};

export const postAudioApi = async (requestBody: FormData) => {
  try {
    const response = await axios.put<PostResultConfig>(
      `${process.env.NEXT_PUBLIC_SERVER_API}/post/audio`,
      requestBody,
      {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' },
      },
    );

    return response.data;
  } catch {
    throw new Error('failed to upload audio');
  }
};

export const postVideoApi = async (requestBody: FormData) => {
  try {
    const response = await axios.put<PostResultConfig>(
      `${process.env.NEXT_PUBLIC_SERVER_API}/post/video`,
      requestBody,
      {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' },
      },
    );

    return response.data;
  } catch {
    throw new Error('failed to upload video');
  }
};

export const modifyAudioApi = async (
  postSeq: number,
  requestBody: FormData,
) => {
  try {
    requestBody.append('postSeq', postSeq.toString());
    const response = await axios.patch<PostResultConfig>(
      `${process.env.NEXT_PUBLIC_SERVER_API}/post/audio`,
      requestBody,
      {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' },
      },
    );

    return response.data;
  } catch {
    throw new Error('failed to upload video');
  }
};

export const modifyVideoApi = async (
  postSeq: number,
  requestBody: FormData,
) => {
  try {
    requestBody.append('postSeq', postSeq.toString());
    const response = await axios.patch<PostResultConfig>(
      `${process.env.NEXT_PUBLIC_SERVER_API}/post/video`,
      requestBody,
      {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' },
      },
    );

    return response.data;
  } catch {
    throw new Error('failed to upload video');
  }
};

export const deletePostApi = async (postSeq: number) => {
  try {
    const response = await axios.delete<CommonResponseConfig>(
      `${process.env.NEXT_PUBLIC_SERVER_API}/post/${postSeq}`,
      {
        withCredentials: true,
      },
    );

    return response.data;
  } catch {
    throw new Error('failed to delete post');
  }
};
