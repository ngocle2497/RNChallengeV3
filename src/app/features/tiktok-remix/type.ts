import {SkImage} from '@shopify/react-native-skia';
import {SharedValue} from 'react-native-reanimated';

export type TiktokRemixProps = {
  scaleMask: SharedValue<number>;
  progress: SharedValue<number>;
};
export type OverlayMaskProps = {
  scaleMask: SharedValue<number>;
  image: SkImage;
};

export type OriginImageProps = {
  progress: SharedValue<number>;
  image: SkImage;
};

export type MaskViewProps = {
  image: SkImage;
};
