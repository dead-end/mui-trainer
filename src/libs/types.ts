export type TGithubConfig = {
  user: string;
  repo: string;
  token: string;
};

export type TGithubConfigCtx = {
  githubConfig: TGithubConfig | undefined;
  updateGithubConfig: (config: TGithubConfig) => void;
};

export type TBook = {
  id: string;
  title: string;
  description: string;
};

/**
 * The type for the content of a file with its hash value.
 */
export type TContentHash = {
  content: string;
  hash: string;
};
