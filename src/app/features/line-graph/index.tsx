import React, { useCallback, useEffect, useState } from 'react';
import { LayoutChangeEvent, View } from 'react-native';

import { GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  Easing,
  runOnJS,
  runOnUI,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import {
  Canvas,
  LinearGradient,
  Path,
  PathCommand,
  runTiming,
  Skia,
  SkPath,
  useComputedValue,
  useValue,
  vec,
} from '@shopify/react-native-skia';

import { buildGraph, PADDING } from './create-graph-chart';
import { getYForX } from './get-y-for-x';
import { styles } from './styles';
import { DataChart } from './type';
import { randomDataChart, usePanGesture } from './util';

const easing = Easing.linear;

export const LineGraph = () => {
  // state
  const [width, setWidth] = useState<number>(0);

  const [height, setHeight] = useState<number>(0);

  const [data, setData] = useState<Array<DataChart>>([]);

  const paths = useValue<{ from?: SkPath; to?: SkPath }>({});

  const end = useValue(0);

  const endX = useValue(1);

  const progress = useValue(0);

  const opacityDot = useSharedValue(0);

  const firstPoint = useSharedValue(vec(0, 0));

  const lastPoint = useSharedValue(vec(0, 0));

  const onInterpolating = useSharedValue(false);

  const { gesture, x, isActive } = usePanGesture(onInterpolating);

  const pathCommands = useSharedValue<PathCommand[]>([]);

  const path = useComputedValue(() => {
    const { from, to } = paths.current;

    if (!from || !to) {
      return Skia.Path.Make();
    }

    return to.interpolate(from, progress.current)!;
  }, [progress]);

  // const fillPath = useComputedValue(() => {
  //   const fill = path.current.copy();

  //   fill.lineTo(width - PADDING, height - PADDING);

  //   fill.lineTo(PADDING, height - PADDING);

  //   fill.close();

  //   return fill;
  // }, [path]);

  const circleX = useSharedValue(0);

  const circleY = useSharedValue(0);

  // func
  const handleViewLayout = useCallback((event: LayoutChangeEvent) => {
    const { layout } = event.nativeEvent;

    setWidth(layout.width);

    setHeight(layout.height);
  }, []);

  const setFingerX = useCallback(
    (fingerX: number, withAnimate?: boolean) => {
      'worklet';
      // don't set value when chart not ready
      if (opacityDot.value === 0) {
        return;
      }

      const y = getYForX(pathCommands.value, fingerX);

      let nextY, nextX;
      if (y != null) {
        nextX = fingerX;

        nextY = y;
      } else if (fingerX < PADDING) {
        const { x, y } = firstPoint.value;

        nextX = x;

        nextY = y;
      } else if (fingerX >= width - PADDING) {
        const { x, y } = lastPoint.value;

        nextX = x;

        nextY = y;
      }

      if (nextY && nextX) {
        circleY.value = withTiming(nextY, {
          duration: withAnimate ? 1000 : 0,
          easing,
        });

        circleX.value = withTiming(nextX, {
          duration: withAnimate ? 1000 : 0,
          easing,
        });
      }
    },
    [circleX, circleY, isActive, width],
  );

  const setEndX = useCallback(
    (value: number, withAnimate: boolean) => {
      if (withAnimate) {
        runTiming(endX, value / width, { duration: 300 });
      } else {
        endX.current = value / width;
      }
    },
    [width],
  );

  // effect
  useEffect(() => {
    if (!width || !height) {
      return;
    }

    if (data.length === 0) {
      return;
    }

    const previous = paths.current;

    const nextPath = buildGraph({ data, width, height });

    let from = paths.current?.to;
    if (!from) {
      from = nextPath;
    }

    if (from && previous.from && progress.current < 1) {
      from = from.interpolate(previous.from, progress.current)!;
    }

    firstPoint.value = vec(nextPath.getPoint(0).x, nextPath.getPoint(0).y);

    lastPoint.value = vec(nextPath.getLastPt().x, nextPath.getLastPt().y);

    // set circle position to last point when chart not ready
    if (opacityDot.value === 0) {
      circleY.value = nextPath.getLastPt().y;

      circleX.value = nextPath.getLastPt().x;

      x.value = width - PADDING;
    }

    // disable gesture while path interpolating
    onInterpolating.value = true;

    pathCommands.value = nextPath.toCmds();

    runOnUI(setFingerX)(x.value, true);

    paths.current = { from: from, to: nextPath };

    runTiming(progress, { from: 0, to: 1 }, { duration: 1000, easing }, () => {
      // re-enable gesture after path interpolating
      onInterpolating.value = false;
    });
  }, [width, height, data]);

  useEffect(() => {
    setData(randomDataChart());

    runTiming(end, 1, { duration: 1000 }, () => {
      opacityDot.value = withTiming(1, { duration: 300 });
    });

    const id = setInterval(() => {
      setData(randomDataChart());
    }, 3000);

    return () => clearInterval(id);
  }, []);

  useAnimatedReaction(
    () => x.value,
    fingerX => {
      if (isActive.value && fingerX !== undefined && !onInterpolating.value) {
        setFingerX(fingerX);

        runOnJS(setEndX)(fingerX, false);
      }
    },
  );

  const circleStyle = useAnimatedStyle(() => ({
    position: 'absolute',
    left: circleX.value - 5,
    opacity: opacityDot.value,
    top: circleY.value - 5,
    width: 10,
    height: 10,
    borderRadius: 10,
    backgroundColor: '#d35400',
  }));

  const position = useComputedValue(() => {
    return [0, endX.current, endX.current, 1];
  }, [endX]);

  // render
  return (
    <View style={styles.root}>
      <View onLayout={handleViewLayout} style={styles.lineGraph}>
        <GestureDetector gesture={gesture}>
          <Canvas style={styles.canvas}>
            <Path
              end={end}
              start={0}
              style="stroke"
              strokeJoin="round"
              strokeCap="round"
              strokeWidth={2}
              path={path}>
              <LinearGradient
                start={vec(0, 0)}
                end={vec(width, 0)}
                positions={position}
                colors={['#3498db', '#3498db', '#3498db33', '#3498db33']}
              />
            </Path>
            {/* <Path strokeWidth={2} color={'#000'} style={'fill'} path={fillPath}>
              <LinearGradient
                start={vec(0, 0)}
                end={vec(width, 0)}
                positions={position}
                colors={['#f1c40f', '#e74c3c', '#e74c3c33', '#e74c3c33']}
              />
            </Path> */}
          </Canvas>
        </GestureDetector>
        <Animated.View style={circleStyle} />
      </View>
    </View>
  );
};
