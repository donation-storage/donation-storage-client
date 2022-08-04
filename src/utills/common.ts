export const isYoutueUrl = (url: string): boolean =>
  url.split('https://')[1].includes('youtu');

export const regexTag = (tag: string): string => {
  const singleSpace = tag.replace(/\s{2,}/g, ' ');

  return singleSpace.replace(/^\s+|\s+$/g, '');
};
