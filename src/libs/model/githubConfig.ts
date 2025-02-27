import { TGithubConfig } from '../types';
import { storeGet, storePut, storeTx } from '../utils/store';

const STORE = 'admin';

export const githubConfigGet = async () => {
  const store = await storeTx(STORE, 'readonly');
  return storeGet<TGithubConfig>(store, 'github');
};

export const githubConfigPut = async (config: TGithubConfig) => {
  const store = await storeTx(STORE, 'readwrite');
  return storePut<TGithubConfig>(store, config);
};

export const githubConfigIsValid = (config: undefined | TGithubConfig) => {
  if (config === undefined) {
    return false;
  }
  return config.user !== '' && config.repo !== '' && config.token !== '';
};
