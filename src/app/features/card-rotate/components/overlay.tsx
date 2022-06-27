import React from 'react';

import {
  BlurMask,
  Canvas,
  interpolate,
  RoundedRect,
  SweepGradient,
  useDerivedValue,
  useLoop,
  vec,
} from '@shopify/react-native-skia';

import { OverlayProps } from '../type';

const PADDING_CANVAS = 30;

export const Overlay = ({ height, width }: OverlayProps) => {
  // state
  const progressSkia = useLoop({ duration: 2000 });
  const rSkia = useDerivedValue(
    () => interpolate(progressSkia.current, [0, 1], [2, 10]),
    [progressSkia],
  );
  // render
  return (
    <Canvas
      style={{
        height: height + PADDING_CANVAS,
        width: width + PADDING_CANVAS,
      }}>
      <RoundedRect
        r={20}
        x={PADDING_CANVAS / 2}
        y={PADDING_CANVAS / 2}
        width={width}
        height={height}>
        <SweepGradient
          c={vec((PADDING_CANVAS + width) / 2, (PADDING_CANVAS + height) / 2)}
          colors={['cyan', 'magenta', 'yellow', 'cyan']}
        />
        <BlurMask blur={rSkia} style="solid" />
      </RoundedRect>
    </Canvas>
  );
};
