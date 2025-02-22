import { useContext } from 'react';
import { GithubConfigContext } from './GithubConfigContext';

/**
 * Convenience function to get the github config context.
 */
export const useGithubConfig = () => {
  const ctx = useContext(GithubConfigContext);
  if (ctx === null) {
    throw new Error('Unable to get GithubConfigContext!');
  }
  return ctx;
};
