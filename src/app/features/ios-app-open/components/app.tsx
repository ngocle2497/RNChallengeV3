import React from 'react';
import { StyleSheet, useWindowDimensions, ViewProps } from 'react-native';

import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedProps,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Image } from 'expo-image';

import {
  APP_SIZE,
  DURATION,
  EASING,
  LEFT_TOP,
  PROGRESS_FLIP,
} from '../constant';
import { styles } from '../styles';
import { AppProps } from '../type';

export const App = ({ progress, maxHeight }: AppProps) => {
  // state
  const { width: targetWidth } = useWindowDimensions();

  const { top: insetTop } = useSafeAreaInsets();

  const width = useDerivedValue(() =>
    interpolate(
      progress.value,
      [0, PROGRESS_FLIP, 1],
      [APP_SIZE, APP_SIZE * 1.4, targetWidth],
      Extrapolate.CLAMP,
    ),
  );

  const height = useDerivedValue(() =>
    interpolate(
      progress.value,
      [0, PROGRESS_FLIP, 1],
      [APP_SIZE, APP_SIZE * 1.4, maxHeight.value],
      Extrapolate.CLAMP,
    ),
  );

  const top = useDerivedValue(() =>
    interpolate(
      progress.value,
      [0, PROGRESS_FLIP, 1],
      [LEFT_TOP + insetTop, LEFT_TOP + insetTop, 0],
      Extrapolate.CLAMP,
    ),
  );

  const left = useDerivedValue(() =>
    interpolate(
      progress.value,
      [0, PROGRESS_FLIP, 1],
      [LEFT_TOP, LEFT_TOP, 0],
      Extrapolate.CLAMP,
    ),
  );

  const opacity = useDerivedValue(() =>
    interpolate(progress.value, [0, 0.8, 1], [1, 1, 0], Extrapolate.CLAMP),
  );

  // func
  const gesture = Gesture.Tap().onStart(() => {
    // Can use measure to get left,top of icon. then pass them to detail-app to animated from icon
    progress.value = withTiming(1, { duration: DURATION, easing: EASING });
  });

  // props
  const props = useAnimatedProps<ViewProps>(() => ({
    pointerEvents: progress.value > 0 ? 'none' : 'auto',
  }));

  // render
  return (
    <GestureDetector gesture={gesture}>
      <Animated.View
        animatedProps={props}
        style={[styles.app, { width, height, opacity, left, top }]}>
        <Image
          style={[
            StyleSheet.absoluteFillObject,
            { top: 5, left: 5, bottom: 5, right: 5 },
          ]}
          source={require('../images/icon-app.png')}
        />
      </Animated.View>
    </GestureDetector>
  );
};
