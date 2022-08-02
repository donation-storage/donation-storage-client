export const isYoutueUrl = (url: string): boolean =>
  url.split('https://')[1].includes('youtu');
