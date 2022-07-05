import React, { useEffect } from 'react';
import { View } from 'react-native';

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

export const LightRay = ({ index, total }: LightRayProps) => {
  // state
  const progressRight = useSharedValue(0);
  const widthRight = useDerivedValue(() =>
    interpolate(
      progressRight.value,
      [0, 1],
      [DEFAULT_WIDTH_LIGHT_RAY, WIDTH_CANVAS / 2],
    ),
  );
  const xRight = useDerivedValue(() =>
    interpolate(progressRight.value, [0, 1], [0, WIDTH_CANVAS]),
  );
  const progressLeft = useSharedValue(0);
  const widthLeft = useDerivedValue(() =>
    interpolate(
      progressLeft.value,
      [0, 1],
      [DEFAULT_WIDTH_LIGHT_RAY, WIDTH_CANVAS / 2],
    ),
  );
  const xLeft = useDerivedValue(() =>
    interpolate(progressLeft.value, [0, 1], [0, WIDTH_CANVAS]),
  );

  //   useSharedValueEffect(() => {
  //     widthRight.current = mix(
  //       progressRight.value,
  //       DEFAULT_WIDTH_LIGHT_RAY,
  //       WIDTH_CANVAS / 2,
  //     );
  //     xRight.current = mix(progressRight.value, 0, WIDTH_CANVAS);
  //   }, progressRight);

  //   useSharedValueEffect(() => {
  //     widthLeft.current = mix(
  //       progressRight.value,
  //       DEFAULT_WIDTH_LIGHT_RAY,
  //       WIDTH_CANVAS / 2,
  //     );
  //     xLeft.current = mix(progressLeft.value, 0, WIDTH_CANVAS);
  //   }, progressLeft);

  useEffect(() => {
    progressRight.value = withDelay(
      Math.random() * 700,
      withRepeat(
        withTiming(1, { duration: 500 + Math.random() * 1000 }),
        -1,
        false,
      ),
    );
    progressLeft.value = withDelay(
      Math.random() * 700,
      withRepeat(
        withTiming(1, { duration: 500 + Math.random() * 1000 }),
        -1,
        false,
      ),
    );
  }, []);

  const leftStyle = useAnimatedStyle(() => ({
    width: widthLeft.value,
    height: 3,
    borderRadius: 2,
    backgroundColor: '#FFFFFF',
    transform: [{ translateX: xLeft.value }],
  }));
  const rightStyle = useAnimatedStyle(() => ({
    width: widthRight.value,
    height: 3,
    borderRadius: 2,
    backgroundColor: '#FFFFFF',
    transform: [{ translateX: xRight.value }],
  }));

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
};
