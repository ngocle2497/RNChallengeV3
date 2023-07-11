import {SharedValue} from 'react-native-reanimated';

export type ItemGridProps = {
  width: number;
  height: number;
  uri: string;
  x: number;
  y: number;
};

export type GridContextType = {
  rotate: SharedValue<number>;
};
