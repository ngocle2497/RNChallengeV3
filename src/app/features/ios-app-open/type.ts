import { SharedValue } from 'react-native-reanimated';

export type AppProps = {
  progress: SharedValue<number>;
  maxHeight: SharedValue<number>;
};

export type DetailAppProps = {
  progress: SharedValue<number>;
  maxHeight: SharedValue<number>;
};
