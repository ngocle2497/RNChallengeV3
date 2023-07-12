import React from 'react';

import {
  interpolate,
  interpolateColor,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';

import { RoundedRect } from '@shopify/react-native-skia';

import { sharedClamp } from '../../../constants';
import { BAR_WIDTH, CANVAS_HEIGHT, MAX_BAR_HEIGHT } from '../constant';
import { BarProps } from '../type';

export const Bar = ({ index, data }: BarProps) => {
  // state
  const height = useDerivedValue(() =>
    withTiming(sharedClamp(data.value[index], 1, MAX_BAR_HEIGHT), {
      duration: 80,
    }),
  );

  const y1 = useDerivedValue(() => CANVAS_HEIGHT / 2 - height.value);

  const color = useDerivedValue(() =>
    interpolateColor(
      height.value,
      [0, MAX_BAR_HEIGHT / 2, MAX_BAR_HEIGHT],
      ['#2ecc71', '#f1c40f', '#d35400'],
    ),
  );

  const r = useDerivedValue(() =>
    interpolate(height.value, [1, MAX_BAR_HEIGHT / 4], [0, 4]),
  );

  // render
  return (
    <>
      <RoundedRect
        r={r}
        width={BAR_WIDTH}
        height={height}
        color={color}
        x={index * (BAR_WIDTH + 4)}
        y={y1}
      />
      <RoundedRect
        r={r}
        width={BAR_WIDTH}
        height={height}
        color={color}
        x={index * (BAR_WIDTH + 4)}
        y={CANVAS_HEIGHT / 2}
      />
    </>
  );
};
