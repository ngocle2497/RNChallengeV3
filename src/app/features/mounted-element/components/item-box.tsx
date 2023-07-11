import React, { memo } from 'react';
import { Dimensions, Text, View } from 'react-native';

import Animated, { withTiming } from 'react-native-reanimated';

import { faker } from '@faker-js/faker';

import { styles } from '../styles';
import { BoxProps } from '../type';

const SCREEN_WIDTH = Dimensions.get('window').width;

const enteringAnimation = () => {
  'worklet';
  const animations = {
    transform: [
      { translateX: withTiming(0, { duration: 500 }) },
      { skewX: withTiming('0deg', { duration: 800 }) },
    ],
  };
  const initialValues = {
    transform: [
      { translateX: -SCREEN_WIDTH - (SCREEN_WIDTH - 32) / 3 },
      { skewX: '-50deg' },
    ],
  };
  const callback = (_finished: boolean) => {};
  return {
    initialValues,
    animations,
    callback,
  };
};

const exitingAnimation = () => {
  'worklet';
  const animations = {
    opacity: withTiming(0, { duration: 500 }),
    transform: [
      {
        scale: withTiming(0),
      },
      {
        rotate: withTiming('360deg', { duration: 300 }),
      },
    ],
  };
  const initialValues = {
    opacity: 1,
    transform: [
      {
        scale: 1,
      },
      {
        rotate: '0deg',
      },
    ],
  };
  const callback = (_finished: boolean) => {};
  return {
    initialValues,
    animations,
    callback,
  };
};

export const ItemBox = memo(
  ({ box }: BoxProps) => {
    // render
    return (
      <View style={[styles.box]}>
        <Animated.View
          exiting={exitingAnimation}
          entering={enteringAnimation}
          style={[styles.box, { backgroundColor: faker.color.rgb() }]}>
          <Text style={[styles.textBox]}>
            {box.name.slice(0, 1).toUpperCase() + box.name.slice(1)}
          </Text>
        </Animated.View>
      </View>
    );
  },
  () => true,
);
