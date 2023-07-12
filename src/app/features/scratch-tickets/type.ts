import {
  SkiaMutableValue,
  SkiaValue,
  SkPath,
} from '@shopify/react-native-skia';

export type PathType = {
  id: string;
};

export type PathMaskProps = {
  id: string;
  activeId: SkiaValue<string | undefined>;
  activePath: SkiaMutableValue<SkPath>;
};
