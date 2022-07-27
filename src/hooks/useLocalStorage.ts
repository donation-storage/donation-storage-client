import { useEffect, useState } from 'react';

type ReturnType<T> = [
  T | undefined,
  React.Dispatch<React.SetStateAction<T | undefined>>,
];

const useLocalStorage = <T>(key: string, initialValue?: T): ReturnType<T> => {
  // const [state, setState] = useState<T | undefined>(() => {
  //   if (!initialValue) {
  //     return;
  //   }

  //   try {
  //     const value = localStorage.getItem(key);

  //     return value ? JSON.parse(value) : initialValue;
  //   } catch {
  //     return initialValue;
  //   }
  // });

  // useEffect(() => {
  //   if (state) {
  //     try {
  //       localStorage.setItem(key, JSON.stringify(state));
  //     } catch (error) {
  //       logger.log(error);
  //     }
  //   }
  // }, [state, key]);

  // return [state, setState];
  const [state, setState] = useState(initialValue);

  useEffect(() => {
    const value = window.localStorage.getItem(key);

    if (value !== null) {
      setState(JSON.parse(value) as T);
    }
  }, [key]);

  useEffect(() => {
    if (state === initialValue) {
      return;
    }

    window.localStorage.setItem(key, JSON.stringify(state));
  }, [key, state, initialValue]);

  return [state, setState];
};

export default useLocalStorage;
