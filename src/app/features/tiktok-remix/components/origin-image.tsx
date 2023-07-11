import React from 'react';

import {
  Easing,
  interpolate,
  useAnimatedReaction,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';

import {Group, Image, Rect, rect} from '@shopify/react-native-skia';
import {
  INPUT_OPACITY,
  OUTPUT_OPACITY,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  sharedTiming,
} from '../constant';
import {OriginImageProps} from '../type';

export const OriginImage = ({image, progress}: OriginImageProps) => {
  // state
  const progressBackdrop = useSharedValue(0);
  const opacityBackdrop = useDerivedValue(() =>
    interpolate(progressBackdrop.value, INPUT_OPACITY, OUTPUT_OPACITY),
  );

  useAnimatedReaction(
    () => progress.value,
    (v, prev) => {
      if (v !== prev && v === 1) {
        progressBackdrop.value = sharedTiming(1, {
          duration: 5800,
          easing: Easing.linear,
        });
      } else {
        progressBackdrop.value = 0;
      }
    },
  );

  // skProps

  const transformTop = useDerivedValue(() => [
    {
      translateX: interpolate(progress.value, [0, 1], [-600, 0]),
    },
  ]);

  const opacityImage = useDerivedValue(() =>
    interpolate(progress.value, [0, 0.3], [0, 1]),
  );

  const transformBottom = useDerivedValue(() => [
    {
      translateX: interpolate(progress.value, [0, 1], [600, 0]),
    },
  ]);

  // render
  return (
    <Group>
      <Group
        opacity={opacityImage}
        transform={transformTop}
        clip={rect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT / 2)}>
        <Image
          x={0}
          y={0}
          width={SCREEN_WIDTH}
          height={SCREEN_HEIGHT}
          fit="cover"
          image={image}
        />
      </Group>
      <Group
        opacity={opacityImage}
        transform={transformBottom}
        clip={rect(0, SCREEN_HEIGHT / 2, SCREEN_WIDTH, SCREEN_HEIGHT / 2)}>
        <Image
          x={0}
          y={0}
          width={SCREEN_WIDTH}
          height={SCREEN_HEIGHT}
          fit="cover"
          image={image}
        />
      </Group>
      <Rect
        opacity={opacityBackdrop}
        color={'rgba(0,0,0,.2)'}
        x={0}
        y={0}
        width={SCREEN_WIDTH}
        height={SCREEN_HEIGHT}
      />
    </Group>
  );
};
