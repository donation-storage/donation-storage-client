/* eslint-disable @typescript-eslint/no-unsafe-argument */
import axios from 'axios';

export const isYoutueUrl = (url: string): boolean =>
  url.split('https://')[1].includes('youtu');

export const regexTag = (tag: string): string => {
  const singleSpace = tag.replace(/\s{2,}/g, ' ');

  return singleSpace.replace(/^\s+|\s+$/g, '');
};

export const srcToFile = async (src: string, fileName: string) => {
  const response = await axios.get(src, {
    responseType: 'blob',
  });
  const mimeType = response.headers['content-type'];

  return new File([response.data], fileName, { type: mimeType });
};

export const formatStartTime = (startTime: number): string[] => {
  const hour = Math.floor(startTime / 3600);
  const minute = Math.floor((startTime % 3600) / 60);
  const second = Math.floor(startTime % 60);

  return [hour, minute, second].map((time) => time.toString().padStart(2, '0'));
};
