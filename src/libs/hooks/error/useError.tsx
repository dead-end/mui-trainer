import { useContext } from 'react';
import { ErrorContext } from './ErrorContext';

export const useError = () => {
  const ctx = useContext(ErrorContext);
  if (ctx === null) {
    throw new Error('Unable to get ErrorContext!');
  }
  return ctx;
};
