import React from 'react';
import { Text, useWindowDimensions, View, ViewProps } from 'react-native';

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
  APP_RADIUS,
  APP_SIZE,
  DURATION,
  EASING,
  LEFT_TOP,
  PROGRESS_FLIP,
} from '../constant';
import { styles } from '../styles';
import { DetailAppProps } from '../type';

export const DetailApp = ({ maxHeight, progress }: DetailAppProps) => {
  // state
  const { top: insetTop } = useSafeAreaInsets();

  const { width: targetWidth } = useWindowDimensions();

  const contentHeight = useDerivedValue(() => maxHeight.value);

  const actualWidth = useDerivedValue(() =>
    interpolate(
      progress.value,
      [0, PROGRESS_FLIP, 1],
      [APP_SIZE * 1.4, APP_SIZE * 1.4, targetWidth],
      Extrapolate.CLAMP,
    ),
  );

  const actualHeight = useDerivedValue(() =>
    interpolate(
      progress.value,
      [0, PROGRESS_FLIP, 1],
      [APP_SIZE * 1.4, APP_SIZE * 1.4, maxHeight.value],
      Extrapolate.CLAMP,
    ),
  );

  const borderRadius = useDerivedValue(() =>
    interpolate(
      progress.value,
      [0, PROGRESS_FLIP, 1],
      [APP_RADIUS * 2, APP_RADIUS * 2, 0],
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
    interpolate(
      progress.value,
      [0, PROGRESS_FLIP, PROGRESS_FLIP + 0.00001, 1],
      [0, 0, 1, 1],
      Extrapolate.CLAMP,
    ),
  );

  // func
  const gesture = Gesture.Tap().onStart(() => {
    progress.value = withTiming(0, { duration: DURATION, easing: EASING });
  });

  // props
  const props = useAnimatedProps<ViewProps>(() => ({
    pointerEvents: progress.value >= PROGRESS_FLIP ? 'auto' : 'none',
  }));

  // render
  return (
    <GestureDetector gesture={gesture}>
      <Animated.View
        animatedProps={props}
        style={[
          styles.detailApp,
          {
            width: actualWidth,
            height: actualHeight,
            borderRadius,
            opacity,
            top,
            left,
          },
        ]}>
        <Animated.View
          style={[
            styles.containerDetail,
            {
              width: targetWidth,
              height: contentHeight,
              paddingTop: insetTop + 10,
            },
          ]}>
          <View style={styles.rowHeader}>
            <Text style={styles.allBoard}>All Boards</Text>
            <Image
              tintColor={'#25CCF7'}
              style={styles.iconCreate}
              source={require('../icons/icon-equix-square-and-pencil.png')}
            />
            <Image
              tintColor={'#25CCF7'}
              style={styles.iconMore}
              source={require('../icons/more.png')}
            />
          </View>
          <View style={styles.searchBox}>
            <Text style={styles.search}>Search</Text>
          </View>
          <View style={styles.contentDetail}>
            <Image
              style={styles.iconCopy}
              source={require('../icons/copy.png')}
            />
            <Text style={styles.noBoard}>No Boards</Text>
            <Text style={styles.description}>
              {'To add a board, tap the create board icon in\n the toolbar'}
            </Text>
          </View>
        </Animated.View>
      </Animated.View>
    </GestureDetector>
  );
};
