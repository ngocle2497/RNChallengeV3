import { SharedValue } from 'react-native-reanimated';

import { SkSVG } from '@shopify/react-native-skia';

export type IconSKProps = {
  image: SkSVG | null;
  x: number;
  y: number;
  opacity: SharedValue<number>;
  index: number;
  activeIndex: SharedValue<number>;
};

export type CanvasFunctionProps = {
  children: React.ReactNode | React.ReactNode[];
  onExecFunc: (index: number) => void;
};
