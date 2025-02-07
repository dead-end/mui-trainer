export type TGithubConfig = {
  user: string;
  repo: string;
  token: string;
};

export type TConfigContext = {
  config: TGithubConfig;
  setConfig: (config: TGithubConfig) => void;
};
