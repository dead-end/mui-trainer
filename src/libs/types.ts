import Result from './utils/result';

export type TGithubConfig = {
  id: string;
  user: string;
  repo: string;
  token: string;
};

export type TGithubConfigCtx = {
  githubConfig: TGithubConfig | undefined;
  updateGithubConfig: (config: TGithubConfig) => void;
};

export type TErrorCtx = {
  error: string[];
  addError: (msg: string) => void;
  clearError: () => void;
};

export type TBook = {
  id: string;
  title: string;
  description: string;
};

export type TBookUpdate = (books: TBook[]) => Result<TBook[]>;

/**
 * The type for the content of a file with its hash value.
 */
// TODO: used?
export type TContentHash = {
  content: string;
  hash: string;
};

export type TCache<T> = {
  path: string;
  data: T;
  hash: string;
};
