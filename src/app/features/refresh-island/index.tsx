import React from 'react';
import { useWindowDimensions, View } from 'react-native';

import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import {
  Extrapolate,
  useDerivedValue,
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

  const translateY = useSharedValue(0);

  const translateYSkia = useDerivedValue(() => {
    return interpolate(
      translateY.value,
      [RADIUS_CIRCLE + MARGIN_TOP - 1, RADIUS_CIRCLE + MARGIN_TOP, 80, 180],
      [RADIUS_CIRCLE + MARGIN_TOP, RADIUS_CIRCLE + MARGIN_TOP, 80, 150],
      Extrapolate.EXTEND,
    );
  });

  // gesture
  const gesture = Gesture.Pan()
    .onChange(({ changeY }) => {
      translateY.value += changeY;
    })
    .onEnd(() => {
      translateY.value = withTiming(RADIUS_CIRCLE + MARGIN_TOP);
    });

  // render
  return (
    <GestureDetector gesture={gesture}>
      <View style={[styles.container]}>
        <Canvas style={[styles.canvas]}>
          <Group
            layer={
              <Paint>
                <ColorMatrix
                  matrix={[
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 40,
                    -20,
                  ]}
                />
                <Blur blur={10} />
              </Paint>
            }>
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
      </View>
    </GestureDetector>
  );
};
