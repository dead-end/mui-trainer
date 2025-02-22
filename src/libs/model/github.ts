import { TGithubConfig } from '../types';
import { db } from '../utils/db';
import { storeGet, storePut } from '../utils/store';

const STORE = 'admin';
const ID = 'github';

export const githubGet = async () => {
  const store = db.transaction([STORE], 'readonly').objectStore(STORE);
  return storeGet<TGithubConfig>(store, ID);
};

export const githubPut = async (config: TGithubConfig) => {
  const store = db.transaction([STORE], 'readwrite').objectStore(STORE);
  return storePut(store, {
    id: ID,
    user: config.user,
    repo: config.repo,
    token: config.token,
  });
};

export const githubIsValid = (config: undefined | TGithubConfig) => {
  if (config === undefined) {
    return false;
  }
  return config.user !== '' && config.repo !== '' && config.token !== '';
};
