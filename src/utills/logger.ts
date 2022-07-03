/* eslint-disable no-console */

export const logger = {
  debug: (...args: unknown[]): void => {
    if (process.env.NODE_ENV === 'development') {
      console.debug(...args);
    }
  },
  dir: (...args: unknown[]): void => {
    if (process.env.NODE_ENV === 'development') {
      console.dir(...args);
    }
  },
  info: (...args: unknown[]): void => {
    if (process.env.NODE_ENV === 'development') {
      console.info(...args);
    }
  },
  log: (...args: unknown[]): void => {
    if (process.env.NODE_ENV === 'development') {
      console.log(...args);
    }
  },
  error: (...args: unknown[]): void => {
    console.error(...args);
  },
};
