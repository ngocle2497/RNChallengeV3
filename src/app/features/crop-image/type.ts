import {GestureType} from 'react-native-gesture-handler';
import {SharedValue} from 'react-native-reanimated';

export type DotGestureProps = {
  left: SharedValue<number>;
  top: SharedValue<number>;
  gesture: GestureType;
};

export type GridProps = {
  gesture: GestureType;
  top: SharedValue<number>;
  left: SharedValue<number>;
  bottom: SharedValue<number>;
  right: SharedValue<number>;
};
