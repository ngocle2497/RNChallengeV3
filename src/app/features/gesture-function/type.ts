import {SkSVG} from '@shopify/react-native-skia';
import {SharedValue} from 'react-native-reanimated';

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
