import { useContext } from 'react';
import { ConfigContext } from '../../components/ConfigContext';

export const useConfigContext = () => {
  const value = useContext(ConfigContext);
  if (value === null) {
    throw new Error('Unable to get config context!');
  }
  return value;
};
