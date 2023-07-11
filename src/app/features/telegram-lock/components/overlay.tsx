import React from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';

import {
  Blur,
  Canvas,
  Fill,
  interpolate,
  SweepGradient,
  useComputedValue,
  vec,
} from '@shopify/react-native-skia';

import { OverlayProps } from '../type';

export const Overlay = ({ progressSkia }: OverlayProps) => {
  // state
  const { width, height } = useWindowDimensions();
  const transform = useComputedValue(
    () => [
      { rotate: interpolate(progressSkia.current, [0, 1], [0, Math.PI / 3]) },
    ],
    [progressSkia],
  );

  // render
  return (
    <>
      <Canvas style={StyleSheet.absoluteFillObject}>
        <Fill>
          <SweepGradient
            origin={{ x: width / 2, y: height / 2 }}
            transform={transform}
            c={vec(width / 2, height / 2)}
            colors={['cyan', 'magenta', '#44bd32', 'cyan']}
          />
          <Blur blur={70} />
        </Fill>
      </Canvas>
    </>
  );
};
