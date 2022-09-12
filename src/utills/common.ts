/* eslint-disable unicorn/prefer-default-parameters */
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

export const formatStartTimeToNum = (startTime: string): number => {
  const hour = Number(startTime.split(':')[0]) * 60 * 60;
  const minute = Number(startTime.split(':')[1]) * 60;
  const second = Number(startTime.split(':')[2]);

  return hour + minute + second;
};

export const splitStartTime = (startTime: string): string[] => {
  const hour = startTime.split(':')[0];
  const minute = startTime.split(':')[1];
  const second = startTime.split(':')[2];

  return [hour, minute, second];
};

export const formatStartTimeToString = (
  startHour: string,
  startMinute: string,
  startSecond: string,
): string => {
  const hour = startHour || '00';
  const minute = startMinute || '00';
  const second = startSecond || '00';

  return `${hour}:${minute}:${second}`;
};
