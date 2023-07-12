/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/order */
import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  Extrapolate,
  interpolate,
  runOnJS,
  useAnimatedReaction,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';

import { Canvas, Group, Oval, Rect, useSVG } from '@shopify/react-native-skia';

import { IconSK } from './components/icon-sk';
import {
  DISTANCE_CHANGE,
  G_HEIGHT,
  OUTPUT_RANGE_WIDTH,
  OUTPUT_RANGE_X,
  OVAL_BASE_SIZE,
  OVAL_RADIUS,
  POSITION_X,
  screenWidth,
} from './constants';
import { CanvasFunctionProps } from './type';

import { sharedClamp } from '../../constants';

const backIcon = require('./icons/arrow-left.svg');

const refresh = require('./icons/refresh-cw.svg');

const close = require('./icons/x.svg');

export const CanvasFunction = ({
  children,
  onExecFunc,
}: CanvasFunctionProps) => {
  // state
  const xImage = useSVG(close)!;

  const backImage = useSVG(backIcon)!;

  const refreshImage = useSVG(refresh)!;

  const currentIndex = useSharedValue(1);

  const widthOval = useSharedValue(OVAL_BASE_SIZE);

  const xOval = useSharedValue(screenWidth / 2 - OVAL_RADIUS);

  const outputRangeX = useSharedValue(OUTPUT_RANGE_X[currentIndex.value]);

  const outputRangeWidth = useSharedValue(
    OUTPUT_RANGE_WIDTH[currentIndex.value],
  );

  const gScaleOval = useSharedValue(0.2);

  const gTranslateYOval = useSharedValue(-100);

  const gTranslateX = useSharedValue(0);

  const gTranslateY = useSharedValue(-G_HEIGHT);

  const offsetX = useSharedValue(0);

  const isGTranslateRunning = useSharedValue(false);

  const canvasHeight = useSharedValue(0);

  const iconOpacity = useSharedValue(0);

  const gesture = useMemo(() => {
    return Gesture.Pan()
      .manualActivation(true)
      .onTouchesMove((_, state) => {
        // wait for gTranslateY to be 0 or -CANVAS_HEIGHT.
        // 0 : active function
        // -CANVAS_HEIGHT : init transform
        // 0 -> -CANVAS_HEIGHT : animating g
        if (gTranslateY.value === 0 || gTranslateY.value === -G_HEIGHT) {
          state.activate();
        }
      })

      .onChange(({ changeX, changeY }) => {
        if (gTranslateY.value < 0) {
          gTranslateY.value = sharedClamp(
            gTranslateY.value + changeY * 2.5,
            -G_HEIGHT,
            0,
          );

          console.log(gTranslateY.value);

          canvasHeight.value = interpolate(
            gTranslateY.value,
            [0, -G_HEIGHT],
            [G_HEIGHT, 0],
            Extrapolate.CLAMP,
          );

          gScaleOval.value = interpolate(
            gTranslateY.value,
            [-G_HEIGHT, -G_HEIGHT / 2, 0],
            [0.01, 0.1, 1],
            // Extrapolate.CLAMP,
          );

          gTranslateYOval.value = interpolate(
            gTranslateY.value,
            [0, -G_HEIGHT / 0.5],
            [0, -100],
            Extrapolate.CLAMP,
          );

          iconOpacity.value = interpolate(
            gTranslateY.value,
            [0, -G_HEIGHT],
            [1, 0],
            Extrapolate.CLAMP,
          );
        }

        // wait for translateY to be 0 or animation to be finished
        if (isGTranslateRunning.value || gTranslateY.value < 0) {
          return;
        }

        offsetX.value += changeX;

        if (offsetX.value > DISTANCE_CHANGE) {
          offsetX.value = 0;

          currentIndex.value = sharedClamp(currentIndex.value + 1, 0, 2);

          isGTranslateRunning.value = true;
        }

        if (offsetX.value < -DISTANCE_CHANGE) {
          offsetX.value = 0;

          currentIndex.value = sharedClamp(currentIndex.value - 1, 0, 2);

          isGTranslateRunning.value = true;
        }

        if (isGTranslateRunning.value) {
          widthOval.value = withTiming(
            OVAL_BASE_SIZE,
            {
              duration: 200,
            },
            finished => {
              if (finished) {
                isGTranslateRunning.value = false;
              }
            },
          );

          xOval.value = withTiming(screenWidth / 2 - OVAL_RADIUS, {
            duration: 200,
          });

          outputRangeX.value = OUTPUT_RANGE_X[currentIndex.value];

          outputRangeWidth.value = OUTPUT_RANGE_WIDTH[currentIndex.value];

          return;
        }

        xOval.value = interpolate(
          offsetX.value,
          [-DISTANCE_CHANGE, 0, DISTANCE_CHANGE],
          outputRangeX.value,
          Extrapolate.CLAMP,
        );

        widthOval.value = interpolate(
          offsetX.value,
          [-DISTANCE_CHANGE, 0, DISTANCE_CHANGE],
          outputRangeWidth.value,
          Extrapolate.CLAMP,
        );
      })
      .onFinalize(() => {
        'worklet';
        if (gTranslateY.value === 0) {
          runOnJS(onExecFunc)(currentIndex.value);
        }

        canvasHeight.value = withTiming(0, { duration: 200 });

        offsetX.value = 0;

        xOval.value = withTiming(screenWidth / 2 - OVAL_RADIUS, {
          duration: 200,
        });

        widthOval.value = withTiming(OVAL_BASE_SIZE, { duration: 200 });

        gTranslateY.value = withTiming(-G_HEIGHT, { duration: 200 }, f => {
          if (f) {
            currentIndex.value = 1;

            isGTranslateRunning.value = false;

            outputRangeX.value = OUTPUT_RANGE_X[currentIndex.value];

            outputRangeWidth.value = OUTPUT_RANGE_WIDTH[currentIndex.value];
          }
        });

        gTranslateX.value = withDelay(200, withTiming(0, { duration: 200 }));
      });
  }, [onExecFunc]);

  // effect
  useAnimatedReaction(
    () => currentIndex.value,
    v => {
      gTranslateX.value = withTiming(POSITION_X[v], {
        duration: 200,
      });
    },
  );

  // skStyle
  const gTransform = useDerivedValue(() => [
    {
      translateY: gTranslateY.value,
    },
  ]);

  const gTransformOval = useDerivedValue(() => [
    { translateX: gTranslateX.value },
    { translateY: gTranslateYOval.value },
    { scale: gScaleOval.value },
  ]);

  const wrapCanvasStyle = useAnimatedStyle(() => ({
    height: canvasHeight.value,
    overflow: 'hidden',
  }));

  // render
  return (
    <View style={styles.root}>
      <GestureDetector gesture={gesture}>
        <View style={styles.root}>
          <Animated.View style={wrapCanvasStyle}>
            <Canvas style={styles.canvas}>
              <Group transform={gTransform}>
                <Rect
                  x={-screenWidth / 2}
                  y={0}
                  width={screenWidth * 2}
                  height={G_HEIGHT}
                  color={'rgba(0,0,0,.2)'}
                />
                <Group
                  origin={{
                    x: screenWidth / 2,
                    y: G_HEIGHT / 3 + OVAL_BASE_SIZE / 2,
                  }}
                  transform={gTransformOval}>
                  <Oval
                    x={xOval}
                    y={G_HEIGHT / 3}
                    width={widthOval}
                    height={OVAL_BASE_SIZE}
                    color={'rgba(255,255,255,7)'}
                  />
                </Group>
                <IconSK
                  index={0}
                  activeIndex={currentIndex}
                  opacity={iconOpacity}
                  x={10 + OVAL_BASE_SIZE / 2}
                  y={G_HEIGHT / 3 + OVAL_BASE_SIZE / 2}
                  image={backImage}
                />
                <IconSK
                  index={1}
                  activeIndex={currentIndex}
                  opacity={iconOpacity}
                  x={screenWidth / 2}
                  y={G_HEIGHT / 3 + OVAL_BASE_SIZE / 2}
                  image={refreshImage}
                />
                <IconSK
                  index={2}
                  activeIndex={currentIndex}
                  opacity={iconOpacity}
                  x={screenWidth - 10 - OVAL_BASE_SIZE / 2}
                  y={G_HEIGHT / 3 + OVAL_BASE_SIZE / 2}
                  image={xImage}
                />
              </Group>
            </Canvas>
          </Animated.View>
          {children}
        </View>
      </GestureDetector>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'white',
  },
  canvas: {
    flex: 1,
  },
});
