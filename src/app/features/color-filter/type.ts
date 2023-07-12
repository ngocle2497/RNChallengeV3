import Animated from 'react-native-reanimated';

import { SkImage } from '@shopify/react-native-skia';

export type FilterImageProps = {
  image: SkImage;
  index: number;
  item: string;
  scrollX: Animated.SharedValue<number>;
};

export type BackgroundProps = {
  scrollX: Animated.SharedValue<number>;
};
