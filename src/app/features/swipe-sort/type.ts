import Animated from 'react-native-reanimated';

export type Image = {
  id: number;
  url: string;
};

export type Position = Record<string, number>;

export type ItemImageProps = {
  image: Image;
  positions: Animated.SharedValue<Position>;
};
