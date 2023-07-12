import React from 'react';

import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { styles } from '../styles';
import { CardProps } from '../type';

export const Card = ({ height, width }: CardProps) => {
  // state
  const pointerX = useSharedValue(0);

  const pointerY = useSharedValue(0);

  const active = useSharedValue(false);

  const rotateX = useDerivedValue(() =>
    active.value
      ? interpolate(pointerY.value, [0, height], [10, -10], Extrapolate.CLAMP)
      : withTiming(0),
  );

  const rotateY = useDerivedValue(() =>
    active.value
      ? interpolate(pointerX.value, [0, width], [-10, 10], Extrapolate.CLAMP)
      : withTiming(0),
  );

  // func
  const gesture = Gesture.Pan()
    .onBegin(e => {
      pointerX.value = e.x;

      pointerY.value = e.y;

      active.value = true;
    })
    .onUpdate(e => {
      pointerX.value = e.x;

      pointerY.value = e.y;
    })
    .onFinalize(() => {
      active.value = false;
    });

  // style
  const cardReStyle = useAnimatedStyle(() => ({
    transform: [
      { perspective: 300 },
      { rotateX: `${rotateX.value}deg` },
      { rotateY: `${rotateY.value}deg` },
    ],
  }));

  // render
  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.card, { width, height }, cardReStyle]} />
    </GestureDetector>
  );
};
