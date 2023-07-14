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

import { CloudType } from '../type';

export const Cloud = ({
  cloud: { size, translateY, delay },
  progress,
}: {
  cloud: CloudType;
  progress: Animated.SharedValue<number>;
}) => {
  // state
  const translateYValue = useSharedValue(40);

  // style
  const cloudStyle = useAnimatedStyle(() => ({
    width: size,
    height: size,
    transform: [{ translateY: translateYValue.value }],
    opacity: interpolate(progress.value, [0, 1], [0, 1]),
  }));

  // effect
  useAnimatedReaction(
    () => progress.value > 0.2,
    (v, prev) => {
      if (v !== prev) {
        if (v) {
          translateYValue.value = 40;

          translateYValue.value = withDelay(
            delay,
            withTiming(translateY, { easing: Easing.elastic() }),
          );
        } else {
          translateYValue.value = 40;
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
        source={require('../images/cloud.png')}
      />
    </Animated.View>
  );
};
