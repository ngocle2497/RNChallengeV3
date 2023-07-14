import React, { useMemo } from 'react';
import { StyleSheet } from 'react-native';

import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { Image } from 'expo-image';

import { Clouds } from './components/clouds';
import { Starts } from './components/starts';

export const Switch = () => {
  // state
  const progress = useSharedValue(0);

  const gesture = useMemo(
    () =>
      Gesture.Tap().onStart(() => {
        progress.value = withTiming(progress.value ? 0 : 1);
      }),
    [],
  );

  // style
  const backgroundStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      progress.value,
      [0, 1],
      ['#130f40', '#74b9ff'],
    ),
  }));

  const thumbStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: interpolate(progress.value, [0, 1], [0, 60]) }],
  }));

  const trackStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      progress.value,
      [0, 1],
      ['#0652DD', '#1e90ff'],
    ),
  }));

  const thumbNightStyle = useAnimatedStyle(() => ({
    opacity: interpolate(progress.value, [0, 1], [1, 0]),
  }));

  const thumbDayStyle = useAnimatedStyle(() => ({
    opacity: progress.value,
    overflow: 'hidden',
  }));

  // render
  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.root, backgroundStyle]}>
        <Animated.View style={[styles.track, trackStyle]}>
          <LinearGradient
            colors={['#ffffff00', 'rgba(255,255,255,0.25)']}
            locations={[0.1, 0.9]}
            style={StyleSheet.absoluteFillObject}
          />
          <Clouds progress={progress} />
          <Starts progress={progress} />
          <Animated.View style={[styles.thumb, thumbStyle]}>
            <Animated.View
              style={[StyleSheet.absoluteFillObject, thumbNightStyle]}>
              <Image
                source={require('./images/moon.png')}
                contentFit="fill"
                style={StyleSheet.absoluteFillObject}
              />
            </Animated.View>
            <Animated.View
              style={[StyleSheet.absoluteFillObject, thumbDayStyle]}>
              <LinearGradient
                colors={['#d35400', '#eccc68']}
                style={StyleSheet.absoluteFillObject}
              />
              <LinearGradient
                colors={['#fa983a', '#f8c291']}
                style={styles.smallThumb}
              />
            </Animated.View>
          </Animated.View>
        </Animated.View>
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  track: {
    width: 110,
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',
  },
  thumb: {
    width: 40,
    height: 40,
    borderRadius: 25,
    overflow: 'hidden',
    top: 5,
    left: 5,
  },
  smallThumb: {
    position: 'absolute',
    top: 4,
    left: 4,
    right: 4,
    bottom: 4,
    borderRadius: 25,
  },
});
