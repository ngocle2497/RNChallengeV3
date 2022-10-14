import { SkImage } from '@shopify/react-native-skia';

import { IconTypes } from './icons';

export type IconButtonProps = {
  icon: IconTypes;
  onPress?: () => void;
};

export type ImageMaskProps = {
  imageSK: SkImage;
  activeImage: SkImage | null;
};
