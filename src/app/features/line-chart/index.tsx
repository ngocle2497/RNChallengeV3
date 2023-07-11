import React, {useMemo} from 'react';
import {Button, StyleSheet, View} from 'react-native';

import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import {
  Easing,
  interpolateColor,
  useAnimatedReaction,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import {
  Canvas,
  Group,
  interpolatePaths,
  Path,
  Skia,
  SkPath,
} from '@shopify/react-native-skia';

import {GRAPH_HEIGHT, GRAPH_WIDTH, randomDataChart} from './mock';
import {DataPath} from './type';

import {sharedClamp} from '../../constants';

const dataExample = randomDataChart();
const dayPathSk = Skia.Path.MakeFromSVGString(
  dataExample.dayData.path,
) as SkPath;
const weekPathSk = Skia.Path.MakeFromSVGString(
  dataExample.weekData.path,
) as SkPath;
const monthPathSk = Skia.Path.MakeFromSVGString(
  dataExample.monthData.path,
) as SkPath;
const yearPathSk = Skia.Path.MakeFromSVGString(
  dataExample.yearData.path,
) as SkPath;

export const LineChart = () => {
  // state
  const translateX = useSharedValue(-dataExample.dayData.width + GRAPH_WIDTH);
  const leftBound = useSharedValue(-dataExample.dayData.width + GRAPH_WIDTH);
  const reset = useSharedValue(false);
  const progressPath = useSharedValue(0);
  const progressColor = useSharedValue(0);
  const fromPath = useSharedValue(dayPathSk);
  const toPath = useSharedValue(dayPathSk);

  const currentColor = useSharedValue(dataExample.dayData.color);
  const nextColor = useSharedValue(dataExample.dayData.color);

  const path = useDerivedValue(() => {
    if (!fromPath.value || !toPath.value) return Skia.Path.Make();
    return interpolatePaths(
      progressPath.value,
      [0, 1],
      [fromPath.value, toPath.value],
    )!;
  }, [progressPath]);

  const color = useDerivedValue(() => {
    return interpolateColor(
      progressColor.value,
      [0, 1],
      [currentColor.value, nextColor.value],
    );
  }, [progressColor, currentColor, nextColor]);

  const transform = useDerivedValue(
    () => [{translateX: translateX.value}],
    [translateX],
  );

  // func
  const handleChangePath = (nextNextPath: SkPath, data: DataPath) => {
    return () => {
      // color
      currentColor.value = nextColor.value;
      nextColor.value = data.color;
      progressColor.value = 0;

      // path
      console.log({
        nextNextPath,
        fromPath: fromPath.value,
        toPath: toPath.value,
      });

      fromPath.value = toPath.value;
      toPath.value = nextNextPath;
      progressPath.value = 0;
      leftBound.value = -data.width + GRAPH_WIDTH;
      reset.value = true;

      progressPath.value = withTiming(1, {duration: 300});
      translateX.value = withTiming(-data.width + GRAPH_WIDTH, {
        duration: 300,
      });
      progressColor.value = withTiming(-data.width + GRAPH_WIDTH, {
        duration: 300,
        easing: Easing.linear,
      });
    };
  };

  const panGesture = useMemo(() => {
    return Gesture.Pan()
      .onBegin(() => {
        if (reset.value) {
          translateX.value = leftBound.value;
          reset.value = false;
        }
      })
      .onChange(({changeX}) => {
        translateX.value = sharedClamp(
          translateX.value + changeX,
          leftBound.value,
          0,
        );
      });
  }, []);

  useAnimatedReaction(
    () => ({fromPath: fromPath.value, to: toPath.value}),
    v => {
      console.log({v});
    },
  );

  // render
  return (
    <View style={[styles.container]}>
      <Button
        title="Day"
        onPress={handleChangePath(dayPathSk, dataExample.dayData)}
      />
      <Button
        title="Week"
        onPress={handleChangePath(weekPathSk, dataExample.weekData)}
      />
      <Button
        title="Month"
        onPress={handleChangePath(monthPathSk, dataExample.monthData)}
      />
      <Button
        title="Year"
        onPress={handleChangePath(yearPathSk, dataExample.yearData)}
      />
      <GestureDetector gesture={panGesture}>
        <Canvas style={styles.svg}>
          <Group transform={transform}>
            <Path path={path} style={'stroke'} color={color} />
          </Group>
        </Canvas>
      </GestureDetector>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,1)',
  },
  svg: {
    width: GRAPH_WIDTH,
    height: GRAPH_HEIGHT,
    alignSelf: 'center',
  },
});
