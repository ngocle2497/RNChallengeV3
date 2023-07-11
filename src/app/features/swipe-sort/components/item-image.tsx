import React from 'react';

import {Image} from 'expo-image';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedReaction,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import {sortPosition} from '../constants';
import {styles} from '../styles';
import {ItemImageProps} from '../type';

const sharedTransformOrigin = (
  {x, y}: {x: number; y: number},
  ...transformations: Animated.AnimatedTransform
): Animated.AnimatedTransform => {
  'worklet';
  return [
    {translateX: x},
    {translateY: y},
    ...transformations,
    {translateX: x * -1},
    {translateY: y * -1},
  ];
};

export const ItemImage = ({image, positions}: ItemImageProps) => {
  // state
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const rotateOffset = useSharedValue(0);
  const zIndex = useDerivedValue(() => positions.value[image.id]);
  const scale = useDerivedValue(() =>
    interpolate(
      translateX.value,
      [-70, 0, 70],
      [0.8, 1, 0.8],
      Extrapolate.CLAMP,
    ),
  );

  const gesture = Gesture.Pan()
    .onChange(({changeX, changeY}) => {
      translateX.value += changeX;
      translateY.value += changeY;
      rotateOffset.value = interpolate(
        translateX.value,
        [-70, 0, 70],
        [-10, 0, 10],
        Extrapolate.CLAMP,
      );
    })
    .onEnd(({translationX, absoluteY}) => {
      if (Math.abs(translationX) >= 50 || Math.abs(absoluteY) >= 50) {
        positions.value = sortPosition(positions.value);
      }
      translateX.value = withTiming(0);
      translateY.value = withTiming(0);
    });

  useAnimatedReaction(
    () => ({
      zIndex: zIndex.value,
      positions: positions.value,
      offset: rotateOffset.value,
    }),
    (value, prevValue) => {
      if (value.zIndex !== prevValue?.zIndex && value.offset !== 0) {
        const multiple = rotateOffset.value >= 0 ? 1 : -1;
        const maxZIndex = Object.values(value.positions).reduce(
          (accumulator, curr) => Math.max(accumulator, curr),
        );
        const newValue = interpolate(value.zIndex, [maxZIndex, 1], [0, 10]);
        rotateOffset.value = withTiming(newValue * multiple);
      }
    },
  );

  // restyle
  const containerStyle = useAnimatedStyle(() => ({
    zIndex: zIndex.value,
    overflow:
      parseInt(String(zIndex.value), 10) >= Object.keys(positions.value).length
        ? 'visible'
        : 'hidden',
    transform: sharedTransformOrigin(
      {x: 0, y: 125},
      {scale: scale.value},
      {rotate: `${rotateOffset.value}deg`},
      {translateX: translateX.value},
      {translateY: translateY.value},
    ),
  }));

  // render
  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.itemImage, containerStyle]}>
        <Image style={styles.image} source={{uri: image.url}} />
      </Animated.View>
    </GestureDetector>
  );
};
