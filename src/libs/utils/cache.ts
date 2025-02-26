import { TCache, TGithubConfig } from '../types';
import { db } from './db';
import { githubGetUrl, githubReadContent, githubWriteContent } from './github';
import Result from './result';
import { storeGet, storePut } from './store';

const STORE = 'cache';

/**
 * Read a file from the cache.
 */
const cacheGet = async <T>(path: string) => {
  const store = db.transaction([STORE], 'readonly').objectStore(STORE);
  const result = await storeGet<TCache<T>>(store, path);
  if (result) {
    return result;
  }
};

/**
 * Write a file to the cache.
 */
const cachePut = async <T>(path: string, data: T, hash: string) => {
  const store = db.transaction([STORE], 'readwrite').objectStore(STORE);
  return storePut<TCache<T>>(store, {
    path,
    data,
    hash,
  });
};

/**
 * The function reads a path from the cache or from github.
 */
export const cachedGetPath = async <T>(config: TGithubConfig, path: string) => {
  const result = new Result<TCache<T>>();

  const cached = await cacheGet<T>(path);
  if (cached) {
    return result.setOk(cached);
  }

  const readResult = await githubReadContent(
    githubGetUrl(config.user, config.repo, path),
    config.token
  );
  if (readResult.hasError()) {
    return result.setError(
      `cachedGetPath - unable to read data: ${readResult.getMessage()}`
    );
  }

  const cache: TCache<T> = {
    path,
    data: JSON.parse(readResult.getValue().content),
    hash: readResult.getValue().hash,
  };

  await cachePut<T>(cache.path, cache.data, cache.hash);
  return result.setOk(cache);
};

/**
 * The function writes the file to github and updates the cache.
 */
export const cachePutPath = async <T>(
  config: TGithubConfig,
  path: string,
  data: T,
  hash: string,
  comment: string
) => {
  const result = new Result<T>();

  const writeResult = await githubWriteContent(
    githubGetUrl(config.user, config.repo, path),
    JSON.stringify(data),
    hash,
    comment,
    config.token
  );
  if (writeResult.hasError()) {
    return result.setError(writeResult.getMessage());
  }

  await cachePut<T>(path, data, writeResult.getValue());
  return result.setOk(data);
};
