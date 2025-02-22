import { useEffect, useState } from 'react';
import { TGithubConfig } from '../../types';
import { githubGet, githubIsValid, githubPut } from '../../model/github';
import { Admin } from '../../../pages/Admin';
import { GithubConfigContext } from './GithubConfigContext';

export const GithubConfigProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [githubConfig, setGithubConfig] = useState<TGithubConfig | undefined>();

  /**
   * The effect loads the github config from the indexed db.
   */
  useEffect(() => {
    const load = async () => {
      if (githubConfig === undefined) {
        const githubConfig = await githubGet();
        if (!githubConfig) {
          throw new Error('Unable to to load github config!');
        }
        setGithubConfig(githubConfig);
      }
    };

    load();
  }, []);

  /**
   * The function updates the github config. This means writing it to the indexed
   * db and setting the state.
   */
  const updateGithubConfig = async (config: TGithubConfig) => {
    await githubPut(config);
    setGithubConfig(config);
  };

  /**
   * Return the provider.
   */
  return (
    <GithubConfigContext.Provider value={{ githubConfig, updateGithubConfig }}>
      {githubIsValid(githubConfig) ? children : <Admin />}
    </GithubConfigContext.Provider>
  );
};
