import { useState } from 'react';
import { TGithubConfig } from '../types';

export const useConfig = () => {
  const DEFAULT: TGithubConfig = {
    user: '',
    repo: '',
    token: '',
  };
  const KEY = 'config';

  const getInit = () => {
    const str = localStorage.getItem(KEY);
    if (str == null) {
      localStorage.setItem(KEY, JSON.stringify(DEFAULT));
      return DEFAULT;
    }
    return JSON.parse(str) as TGithubConfig;
  };

  const [githubConfig, setGithubConfig] = useState<TGithubConfig>(getInit());

  const setConfig = (config: TGithubConfig) => {
    localStorage.setItem(KEY, JSON.stringify(config));
    setGithubConfig(config);
  };

  return { config: githubConfig, setConfig };
};
