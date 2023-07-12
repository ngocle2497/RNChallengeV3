import React from 'react';
import { StyleSheet } from 'react-native';

import { GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';

import { FILL_COLOR, RADIUS } from '../constants';
import { DotGestureProps } from '../type';

export const DotGesture = ({ left, top, gesture }: DotGestureProps) => {
  // style
  const style = useAnimatedStyle(() => {
    return {
      top: top.value - RADIUS,
      left: left.value - RADIUS,
    };
  });

  // render
  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.circle, style]} />
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  circle: {
    width: RADIUS * 2,
    height: RADIUS * 2,
    borderRadius: RADIUS,
    backgroundColor: FILL_COLOR,
    position: 'absolute',
  },
});
