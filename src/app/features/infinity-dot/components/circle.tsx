import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

import { CircleProps, DotProps } from '../type';

const LENGTH_DOT = 18;

const SIZE_DOT = 40;

const RADIUS_CIRCLE = 100;

const Dot = ({ index, left }: DotProps) => {
  // state
  const progress = useSharedValue(0);

  const sizeOverlay = useDerivedValue(() =>
    interpolate(progress.value, [0, 0.0000001, 0.5, 1], [4, SIZE_DOT, 4, 4]),
  );

  // style
  const overlayDotStyle = useAnimatedStyle(() => ({
    width: sizeOverlay.value,
    height: sizeOverlay.value,
    borderRadius: SIZE_DOT,
    backgroundColor: 'violet',
  }));

  useEffect(() => {
    progress.value = withDelay(
      left ? 0 : LENGTH_DOT * 100,
      withDelay(
        index * 100,
        withRepeat(
          withSequence(
            withTiming(1, {
              duration: LENGTH_DOT * 100 * 2,
              easing: Easing.linear,
            }),
          ),
          -1,
          false,
        ),
      ),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // render
  return (
    <View
      key={index}
      style={[
        styles.rowDot,
        { transform: [{ rotate: `${(360 / LENGTH_DOT) * index}deg` }] },
      ]}>
      <View style={styles.flex} />
      <View style={styles.dot}>
        <Animated.View style={overlayDotStyle} />
      </View>
    </View>
  );
};

export const Circle = ({ left }: CircleProps) => {
  // func
  const renderDot = (_: number, index: number) => {
    return <Dot key={index} index={index} left={left} />;
  };

  // render
  return (
    <View
      style={[
        styles.container,
        {
          marginRight: left ? -SIZE_DOT : 0,
          transform: [{ rotateY: left ? '0deg' : '180deg' }],
        },
      ]}>
      {Array(LENGTH_DOT).fill(0).map(renderDot)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: RADIUS_CIRCLE * 2,
    height: RADIUS_CIRCLE * 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowDot: {
    width: RADIUS_CIRCLE * 2,
    flexDirection: 'row',
    position: 'absolute',
  },
  flex: {
    flex: 1,
  },
  dot: {
    width: SIZE_DOT,
    height: SIZE_DOT,
    borderRadius: SIZE_DOT,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
