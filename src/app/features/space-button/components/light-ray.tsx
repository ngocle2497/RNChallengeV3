import React, { memo, useEffect } from 'react';
import { View } from 'react-native';

import isEqual from 'react-fast-compare';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

import { DEFAULT_WIDTH_LIGHT_RAY, WIDTH_CANVAS } from '../constant';
import { styles } from '../styles';
import { LightRayProps } from '../type';

export const LightRay = memo(({ index, total }: LightRayProps) => {
  // state
  const progressRight = useSharedValue(0);
  const progressLeft = useSharedValue(0);
  const middleWidthLeft = useSharedValue(Math.random() * (WIDTH_CANVAS / 4));
  const middleWidthRight = useSharedValue(Math.random() * (WIDTH_CANVAS / 4));
  const middleXRight = useSharedValue(Math.random() * (WIDTH_CANVAS / 2));
  const middleXLeft = useSharedValue(Math.random() * (WIDTH_CANVAS / 2));
  const widthRight = useDerivedValue(
    () =>
      interpolate(
        progressRight.value,
        [0, 0.5, 1],
        [DEFAULT_WIDTH_LIGHT_RAY, middleWidthRight.value, WIDTH_CANVAS / 2],
      ),
    [],
  );

  const xRight = useDerivedValue(
    () =>
      interpolate(
        progressRight.value,
        [0, 0.5, 1],
        [0, middleXRight.value, WIDTH_CANVAS],
      ),
    [],
  );

  const widthLeft = useDerivedValue(
    () =>
      interpolate(
        progressLeft.value,
        [0, 0.5, 1],
        [DEFAULT_WIDTH_LIGHT_RAY, middleWidthLeft.value, WIDTH_CANVAS / 2],
      ),
    [],
  );

  const xLeft = useDerivedValue(
    () =>
      interpolate(
        progressLeft.value,
        [0, 0.5, 1],
        [0, middleXLeft.value, WIDTH_CANVAS],
      ),
    [],
  );

  const leftStyle = useAnimatedStyle(
    () => ({
      width: widthLeft.value,
      height: 2,
      borderRadius: 2,
      backgroundColor: '#FFFFFF',
      transform: [{ translateX: xLeft.value }],
    }),
    [],
  );
  const rightStyle = useAnimatedStyle(
    () => ({
      width: widthRight.value,
      height: 2,
      borderRadius: 2,
      backgroundColor: '#FFFFFF',
      transform: [{ translateX: xRight.value }],
    }),
    [],
  );
  useEffect(() => {
    progressRight.value = withDelay(
      Math.random() * 700,
      withRepeat(
        withTiming(1, { duration: 500 + Math.random() * 1000 }, () => {
          middleWidthRight.value = Math.random() * (WIDTH_CANVAS / 4);
          middleXRight.value = Math.random() * (WIDTH_CANVAS / 2);
        }),
        -1,
        false,
      ),
    );
    progressLeft.value = withDelay(
      Math.random() * 700,
      withRepeat(
        withTiming(1, { duration: 500 + Math.random() * 1000 }, () => {
          middleWidthLeft.value = Math.random() * (WIDTH_CANVAS / 4);
          middleXLeft.value = Math.random() * (WIDTH_CANVAS / 2);
        }),
        -1,
        false,
      ),
    );
  }, []);
  // render
  return (
    <View
      style={[
        styles.rowCanvas,
        { transform: [{ rotate: `${(360 / total) * index}deg` }] },
      ]}>
      <Animated.View style={[styles.canvas, styles.canvasLeft]}>
        <Animated.View style={[leftStyle]} />
      </Animated.View>
      <Animated.View style={[styles.canvas]}>
        <Animated.View style={[rightStyle]} />
      </Animated.View>
    </View>
  );
}, isEqual);
