import { createContext } from 'react';
import { TGithubConfigCtx } from '../../types';

/**
 * Create the github config context.
 */
export const GithubConfigContext = createContext<TGithubConfigCtx | null>(null);
