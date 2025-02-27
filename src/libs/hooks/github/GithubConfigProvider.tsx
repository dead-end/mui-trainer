import { useEffect, useState } from 'react';
import { TGithubConfig } from '../../types';
import {
  githubConfigGet,
  githubConfigIsValid,
  githubConfigPut,
} from '../../model/githubConfig';
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
        const githubConfig = await githubConfigGet();
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
    await githubConfigPut(config);
    setGithubConfig(config);
  };

  /**
   * Return the provider.
   */
  return (
    <GithubConfigContext.Provider value={{ githubConfig, updateGithubConfig }}>
      {githubConfigIsValid(githubConfig) ? children : <Admin />}
    </GithubConfigContext.Provider>
  );
};
