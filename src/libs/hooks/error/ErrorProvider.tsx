import { useState } from 'react';
import { ErrorContext } from './ErrorContext';

export const ErrorProvider = ({ children }: { children: React.ReactNode }) => {
  const [error, setError] = useState<string[]>([]);

  const addError = (msg: string) => {
    setError([...error, msg]);
  };

  const clearError = () => {
    setError([]);
  };

  return (
    <ErrorContext.Provider value={{ error, addError, clearError }}>
      {children}
    </ErrorContext.Provider>
  );
};
