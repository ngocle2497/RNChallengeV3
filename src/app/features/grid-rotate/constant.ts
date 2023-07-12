import { createContext, useContext } from 'react';

import { GridContextType } from './type';

const GridContext = createContext<GridContextType>({} as GridContextType);

export const GridProvider = GridContext.Provider;

export const useGridContext = () => useContext(GridContext);
GridContext.displayName = 'GridContext';
