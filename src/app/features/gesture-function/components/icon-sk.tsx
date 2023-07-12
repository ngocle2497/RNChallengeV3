import React from 'react';

import {
  interpolateColor,
  useAnimatedReaction,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { BlendColor, Group, ImageSVG, Paint } from '@shopify/react-native-skia';

import { IconSKProps } from '../type';

export const IconSK = ({
  x,
  y,
  image,
  opacity,
  activeIndex,
  index,
}: IconSKProps) => {
  // state
  const rotate = useSharedValue(0);

  const color = useDerivedValue(() =>
    interpolateColor(opacity.value, [0, 1], ['#ffffff', '#34495e']),
  );

  const transform = useDerivedValue(() => [{ rotate: rotate.value }]);

  useAnimatedReaction(
    () => ({
      active: activeIndex.value === index,
      mounted: opacity.value === 1,
    }),
    v => {
      if (v.mounted) {
        if (v.active) {
          rotate.value = withTiming(Math.PI * 2, { duration: 600 });
        } else {
          rotate.value = 0;
        }
      } else {
        rotate.value = 0;
      }
    },
  );

  // render
  return (
    <Group
      transform={transform}
      origin={{ x: x, y: y }}
      layer={
        <Paint>
          <BlendColor color={color} mode="srcIn" />
        </Paint>
      }>
      <ImageSVG x={x - 12} y={y - 12} svg={image} />
    </Group>
  );
};
