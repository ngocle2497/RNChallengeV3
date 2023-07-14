import React from 'react';
import { StyleSheet } from 'react-native';

import Animated, {
  Easing,
  interpolate,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';

import { Image } from 'expo-image';

import { StarType } from '../type';

export const Star = ({
  star: { size, translateY, delay },
  progress,
}: {
  star: StarType;
  progress: Animated.SharedValue<number>;
}) => {
  // state
  const translateYValue = useSharedValue(-30);

  // style
  const cloudStyle = useAnimatedStyle(() => ({
    width: size,
    height: size,
    transform: [
      { translateY: translateYValue.value },
      { scale: interpolate(progress.value, [0, 1], [1, 0]) },
    ],
    opacity: interpolate(progress.value, [0, 1], [1, 0]),
  }));

  // effect
  useAnimatedReaction(
    () => progress.value < 0.6,
    (v, prev) => {
      if (v !== prev) {
        if (v) {
          translateYValue.value = -30;

          translateYValue.value = withDelay(
            delay,
            withTiming(translateY, { easing: Easing.elastic() }),
          );
        } else {
          translateYValue.value = -30;
        }
      }
    },
  );

  // render
  return (
    <Animated.View style={cloudStyle}>
      <Image
        contentFit="contain"
        style={StyleSheet.absoluteFillObject}
        source={require('../images/star.png')}
      />
    </Animated.View>
  );
};
