import { SharedValue } from 'react-native-reanimated';

export type BarProps = {
  index: number;
  data: SharedValue<number[]>;
};
