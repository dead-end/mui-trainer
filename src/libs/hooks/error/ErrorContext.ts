import { createContext } from 'react';
import { TErrorCtx } from '../../types';

export const ErrorContext = createContext<TErrorCtx>({
  error: [],
  addError: (msg: string) => {
    throw new Error(msg);
  },
  clearError: () => {},
});
