import { TGithubConfig } from '../types';
import { db } from '../utils/db';
import { storeGet, storePut } from '../utils/store';

const STORE = 'admin';

export const githubConfigGet = async () => {
  const store = db.transaction([STORE], 'readonly').objectStore(STORE);
  return storeGet<TGithubConfig>(store, 'github');
};

export const githubConfigPut = async (config: TGithubConfig) => {
  const store = db.transaction([STORE], 'readwrite').objectStore(STORE);
  return storePut<TGithubConfig>(store, config);
};

export const githubConfigIsValid = (config: undefined | TGithubConfig) => {
  if (config === undefined) {
    return false;
  }
  return config.user !== '' && config.repo !== '' && config.token !== '';
};
