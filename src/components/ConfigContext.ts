import { createContext } from 'react';
import { TConfigContext } from '../libs/types';

export const ConfigContext = createContext<TConfigContext | null>(null);
