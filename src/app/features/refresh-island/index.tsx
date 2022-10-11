import React from 'react';
import { useWindowDimensions, View } from 'react-native';

import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import {
  Extrapolate,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import {
  Blur,
  Canvas,
  Circle,
  ColorMatrix,
  Group,
  interpolate,
  Paint,
  RoundedRect,
  usePaintRef,
  useSharedValueEffect,
  useValue,
  useValueEffect,
} from '@shopify/react-native-skia';

import {
  HEIGHT_ISLAND,
  MARGIN_TOP,
  RADIUS_CIRCLE,
  RADIUS_ISLAND,
  WIDTH_ISLAND,
} from './constants';
import { styles } from './styles';

export const RefreshIsland = () => {
  // state
  const { width } = useWindowDimensions();
  const paint = usePaintRef();

  const translateY = useSharedValue(0);
  const translateYSkia = useValue(MARGIN_TOP);

  // gesture
  const gesture = Gesture.Pan()
    .onChange(({ changeY }) => {
      translateY.value += changeY;
    })
    .onEnd(() => {
      translateY.value = withTiming(RADIUS_CIRCLE + MARGIN_TOP);
    });

  // restyle
  useSharedValueEffect(() => {
    translateYSkia.current = interpolate(
      translateY.value,
      [RADIUS_CIRCLE + MARGIN_TOP - 1, RADIUS_CIRCLE + MARGIN_TOP, 80, 180],
      [RADIUS_CIRCLE + MARGIN_TOP, RADIUS_CIRCLE + MARGIN_TOP, 80, 150],
      Extrapolate.EXTEND,
    );
  }, translateY);
  useValueEffect(translateYSkia, v => {
    console.log({ v });
  });
  // render
  return (
    <GestureDetector gesture={gesture}>
      <View style={[styles.container]}>
        <Canvas style={[styles.canvas]}>
          <Paint ref={paint}>
            <ColorMatrix
              matrix={[
                1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 18, -9,
              ]}
            />
            <Blur blur={5} />
          </Paint>
          <Group layer={paint}>
            <RoundedRect
              height={HEIGHT_ISLAND}
              width={WIDTH_ISLAND}
              x={(width - WIDTH_ISLAND) / 2}
              y={20}
              r={RADIUS_ISLAND}
            />
            <Circle cx={width / 2} cy={translateYSkia} r={RADIUS_CIRCLE} />
          </Group>
        </Canvas>
        <View style={styles.dynamicIsland} />
        {/* <Animated.View style={box} /> */}
      </View>
    </GestureDetector>
  );
};
