import { useContext } from 'react';

import { DIContext } from './di.context';

export function useDI() {
  const context = useContext(DIContext);
  if (!context) {
    throw new Error('useDI must be used within a DIProvider');
  }
  return context;
}
