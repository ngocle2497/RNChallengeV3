import Animated from 'react-native-reanimated';

import { SkiaValue } from '@shopify/react-native-skia';

export type FilterImageProps = {
  index: number;
  item: string;
  scrollX: Animated.SharedValue<number>;
};
export type BackgroundProps = {
  scrollX: SkiaValue<number>;
  updateCanvas: () => void;
};
